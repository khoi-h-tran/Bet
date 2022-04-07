import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from 'src/app/shared/models/user.model';

// Create the user part (i.e. feature) of the state
export const selectUserFeature = createFeatureSelector<User>('user');

// Within the user feature, select the access token
export const selectAccessToken = createSelector(
  selectUserFeature,
  (state: User) => state.accessToken
);

// Within the user feature, select the user name
// export const selectUserName = createSelector(
//   selectUserFeature,
//   (state: User) => state.userName
// );

// Within the user feature, select the login
// export const selectLogin = createSelector(
//   selectUserFeature,
//   (state: User) => state.login
// );
