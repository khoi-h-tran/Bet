import { createSelector, createFeatureSelector } from '@ngrx/store';
import { BetState } from '../app.state';

// Create the bet part (i.e. feature) of the state
export const selectBetFeature = createFeatureSelector<BetState>('bet');

// Within the bet feature, select the ufc Events value
export const selectUFCEvents = createSelector(
  selectBetFeature,
  (state: BetState) => state.ufcEvents
);
