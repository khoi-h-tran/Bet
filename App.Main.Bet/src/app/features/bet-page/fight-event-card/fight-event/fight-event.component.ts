import { Component, Input, OnInit } from '@angular/core';

// models
import { IEvent } from 'src/app/shared/models/ufc-events.model';
import { IBet } from 'src/app/shared/models/bet.model';

// Services
import { BetService } from '../../bet.service';

// PrimeNG
import { MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { selectUserID } from 'src/app/app-state/selectors/user.selectors';
import { take, tap } from 'rxjs';

@Component({
  selector: 'app-fight-event',
  templateUrl: './fight-event.component.html',
  styleUrls: ['./fight-event.component.scss'],
})
export class FightEventComponent implements OnInit {
  @Input() ufcFightEvents: IEvent[] = [];
  @Input() eventTime: Date = new Date();
  @Input() eventName: string = '';
  @Input() cardType: string = '';

  // An array of the selected fighters for each specific fight event
  // Index matches the UfcFightEvent's index
  selectedFighter: string[] = new Array<string>(this.ufcFightEvents.length);
  // An array of the fight event identity (in the form of <fighter1name>vs<fighter2name>) to identify radio button groups and toast message keys
  // Index matches the UfcFightEvent's index
  fightEventIDs: string[] = new Array<string>(this.ufcFightEvents.length);

  constructor(
    private betService: BetService,
    private messageService: MessageService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.ufcFightEvents.forEach((fightEvent, index) => {
      this.selectedFighter[index] = fightEvent.selectedFighter;
      this.fightEventIDs[index] = `${this.removeSpaces(
        fightEvent.eventFighter1.fighterName
      )}_vs_${this.removeSpaces(fightEvent.eventFighter2.fighterName)}`;
    });
  }

  // key: string = '';
  // betPlacement: IBetPlacement = {
  //   selectedFighter: '',
  // };
  userID: string = '';
  betPlacement: IBet = {
    userID: '',
    eventName: '',
    cardType: '',
    eventWeightClass: '',
    eventMatchUp: '',
    selectedFighter: '',
  };
  betEventIndex: number = 0;

  // TODO: Unit test this
  onPlaceBet(seletedEventIndex: number) {
    // Store the data we need into local variables
    this.betEventIndex = seletedEventIndex;
    this.store
      .select(selectUserID)
      .pipe(
        take(1),
        tap((stateUserID) => {
          this.userID = stateUserID;
        })
      )
      .subscribe({
        // next: () => {
        //   // build the database key
        //   this.key = `${userID}_${eventName}_${cardType}_${eventWeightClass}`;

        //   this.betPlacement.selectedFighter = selectedFighter;

        //   this.callServiceAddBet(
        //     seletedEventIndex,
        //     this.key,
        //     this.betPlacement
        //   );
        // },
        next: () => {
          this.betPlacement.userID = this.userID;
          this.betPlacement.eventName = this.removeSpaces(this.eventName);
          this.betPlacement.cardType = this.removeSpaces(this.cardType);
          this.betPlacement.eventWeightClass =
            this.ufcFightEvents[seletedEventIndex].eventWeightClass;
          this.betPlacement.eventMatchUp =
            this.fightEventIDs[seletedEventIndex];
          this.betPlacement.selectedFighter =
            this.selectedFighter[seletedEventIndex];

          this.callServiceAddBet(this.betPlacement);
        },
        error: () => {},
      });
  }

  removeSpaces(inputString: string): string {
    return inputString.replace(/\s/g, '');
  }

  // callServiceAddBet(
  //   seletedEventIndex: number,
  //   key: string,
  //   betPlacement: IBetPlacement
  // ) {
  //   this.betService.addBet(key, betPlacement).subscribe(
  //     (response) => {
  //       this.toastOutputSuccess(seletedEventIndex);
  //     },
  //     (error) => {
  //       this.toastOutputError(seletedEventIndex);
  //     }
  //   );
  // }

  callServiceAddBet(betPlacement: IBet) {
    this.betService.placeBet(betPlacement).subscribe({
      next: (response) => {
        this.toastOutputSuccess(this.betEventIndex);
      },
      error: (error) => {
        this.toastOutputError(this.betEventIndex);
      },
    });
  }

  toastOutputSuccess(seletedEventIndex: number) {
    this.messageService.add({
      key: this.fightEventIDs[seletedEventIndex],
      severity: 'success',
      summary: 'Bet Placed on:',
      detail: `${this.selectedFighter[seletedEventIndex]}`,
    });
  }

  toastOutputError(seletedEventIndex: number) {
    this.messageService.add({
      key: this.fightEventIDs[seletedEventIndex],
      severity: 'error',
      summary: 'Error:',
      detail: `Please contact admin.`,
    });
  }
}
