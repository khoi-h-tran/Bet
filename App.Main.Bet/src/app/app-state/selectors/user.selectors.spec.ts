import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ufcTestDataTS } from 'src/app/shared/test-data/UFCEventsTestData';
import * as userSelectors from './user.selectors';
import { IBetState, IUserState, IAppState } from '../app.state';
import { userTestData } from 'src/app/shared/test-data/user-test-data';

describe('User Selectors', () => {
  let store: MockStore;

  const initialBetState: IBetState = { ufcEvents: ufcTestDataTS };
  const initialUserState: IUserState = {
    userName: '',
    login: '',
  };

  const projectorState: IAppState = {
    bet: initialBetState,
    user: initialUserState,
  };

  const initialState: IAppState = {
    bet: { ufcEvents: ufcTestDataTS },
    user: {
      userName: '',
      login: '',
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  it('should return a selection of user name', () => {
    expect(userSelectors.selectUserName.projector(initialState.user)).toBe(
      initialState.user.userName
    );
  });

  it('should return a selection of login', () => {
    expect(userSelectors.selectLogin.projector(initialState.user)).toBe(
      initialState.user.login
    );
  });
});
