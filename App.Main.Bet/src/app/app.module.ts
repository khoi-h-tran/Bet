// Angular
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// NGRX
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BetModule } from './features/bet-page/bet.module';
import { AuthModule } from './features/auth/auth.module';

// environemnt file
import { environment } from '../environments/environment';

// PrimeNG
import { AccordionModule } from 'primeng/accordion';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TabViewModule } from 'primeng/tabview';
import { TabMenuModule } from 'primeng/tabmenu';

// Components
import { BetPageComponent } from './features/bet-page/bet-page.component';
import { FightEventCardComponent } from './features/bet-page/fight-event-card/fight-event-card.component';
import { FightEventComponent } from './features/bet-page/fight-event-card/fight-event/fight-event.component';
import { NavbarComponent } from './features/navbar/navbar.component';
import { StatisticsPageComponent } from './features/statistics-page/statistics-page.component';
import { AuthComponent } from './features/auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    BetPageComponent,
    NavbarComponent,
    StatisticsPageComponent,
    FightEventCardComponent,
    FightEventComponent,
    AuthComponent,
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
    // The root state - creates empty {} state
    StoreModule.forRoot({}),
    // This adds the bet state feature - adds { bet: { ufcEvents: [] }}
    BetModule,
    // This adds the user state feature - adds { userName: "", login: "" }
    AuthModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    TabMenuModule,
    TabViewModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [Title],
  bootstrap: [AppComponent],
})
export class AppModule {}
