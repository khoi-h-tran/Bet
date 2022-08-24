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

enum BetPlacementType {
  BetPlacement,
  BetRemoval,
}

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
  // Keeps track of which fighters were previously selected
  // Required to be able to deselect radio buttons
  previousSelectedFighter: string[] = new Array<string>(
    this.ufcFightEvents.length
  );
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
      this.previousSelectedFighter[index] = fightEvent.selectedFighter;
      this.fightEventIDs[index] = `${this.removeSpaces(
        fightEvent.eventFighter1.fighterName
      )}_vs_${this.removeSpaces(fightEvent.eventFighter2.fighterName)}`;
    });
  }

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
  onPlaceBet(selectedEventIndex: number) {
    // Store the data we need into local variables
    this.betEventIndex = selectedEventIndex;
    this.store
      .select(selectUserID)
      .pipe(
        take(1),
        tap((stateUserID) => {
          this.userID = stateUserID;
        })
      )
      .subscribe({
        next: () => {
          this.betPlacement.userID = this.userID;
          this.betPlacement.eventName = this.removeSpaces(this.eventName);
          this.betPlacement.cardType = this.removeSpaces(this.cardType);
          this.betPlacement.eventWeightClass =
            this.ufcFightEvents[selectedEventIndex].eventWeightClass;
          this.betPlacement.eventMatchUp =
            this.fightEventIDs[selectedEventIndex];
          this.betPlacement.selectedFighter =
            this.selectedFighter[selectedEventIndex];

          console.log(this.previousSelectedFighter);
          console.log(this.selectedFighter);

          this.selectedFighter[selectedEventIndex] !==
          this.previousSelectedFighter[selectedEventIndex]
            ? this.callServiceAddBet(this.betPlacement, selectedEventIndex)
            : this.callServiceRemoveBet(this.betPlacement, selectedEventIndex);
        },
        error: () => {},
      });
  }

  // Note: this is not actually removing spaces, but the option is there if required in the future.
  removeSpaces(inputString: string): string {
    return inputString.replace(/\s/g, ' ');
  }

  callServiceAddBet(betPlacement: IBet, selectedEventIndex: number) {
    this.betService.placeBet(betPlacement).subscribe({
      next: (response) => {
        this.toastSuccess(this.betEventIndex, BetPlacementType.BetPlacement);
        this.previousSelectedFighter[selectedEventIndex] =
          this.selectedFighter[selectedEventIndex];
      },
      error: (error) => {
        this.toastError(this.betEventIndex);
      },
    });
  }

  callServiceRemoveBet(betPlacement: IBet, selectedEventIndex: number) {
    this.betService.removeBet(betPlacement).subscribe({
      next: (response) => {
        this.toastSuccess(this.betEventIndex, BetPlacementType.BetRemoval);
        this.selectedFighter[selectedEventIndex] = '';
        this.previousSelectedFighter[selectedEventIndex] = '';
      },
      error: (error) => {
        this.toastError(this.betEventIndex);
      },
    });
  }

  toastSuccess(seletedEventIndex: number, betplacementType: BetPlacementType) {
    this.messageService.add({
      key: this.fightEventIDs[seletedEventIndex],
      severity: 'success',
      summary: `Bet ${
        betplacementType === BetPlacementType.BetPlacement
          ? 'placed'
          : 'removed'
      } on:`,
      detail: `${this.selectedFighter[seletedEventIndex]}`,
    });
  }

  toastError(seletedEventIndex: number) {
    this.messageService.add({
      key: this.fightEventIDs[seletedEventIndex],
      severity: 'error',
      summary: 'Error:',
      detail: `Please contact admin.`,
    });
  }
}
