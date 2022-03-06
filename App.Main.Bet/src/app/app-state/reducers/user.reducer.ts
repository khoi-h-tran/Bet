import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';
import { IUserState } from '../app.state';

export const userFeatureKey = 'user';

export const initialState: IUserState = {
  userName: '',
  login: '',
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsers, (state, { loadedUserData }) => ({
    userName: loadedUserData.userName,
    login: loadedUserData.login,
  }))
);
