import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  HttpEvent,
  HttpParams,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AuthInterceptorService } from './auth-interceptor.service';
import { BetService } from '../bet-page/bet.service';
import { from, Observable, of } from 'rxjs';
import { asyncData } from 'src/app/shared/test-helpers/async-observable-helpers';
import { authUserTestData } from 'src/app/shared/test-data/user-test-data';

import { provideMockStore, MockStore } from '@ngrx/store/testing';

import * as betTestData from '../../shared/test-data/BetTestData.json';
import { selectAccessToken } from 'src/app/app-state/selectors/user.selectors';

// environemnt file
import { environment } from '../../../environments/environment';

// Firebase
import { ref, set, child, get, DataSnapshot } from 'firebase/database';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

// Useful stackoverflow articles

// unit test AngularFire
// https://stackoverflow.com/questions/38042941/how-to-mock-angularfire-2-service-in-unit-test
// unit testing interceptors
// https://stackoverflow.com/questions/69100788/how-to-unit-test-an-http-interceptor-in-angular-using-jasmine
// unit test auth interceptor
// https://alligator.io/angular/testing-http-interceptors/

describe('AuthInterceptorService', () => {
  let betService: BetService;
  let httpMock: HttpTestingController;
  let interceptor: AuthInterceptorService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let store: MockStore;

  httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        BetService,
        provideMockStore({
          selectors: [
            {
              selector: selectAccessToken,
              value: authUserTestData.accessToken,
            },
          ],
        }),
        { provide: HttpClient, useValue: httpClientSpy },
        AuthInterceptorService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptorService,
          multi: true,
        },
      ],
    });

    store = TestBed.inject(MockStore);
    betService = TestBed.inject(BetService);
    httpMock = TestBed.inject(HttpTestingController);
    interceptor = TestBed.inject(AuthInterceptorService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should be created', () => {
    const next: any = {
      handle: (modifiedReq: HttpRequest<any>) => {
        // expect the url parms to have the added auth=access token added to the url params
        expect(modifiedReq.urlWithParams).toEqual(
          '/test?auth=AuthorizedAccessToken'
        );
        return of(modifiedReq);
      },
    };

    // creating the mock request
    const requestMock = new HttpRequest('GET', '/test');
    expect(requestMock.urlWithParams).toEqual('/test');

    interceptor
      .intercept(requestMock, next)
      .subscribe((modifiedReq: HttpEvent<any>) => {
        // expect the HttpSent response to exist
        expect(modifiedReq).toBeTruthy();
      });
  });
});
