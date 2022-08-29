import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { BetService } from './bet.service';
import { retrievedUFCEvents } from '../../app-state/actions/bet.actions';
import { selectUFCEvents } from '../../app-state/selectors/bet.selectors';
import {
  IUFCEvents,
  ICard,
  IEvent as IFightEvent,
  IFighter,
} from 'src/app/shared/models/ufc-events.model';
import { selectUserID } from 'src/app/app-state/selectors/user.selectors';
import {
  exhaustMap,
  from,
  map,
  Observable,
  of,
  Subject,
  take,
  tap,
} from 'rxjs';
import { DataSnapshot } from 'firebase/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bet-page',
  templateUrl: './bet-page.component.html',
  styleUrls: ['./bet-page.component.scss'],
})
export class BetPageComponent implements OnInit {
  ufcEvents: ReadonlyArray<IUFCEvents> = [];
  // initial state of accordian headers (set up after ngOnInit to length of UFC events)
  activeState!: boolean[];

  // Stores the ufc events array, modified by adding the user's bet information
  modifiedUFCEventsData: IUFCEvents[] = [];
  // Since in NgOnInit we are calling asynchronously starting with getting the user's ID from state
  // We can't agaim set state in the map/subscription chain
  // So I createated a subject to trigger the store to dispatch any time this subject is updated
  subject = new Subject<IUFCEvents[]>();

  constructor(
    private betService: BetService,
    private store: Store,
    private router: Router
  ) {
    // Updates the state
    this.subject.subscribe({
      next: (v) => {
        this.store.dispatch(
          retrievedUFCEvents({
            retrievedUFCEventsData: this.modifiedUFCEventsData,
          })
        );
        this.store
          .select(selectUFCEvents)
          .subscribe((ufcEvents) => (this.ufcEvents = ufcEvents));
      },
    });
  }

  ngOnInit(): void {
    let userID: string = '';
    let dataSnapShot: DataSnapshot;
    let retrievedUFCEvents: Array<IUFCEvents>;
    let betsDocument: any;

    // getting user id from State
    this.store
      .select(selectUserID)
      .pipe(
        // once we get the user ID, just store it for now
        tap((stateUserID) => {
          userID = stateUserID;
        }),
        // get all the user's bets asynchronously
        exhaustMap((): Observable<any> => {
          return this.betService.getUsersBets(userID);
        }),
        // get the snapshots returned from the previous exhaust map
        exhaustMap((dataSnapShotReturned): Observable<any> => {
          // store it
          dataSnapShot = dataSnapShotReturned;
          // then run another async call to get all the ufc events
          return this.betService.getUFCEvents();
        }),
        // Now tap the return ufc events from the previous exhaustMap
        // Run through logic to apply the bets to the ufc events
        tap((ufcEvents) => {
          // Extract values fromt he data snapshop and store the ufc events
          retrievedUFCEvents = ufcEvents.val();
          // get the value from the firebase query for bets corresponding to the correct userID
          let betsDocument = dataSnapShot.val();
          // map over the UFC Events (we have to map and create a new array, otherwise it is read-only and copied by reference, so we can't change selectedFighter property)
          this.modifiedUFCEventsData = retrievedUFCEvents.map(
            // For each event, we have to build up a new event and return it
            (eventOriginal) => {
              // Holds values for us to compare each of our bets (and see if we need to update the selected fighter)
              let currentEventName: string = eventOriginal.eventName;
              let currentCardType: string = '';
              let currentWeightClass: string = '';
              let currentFighter1: IFighter = {
                fighterName: '',
                fighterRecord: '',
                fighterImage: '',
              };
              let currentFighter2: IFighter = {
                fighterName: '',
                fighterRecord: '',
                fighterImage: '',
              };

              // create the new event to be returned in our map function
              let eventNew: IUFCEvents = {
                eventName: eventOriginal.eventName,
                eventDate: eventOriginal.eventDate,
                eventVenue: eventOriginal.eventVenue,
                eventCards: [],
              };

              // go through each event card to build up aeach card
              eventOriginal.eventCards.forEach((ufcEvent) => {
                currentCardType = ufcEvent.cardType;
                let newCard: ICard = {
                  eventTime: ufcEvent.eventTime,
                  cardType: ufcEvent.cardType,
                  cardEvents: [],
                };

                // scan through each figh event (Note: this is where it matters because we will be adding the selected fighter from the firebase bet documents)
                ufcEvent.cardEvents.forEach((fightEvent) => {
                  currentWeightClass = fightEvent.eventWeightClass;
                  currentFighter1 = fightEvent.eventFighter1;
                  currentFighter2 = fightEvent.eventFighter2;
                  let newFightEvent: IFightEvent = {
                    eventWeightClass: fightEvent.eventWeightClass,
                    selectedFighter: '',
                    eventFighter1: fightEvent.eventFighter1,
                    eventFighter2: fightEvent.eventFighter2,
                  };

                  // scan through all the bets we pulled
                  for (var bet in betsDocument) {
                    let currentBet = betsDocument[bet];
                    // Check if the bet's info matches
                    if (
                      currentEventName == currentBet.eventName &&
                      currentCardType == currentBet.cardType &&
                      currentWeightClass == currentBet.eventWeightClass &&
                      (currentFighter1.fighterName ==
                        currentBet.selectedFighter ||
                        currentFighter2.fighterName ==
                          currentBet.selectedFighter)
                    ) {
                      // if it does, set the fighter that we previously bet on
                      newFightEvent.selectedFighter =
                        currentBet.selectedFighter;
                    }
                  }
                  // push the fight event to the card events array
                  newCard.cardEvents.push(newFightEvent);
                });

                // push the card to the event cards array
                eventNew.eventCards.push(newCard);
              });

              // return for the map function to create and build a new event
              return eventNew;
            }
          );
        })
      )
      .subscribe(
        () => {
          // Let the subject know that we have modified the data
          // We could not set the store to dispatch here to update state because it is already subscribing to the store to get the userID
          // It would be a call to the store, within a call to the store (store-ception)
          this.subject.next(this.modifiedUFCEventsData);
        },
        (error) => {
          this.router.navigate(['/auth']);
        }
      );
  }

  // Sets the first tab open dynamically at run-time
  // # of events (i.e. accordian headers unknown until get API call)
  ngAfterContentInit() {
    // setting the specifc accordion tab we want open on rendering
    this.activeState = new Array(this.ufcEvents.length);
    this.activeState[0] = true;
    for (let i = 1; i < this.ufcEvents.length; i++) {
      this.activeState[i] = false;
    }
  }
}
