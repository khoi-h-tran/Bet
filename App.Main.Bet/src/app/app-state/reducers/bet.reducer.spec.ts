import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { IUFCEvents } from 'src/app/shared/models/ufc-events.model';
import { ufcTestDataTS } from 'src/app/shared/test-data/UFCEventsTestData';
import { retrievedUFCEvents } from '../actions/bet.actions';
import { selectUFCEvents } from '../selectors/bet.selectors';

import * as betReducers from './bet.reducer';

describe('bet Reducer', () => {
  let store: MockStore;

  let ufcEventsInitialState: ReadonlyArray<IUFCEvents> = [];
  const initialState = ufcEventsInitialState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  it('should return the default state', () => {
    const { initialState } = betReducers;
    const action = {
      type: 'Unknown',
    };
    const state = betReducers.betReducer(initialState, action);

    expect(state).toBe(initialState);
  });

  it('should reduce state with UFC Events', () => {
    expect(
      betReducers.betReducer(
        initialState,
        retrievedUFCEvents({ ufcEvents: ufcTestDataTS })
      )
    ).toEqual(ufcTestDataTS);
  });
});
