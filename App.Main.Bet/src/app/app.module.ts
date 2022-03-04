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
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TabViewModule } from 'primeng/tabview';
import { TabMenuModule } from 'primeng/tabmenu';

import { BetPageComponent } from './features/bet-page/bet-page.component';
import { StatisticsPageComponent } from './features/statistics-page/statistics-page.component';

import { betReducer } from './app-state/reducers/bet.reducer';
import { HttpClientModule } from '@angular/common/http';
import { FightEventCardComponent } from './features/bet-page/fight-event-card/fight-event-card.component';
import { FightEventComponent } from './features/bet-page/fight-event-card/fight-event/fight-event.component';

@NgModule({
  declarations: [
    AppComponent,
    BetPageComponent,
    NavbarComponent,
    StatisticsPageComponent,
    FightEventCardComponent,
    FightEventComponent,
  ],
  imports: [
    AccordionModule,
    AppRoutingModule,
    AvatarModule,
    BrowserAnimationsModule,
    BrowserModule,
    CardModule,
    FormsModule,
    HttpClientModule,
    RadioButtonModule,
    StoreModule.forRoot({ ufcEvents: betReducer }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    TabMenuModule,
    TabViewModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [Title],
  bootstrap: [AppComponent],
})
export class AppModule {}
