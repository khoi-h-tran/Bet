import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/models/user.model';

export const loadUser = createAction(
  '[User] Load User',
  props<{ user: User }>()
);
