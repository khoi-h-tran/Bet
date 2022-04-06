import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ufcTestDataTS } from 'src/app/shared/test-data/UFCEventsTestData';
import * as betSelectors from './bet.selectors';
import { IUFCEvents } from 'src/app/shared/models/ufc-events.model';
import { IAppState, IBetState } from '../app.state';
import { userTestData } from 'src/app/shared/test-data/user-test-data';
import { User } from 'src/app/shared/models/user.model';

describe('Bet Selectors', () => {
  let store: MockStore;

  const initialBetState: IBetState = { ufcEvents: ufcTestDataTS };
  const initialUserState: User = userTestData;

  const projectorState: IAppState = {
    bet: initialBetState,
    user: initialUserState,
  };

  const initialState: IAppState = {
    bet: { ufcEvents: ufcTestDataTS },
    user: new User('', '', '', '', '', new Date()),
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
