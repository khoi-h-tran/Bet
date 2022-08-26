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
import { MockUFCEventsDataSnapShot } from 'src/app/shared/test-data/MockDataSnapShotVal';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { of } from 'rxjs';

// Firebase
// Firebase
import {
  getDatabase,
  ref,
  set,
  child,
  get,
  DataSnapshot,
  Query,
} from 'firebase/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth, Auth } from '@angular/fire/auth';
import {
  DatabaseReference,
  Database,
  provideDatabase,
} from '@angular/fire/database';
import { FirebaseApp, FIREBASE_OPTIONS } from '@angular/fire/compat';
import * as firebase from 'firebase/app';

// environemnt file
import { environment } from '../../../environments/environment';

import { LoginUserCredTestData } from 'src/app/shared/test-data/LoginUserCredentialsTestData';
import { BetPlacementTestData } from 'src/app/shared/test-data/BetPlacementTestData';
import { NO_ERRORS_SCHEMA } from '@angular/core';

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
    spyOn(betService, 'getUFCEvents').and.callThrough();
    spyOn(betService, 'getUsersBets').and.callThrough();
    spyOn(betService, 'placeBet').and.callThrough();
    spyOn(betService, 'removeBet').and.callThrough();
    spyOn(betService, 'log').and.callThrough();
    // spyOn(betService, 'handleError').and.callThrough();
  });

  it('should be created', () => {
    expect(betService).toBeTruthy();
  });

  it('should call UFC Events (firebase call)', () => {
    betService.getUFCEvents().subscribe();
    expect(betService.getUFCEvents).toHaveBeenCalled();
  });

  // it('should handle error', () => {
  //   betService.handleError('unit test operation');
  //   expect(betService.handleError).toHaveBeenCalled();
  // });

  // it('should return an error when the server returns a 404', (done: DoneFn) => {
  //   const errorResponse = new HttpErrorResponse({
  //     error: 'test 404 error',
  //     status: 404,
  //     statusText: 'Not Found',
  //   });

  //   httpClientSpy.get.and.returnValue(asyncError(errorResponse));

  //   betService.getUFCEvents().subscribe({
  //     next: (MockUFCEventsDataSnapShot) =>
  //       done.fail('expected an error, not ufc events'),
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
  //     next: (MockUFCEventsDataSnapShot) =>
  //       done.fail('expected on click event error'),
  //     error: (error) => {
  //       expect(error.message).toBe(undefined);
  //       done();
  //     },
  //   });
  // });

  it('should call getUserBets (firebase call)', () => {
    betService.getUsersBets(LoginUserCredTestData.user.uid);
    expect(betService.getUsersBets).toHaveBeenCalled();
  });

  it('should call placeBet (firebase call)', () => {
    betService.placeBet(BetPlacementTestData);
    expect(betService.placeBet).toHaveBeenCalled();
  });

  it('should call removeBet (firebase call)', () => {
    betService.removeBet(BetPlacementTestData);
    expect(betService.removeBet).toHaveBeenCalled();
  });

  it('should call log', () => {
    betService.log('unit test log');
    expect(betService.log).toHaveBeenCalled();
  });
});
