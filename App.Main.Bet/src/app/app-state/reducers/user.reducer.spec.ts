import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { userTestData } from 'src/app/shared/test-data/user-test-data';
import { loadUsers } from '../actions/user.actions';
import { IUserState } from '../app.state';
import { userReducer } from './user.reducer';

describe('User Reducer', () => {
  let store: MockStore;

  const initialState: IUserState = {
    userName: '',
    login: '',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = userReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  it('should reduce state with UFC Events', () => {
    expect(
      userReducer(initialState, loadUsers({ loadedUserData: userTestData }))
    ).toEqual({ userName: userTestData.userName, login: userTestData.login });
  });
});
