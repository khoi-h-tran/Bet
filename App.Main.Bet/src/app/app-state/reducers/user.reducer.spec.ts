import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  unAuthUserTestData,
  authUserTestData,
} from 'src/app/shared/test-data/user-test-data';
import { loadUser } from '../actions/user.actions';
import { User } from 'src/app/shared/models/user.model';

import { userReducer } from './user.reducer';

describe('User Reducer', () => {
  let store: MockStore;

  const initialState: User = unAuthUserTestData;

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

  it('should reduce state with user data', () => {
    expect(
      userReducer(initialState, loadUser({ user: authUserTestData }))
    ).toEqual(authUserTestData);
  });
});
