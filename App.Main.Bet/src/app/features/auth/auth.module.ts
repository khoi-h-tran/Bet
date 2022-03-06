import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import * as fromUserReducer from '../../app-state/reducers/user.reducer';

// This is the module for the bet state feature
@NgModule({
  imports: [
    StoreModule.forFeature(
      fromUserReducer.userFeatureKey,
      fromUserReducer.userReducer
    ),
  ],
})
export class AuthModule {}
