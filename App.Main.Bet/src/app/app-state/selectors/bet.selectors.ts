import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IUFCEvents } from '../../shared/models/ufc-events.model';

export const selectUFCEvents =
  createFeatureSelector<ReadonlyArray<IUFCEvents>>('ufcEvents');
