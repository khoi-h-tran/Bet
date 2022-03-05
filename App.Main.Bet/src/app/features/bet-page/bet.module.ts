import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import * as fromBetReducer from '../../app-state/reducers/bet.reducer';

// This is the module for the bet state feature
@NgModule({
  imports: [
    StoreModule.forFeature(
      fromBetReducer.betFeatureKey,
      fromBetReducer.betReducer
    ),
  ],
})
export class BetModule {}
