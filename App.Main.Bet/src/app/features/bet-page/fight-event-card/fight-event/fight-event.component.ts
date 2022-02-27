import { Component, Input, OnInit } from '@angular/core';
import { IEvent } from 'src/app/shared/models/ufc-events.model';

@Component({
  selector: 'app-fight-event',
  templateUrl: './fight-event.component.html',
  styleUrls: ['./fight-event.component.scss'],
})
export class FightEventComponent implements OnInit {
  @Input() ufcFightEvents: IEvent[] = [];
  @Input() eventTime: Date = new Date();

  constructor() {}

  ngOnInit(): void {}
}
