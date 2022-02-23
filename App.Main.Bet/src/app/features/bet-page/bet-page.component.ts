import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { BetService } from './bet.service';
import { retrievedUFCEvents } from '../../app-state/actions/bet.actions';
import { selectUFCEvents } from '../../app-state/selectors/bet.selectors';
import { IUFCEvents } from 'src/app/shared/models/ufc-events.model';

@Component({
  selector: 'app-bet-page',
  templateUrl: './bet-page.component.html',
  styleUrls: ['./bet-page.component.scss'],
})
export class BetPageComponent implements OnInit {
  // ufcEvents: ReadonlyArray<IUFCEvents> = [];
  ufcEvents: ReadonlyArray<IUFCEvents> = [];

  // ufcEvents$ = this.store.select(selectUFCEvents);

  constructor(private betService: BetService, private store: Store) {}

  ngOnInit(): void {
    this.betService.getUFCEvents().subscribe((ufcEvents) => {
      this.store.dispatch(retrievedUFCEvents({ ufcEvents }));
      this.store.select(selectUFCEvents).subscribe((d) => (this.ufcEvents = d));

      console.log(this.ufcEvents);
    });
  }

  // initial state of accordian headers
  activeState: boolean[] = [false, false, false];

  // toggles accordion headers (open and close)
  toggle(index: number) {
    this.activeState[index] = !this.activeState[index];
  }
}
