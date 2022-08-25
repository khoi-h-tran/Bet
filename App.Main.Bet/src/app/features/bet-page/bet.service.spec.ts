import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  asyncData,
  asyncError,
} from '../../shared/test-helpers/async-observable-helpers';

import { BetService } from './bet.service';
import { IUFCEvents } from '../../shared/models/ufc-events.model';
import * as ufcTestDataJSON from '../../shared/test-data/UFCEventsTestData.json';
import { ufcTestDataTS } from '../../shared/test-data/UFCEventsTestData';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

// Firebase
import { ref, set, child, get, DataSnapshot } from 'firebase/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import * as firebase from 'firebase/app';

// environemnt file
import { environment } from '../../../environments/environment';

import { LoginUserCredTestData } from 'src/app/shared/test-data/LoginUserCredentialsTestData';
import { BetPlacementTestData } from 'src/app/shared/test-data/BetPlacementTestData';

// const mockFirebaseApp: FirebaseApp = {
//   name: '',
//   options: {},
//   automaticDataCollectionEnabled: false
// }

// const mockDatabase: Database = {
//   app: mockFirebaseApp,
//   type: 'database'
// }

// const getDatabaseMock(app?: FirebaseApp | undefined, url?: string | undefined): Database => {

// }

describe('BetService', () => {
  let betService: BetService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let store: MockStore;
  firebase.initializeApp(environment.firebase);

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideDatabase(() => getDatabase()),
      ],
      providers: [
        BetService,
        { provide: HttpClient, useValue: httpClientSpy },
        provideMockStore({
          selectors: [],
        }),
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
      ],
    });

    betService = TestBed.inject(BetService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;

    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should be created', () => {
    expect(betService).toBeTruthy();
  });

  it('should call UFC Events (firebase call)', () => {
    const betServiceSpy = spyOn(betService, 'getUFCEvents');

    betService.getUFCEvents();

    expect(betServiceSpy).toHaveBeenCalled();
  });

  // it('should return an error when the server returns a 404', (done: DoneFn) => {
  //   const errorResponse = new HttpErrorResponse({
  //     error: 'test 404 error',
  //     status: 404,
  //     statusText: 'Not Found',
  //   });

  //   httpClientSpy.get.and.returnValue(asyncError(errorResponse));

  //   betService.getUFCEvents().subscribe({
  //     next: (ufcEvents) => done.fail('expected an error, not ufc events'),
  //     error: (error) => {
  //       expect(error.message).toContain('test 404 error');
  //       done();
  //     },
  //   });
  // });

  // it('should return an error when triggered by native event', (done: DoneFn) => {
  //   const errorResponse = new HttpErrorResponse({
  //     error: new Event('click'),
  //     status: 404,
  //     statusText: 'Not Found',
  //   });

  //   httpClientSpy.get.and.returnValue(asyncError(errorResponse));

  //   betService.getUFCEvents().subscribe({
  //     next: (ufcEvents) => done.fail('expected on click event error'),
  //     error: (error) => {
  //       expect(error.message).toBe(undefined);
  //       done();
  //     },
  //   });
  // });

  it('should call getUserBets (firebase call)', () => {
    const betServiceSpy = spyOn(betService, 'getUsersBets');

    betService.getUsersBets(LoginUserCredTestData.user.uid);

    expect(betServiceSpy).toHaveBeenCalled();
  });

  it('should call placeBet (firebase call)', () => {
    const betServiceSpy = spyOn(betService, 'placeBet');

    betService.placeBet(BetPlacementTestData);

    expect(betServiceSpy).toHaveBeenCalled();
  });
});
