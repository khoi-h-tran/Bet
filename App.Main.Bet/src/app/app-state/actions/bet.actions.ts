import { createAction, props } from '@ngrx/store';
import { IUFCEvents } from 'src/app/shared/models/ufc-events.model';

export const retrievedUFCEvents = createAction(
  '[UFC Events/API] Retrieve UFC Events Success',
  props<{ ufcEvents: ReadonlyArray<IUFCEvents> }>()
);
