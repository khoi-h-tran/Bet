import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { NavbarComponent } from './features/navbar/navbar.component';

import { AccordionModule } from 'primeng/accordion';
import { TabMenuModule } from 'primeng/tabmenu';

import { BetPageComponent } from './features/bet-page/bet-page.component';
import { StatisticsPageComponent } from './features/statistics-page/statistics-page.component';

import { betReducer } from './app-state/reducers/bet.reducer';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BetPageComponent,
    StatisticsPageComponent,
  ],
  imports: [
    AccordionModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ ufcEvents: betReducer }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    TabMenuModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [Title],
  bootstrap: [AppComponent],
})
export class AppModule {}
