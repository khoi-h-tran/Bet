import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUserState } from '../app.state';

// Create the user part (i.e. feature) of the state
export const selectUserFeature = createFeatureSelector<IUserState>('user');

// Within the user feature, select the user name
export const selectUserName = createSelector(
  selectUserFeature,
  (state: IUserState) => state.userName
);

// Within the user feature, select the login
export const selectLogin = createSelector(
  selectUserFeature,
  (state: IUserState) => state.login
);
