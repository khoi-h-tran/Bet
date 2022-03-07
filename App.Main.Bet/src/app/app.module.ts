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

// PrimeNG Modules
import { AccordionModule } from 'primeng/accordion';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TabViewModule } from 'primeng/tabview';
import { TabMenuModule } from 'primeng/tabmenu';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

// PrimeNG Services
import { MessageService } from 'primeng/api';

// Components
import { BetPageComponent } from './features/bet-page/bet-page.component';
import { FightEventCardComponent } from './features/bet-page/fight-event-card/fight-event-card.component';
import { FightEventComponent } from './features/bet-page/fight-event-card/fight-event/fight-event.component';
import { NavbarComponent } from './features/navbar/navbar.component';
import { StatisticsPageComponent } from './features/statistics-page/statistics-page.component';
import { AuthComponent } from './features/auth/auth.component';
import { ErrorPageComponent } from './features/error-page/error-page.component';

@NgModule({
  declarations: [
    AppComponent,
    BetPageComponent,
    NavbarComponent,
    StatisticsPageComponent,
    FightEventCardComponent,
    FightEventComponent,
    AuthComponent,
    ErrorPageComponent,
  ],
  imports: [
    AccordionModule,
    AppRoutingModule,
    AvatarModule,
    BrowserAnimationsModule,
    BrowserModule,
    ButtonModule,
    CardModule,
    DialogModule,
    FormsModule,
    HttpClientModule,
    InputTextModule,
    PasswordModule,
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
    ToastModule,
    TooltipModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [Title, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
