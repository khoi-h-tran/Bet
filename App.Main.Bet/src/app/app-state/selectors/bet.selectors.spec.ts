import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ufcTestDataTS } from 'src/app/shared/test-data/UFCEventsTestData';
import * as betSelectors from './bet.selectors';
import { IUFCEvents } from 'src/app/shared/models/ufc-events.model';
import { AppState, BetState, UserState } from '../app.state';

describe('Bet Selectors', () => {
  let store: MockStore;

  const initialBetState: BetState = { ufcEvents: ufcTestDataTS };
  const initialUserState: UserState = {
    userName: '',
    login: '',
  };

  const projectorState: AppState = {
    bet: initialBetState,
    user: initialUserState,
  };

  const initialState: AppState = {
    bet: { ufcEvents: ufcTestDataTS },
    user: {
      userName: '',
      login: '',
    },
  };

  let ufcEventsFromSelector: ReadonlyArray<IUFCEvents> = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  it('should return a selection of UFC events', () => {
    store
      .select(betSelectors.selectUFCEvents)
      .subscribe((ufcEvents) => (ufcEventsFromSelector = ufcEvents));
    expect(ufcEventsFromSelector).toEqual(ufcTestDataTS);
  });

  it('should use projector to verify feature selection', () => {
    expect(betSelectors.selectUFCEvents.projector(initialState.bet)).toBe(
      initialState.bet.ufcEvents
    );
  });
});
