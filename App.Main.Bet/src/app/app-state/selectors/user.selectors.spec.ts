import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ufcTestDataTS } from 'src/app/shared/test-data/UFCEventsTestData';
import * as userSelectors from './user.selectors';
import { IBetState, IAppState } from '../app.state';
import { unAuthUserTestData } from 'src/app/shared/test-data/user-test-data';
import { User } from 'src/app/shared/models/user.model';

describe('User Selectors', () => {
  let store: MockStore;

  const initialBetState: IBetState = { ufcEvents: ufcTestDataTS };
  const initialUserState: User = unAuthUserTestData;

  const projectorState: IAppState = {
    bet: initialBetState,
    user: initialUserState,
  };

  const initialState: IAppState = {
    bet: { ufcEvents: ufcTestDataTS },
    user: initialUserState,
  };

  let accessTokenFromSelector: string;
  let userIDFromSelector: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  it('should return a selection of UFC events', () => {
    store
      .select(userSelectors.selectAccessToken)
      .subscribe((accessToken) => (accessTokenFromSelector = accessToken));
    expect(accessTokenFromSelector).toEqual(unAuthUserTestData.accessToken);
  });

  it('should use projector to verify feature selection', () => {
    expect(userSelectors.selectAccessToken.projector(initialState.user)).toBe(
      initialState.user.accessToken
    );
  });

  it('should return a selection of UFC events', () => {
    store
      .select(userSelectors.selectUserID)
      .subscribe((userID) => (userIDFromSelector = userID));
    expect(userIDFromSelector).toEqual(unAuthUserTestData.userID);
  });

  it('should use projector to verify feature selection', () => {
    expect(userSelectors.selectUserID.projector(initialState.user)).toBe(
      initialState.user.userID
    );
  });
});
