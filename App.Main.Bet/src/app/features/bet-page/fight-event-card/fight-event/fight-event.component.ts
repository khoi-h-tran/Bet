import { Component, Input, OnInit } from '@angular/core';
import { IBetPlacement, IEvent } from 'src/app/shared/models/ufc-events.model';

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

  // TODO: Unit test this
  // An array of the selected fighters for each specific fight event
  // Index matches the UfcFightEvents index
  selectedFighter: string[] = new Array<string>(this.ufcFightEvents.length);

  constructor() {}

  // TODO: Unit test this and the checkboxes added
  ngOnInit(): void {
    this.ufcFightEvents.forEach((fightEvent, index) => {
      this.selectedFighter[index] = fightEvent.selectedFighter;
    });
  }

  // TODO: Unit test
  onPlaceBet(seletedEventIndex: number) {
    // create object to send back for database storage
    let betPlacement: IBetPlacement = {
      userID: 'tempId123',
      eventName: this.eventName,
      cardType: this.cardType,
      eventWeightClass: this.ufcFightEvents[seletedEventIndex].eventWeightClass,
      selectedFighter: this.selectedFighter[seletedEventIndex],
    };
    // Send bet to database to update
    console.log(betPlacement);
  }
}
