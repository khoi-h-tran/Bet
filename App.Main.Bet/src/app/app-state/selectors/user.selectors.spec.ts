import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ufcTestDataTS } from 'src/app/shared/test-data/UFCEventsTestData';
import * as userSelectors from './user.selectors';
import { IBetState, IAppState } from '../app.state';
import { userTestData } from 'src/app/shared/test-data/user-test-data';
import { User } from 'src/app/shared/models/user.model';

describe('User Selectors', () => {
  let store: MockStore;

  const initialBetState: IBetState = { ufcEvents: ufcTestDataTS };
  const initialUserState: User = userTestData;

  const projectorState: IAppState = {
    bet: initialBetState,
    user: initialUserState,
  };

  const initialState: IAppState = {
    bet: { ufcEvents: ufcTestDataTS },
    user: new User('', '', '', '', ''),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  it('should return a selection of user name', () => {
    expect(
      userSelectors.selectAccessToken.projector(initialState.user.accessToken)
    ).toBe(initialState.user.accessToken);
  });

  // it('should return a selection of login', () => {
  //   expect(userSelectors.selectLogin.projector(initialState.user)).toBe(
  //     initialState.user.login
  //   );
  // });
});
