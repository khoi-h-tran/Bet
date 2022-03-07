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
  ufcEvents: ReadonlyArray<IUFCEvents> = [];
  // initial state of accordian headers (set up after ngOnInit to length of UFC events)
  activeState!: boolean[];

  constructor(private betService: BetService, private store: Store) {}

  ngOnInit(): void {
    // TODO: implement try catch
    this.betService.getUFCEvents().subscribe((retrievedUFCEventsData) => {
      this.store.dispatch(retrievedUFCEvents({ retrievedUFCEventsData }));
      this.store
        .select(selectUFCEvents)
        .subscribe((ufcEvents) => (this.ufcEvents = ufcEvents));
    });
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
