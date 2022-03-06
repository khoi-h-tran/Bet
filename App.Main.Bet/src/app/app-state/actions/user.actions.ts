import { createAction, props } from '@ngrx/store';
import { IUserState } from '../app.state';

export const loadUsers = createAction(
  '[User] Load Users',
  props<{ loadedUserData: IUserState }>()
);
