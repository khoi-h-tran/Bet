import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';
import { User } from 'src/app/shared/models/user.model';
import { userTestData } from 'src/app/shared/test-data/user-test-data';

export const userFeatureKey = 'user';

export const initialState: User = userTestData;

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUser, (state, { user }) => user)
);
