import { Component, Input, OnInit } from '@angular/core';

// models
import { IEvent } from 'src/app/shared/models/ufc-events.model';
import { IBetPlacement } from 'src/app/shared/models/bet.model';

// Services
import { BetService } from '../../bet.service';

// PrimeNG
import { MessageService } from 'primeng/api';

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
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.ufcFightEvents.forEach((fightEvent, index) => {
      this.selectedFighter[index] = fightEvent.selectedFighter;
      this.fightEventIDs[
        index
      ] = `${fightEvent.eventFighter1.fighterName}vs${fightEvent.eventFighter2.fighterName}`;
    });
  }

  // TODO: Unit test this
  onPlaceBet(seletedEventIndex: number) {
    // Store the data we need into local variables
    let userID: string = 'tempId123';
    let eventName: string = this.removeSpaces(this.eventName);
    let cardType: string = this.removeSpaces(this.cardType);
    let eventWeightClass: string =
      this.ufcFightEvents[seletedEventIndex].eventWeightClass;
    let selectedFighter: string = this.selectedFighter[seletedEventIndex];

    // build the database key
    let key: string = `${userID}_${eventName}_${cardType}_${eventWeightClass}`;

    let betPlacement: IBetPlacement = { selectedFighter: selectedFighter };

    this.callServiceAddBet(seletedEventIndex, key, betPlacement);
  }

  removeSpaces(inputString: string): string {
    return inputString.replace(/\s/g, '');
  }

  callServiceAddBet(
    seletedEventIndex: number,
    key: string,
    selectedFighter: IBetPlacement
  ) {
    this.betService.addBet(key, selectedFighter).subscribe(
      (response) => {
        this.toastOutputSuccess(seletedEventIndex);
      },
      (error) => {
        this.toastOutputError(seletedEventIndex);
      }
    );
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
