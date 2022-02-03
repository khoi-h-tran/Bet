import { createAction, props } from '@ngrx/store';

export const betBets = createAction(
  '[Bet] Bet Bets'
);

export const betBetsSuccess = createAction(
  '[Bet] Bet Bets Success',
  props<{ data: any }>()
);

export const betBetsFailure = createAction(
  '[Bet] Bet Bets Failure',
  props<{ error: any }>()
);
