import { Component, Input, OnInit } from '@angular/core';
import { ICard } from 'src/app/shared/models/ufc-events.model';

@Component({
  selector: 'app-fight-event-card',
  templateUrl: './fight-event-card.component.html',
  styleUrls: ['./fight-event-card.component.scss'],
})
export class FightEventCardComponent implements OnInit {
  @Input() ufcEventCards: ICard[] = [];

  constructor() {}

  ngOnInit(): void {}
}
