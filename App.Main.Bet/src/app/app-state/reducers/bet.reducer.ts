import { createReducer, on } from '@ngrx/store';

import * as BetActions from '../actions/bet.actions';
import { IBetState } from '../app.state';

// key that identifies the state feature
export const betFeatureKey = 'bet';

export const initialState: IBetState = {
  ufcEvents: [
    { eventName: '', eventDate: new Date(), eventVenue: '', eventCards: [] },
  ],
};

export const betReducer = createReducer(
  initialState,
  on(BetActions.retrievedUFCEvents, (state, { retrievedUFCEventsData }) => ({
    ufcEvents: retrievedUFCEventsData,
  }))
);
