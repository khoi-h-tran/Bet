// Angular
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { ReactiveFormsModule } from '@angular/forms';
import { ScrollPanelModule } from 'primeng/scrollpanel';
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
import { AuthInterceptorService } from './features/auth/auth-interceptor.service';

// Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

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
    // This adds the user state feature - adds { userName: "", login: "" }
    AuthModule,
    AvatarModule,
    // This adds the bet state feature - adds { bet: { ufcEvents: [] }}
    BetModule,
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
    ReactiveFormsModule,
    ScrollPanelModule,
    // The root state - creates empty {} state
    StoreModule.forRoot({}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    TabMenuModule,
    TabViewModule,
    ToastModule,
    TooltipModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    Title,
    MessageService,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
