import { Component, Input, OnInit } from '@angular/core';
import { ICard } from 'src/app/shared/models/ufc-events.model';

@Component({
  selector: 'app-fight-event-card',
  templateUrl: './fight-event-card.component.html',
  styleUrls: ['./fight-event-card.component.scss'],
})
export class FightEventCardComponent implements OnInit {
  @Input() ufcEventCards: ICard[] = [];

  // Passed in from parent component
  // Pass to child component (to build bet placement object)
  @Input() eventName: string = '';

  constructor() {}

  ngOnInit(): void {}
}
