import { createReducer, on } from '@ngrx/store';

import { retrievedUFCEvents } from '../actions/bet.actions';
import { IUFCEvents } from '../../shared/models/ufc-events.model';

export const initialState: ReadonlyArray<IUFCEvents> = [
  {
    eventName: '',
    eventDate: new Date(),
    eventVenue: '',
    eventCards: [],
  },
];

export const betReducer = createReducer(
  initialState,
  on(retrievedUFCEvents, (state, { ufcEvents }) => ufcEvents)
);
