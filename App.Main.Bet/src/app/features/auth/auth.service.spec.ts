import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { AuthService } from './auth.service';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

import * as signupUserTestData from '../../shared/test-data/SignupUserCredentialsTestData.json';
import { UserCredential } from 'firebase/auth';

// Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { loadUser } from 'src/app/app-state/actions/user.actions';
import { SignupUserCredTestData } from 'src/app/shared/test-data/SignupUserCredentialsTestData';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { asyncError } from 'src/app/shared/test-helpers/async-observable-helpers';
import {
  accessTokenMock,
  accessTokenUserCred,
  LoginUserCredTestData,
} from 'src/app/shared/test-data/LoginUserCredentialsTestData';
import { unAuthUserTestData } from 'src/app/shared/test-data/user-test-data';
import { AngularFireAuthMock } from 'src/app/shared/Mocks/AngularFireAuthMock';

describe('AuthService', () => {
  let authService: AuthService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  let router: Router;
  let store: MockStore;

  // converting JSON to user crendeital object
  let userCredObj: any = signupUserTestData; // string to generic object first
  let userCrentials: firebase.auth.UserCredential = <
    firebase.auth.UserCredential
  >userCredObj;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        AuthService,
        { provide: AngularFireAuth, useClass: AngularFireAuthMock },
        { provide: HttpClient, useValue: httpClientSpy },
        provideMockStore({
          selectors: [],
        }),
      ],
    });

    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router); // TestBed.inject(Router) for Angular 9+
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;

    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should test for the log console output', function () {
    console.log = jasmine.createSpy('log');
    authService.log('test');
    expect(console.log).toHaveBeenCalledWith('AuthService: test');
  });

  it('should be sign up', () => {
    // let signUpResult;
    authService
      .signUp('testUserName', 'testEmail', 'testPassword')
      .subscribe((result) => {
        // signUpResult = result;
        expect(result.user?.email).toEqual(SignupUserCredTestData!.user.email);
        expect(result.user?.displayName).toEqual(
          SignupUserCredTestData!.user.displayName
        );
      });
  });

  it('should return an error when the server returns a 404', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found',
    });

    const angularFireSpy = jasmine.createSpyObj('AngularFireAuth', [
      'createUserWithEmailAndPassword',
    ]);
    angularFireSpy.createUserWithEmailAndPassword.and.returnValue(
      new Promise((resolve, reject) => {
        reject(errorResponse);
      })
    );

    authService = new AuthService(angularFireSpy, router, store);

    authService.signUp('testUserName', 'testEmail', 'testPassword').subscribe({
      next: (userCred) => done.fail('expected an error, not user credentials'),
      error: (error) => {
        expect(error.message).toContain('404 Not Found');
        done();
      },
    });
  });

  it('should be login', () => {
    // let signUpResult;
    authService.logIn('testEmail', 'testPassword').subscribe((result) => {
      // signUpResult = result;
      expect(result.user?.email).toEqual(LoginUserCredTestData!.user.email);
      expect(result.user?.displayName).toEqual(
        LoginUserCredTestData!.user.displayName
      );
    });
  });

  it('should return an error when the server returns a 404', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found',
    });

    const angularFireSpy = jasmine.createSpyObj('AngularFireAuth', [
      'signInWithEmailAndPassword',
    ]);
    angularFireSpy.signInWithEmailAndPassword.and.returnValue(
      new Promise((resolve, reject) => {
        reject(errorResponse);
      })
    );

    authService = new AuthService(angularFireSpy, router, store);

    authService.logIn('testEmail', 'testPassword').subscribe({
      next: (userCred) => done.fail('expected an error, not user credentials'),
      error: (error) => {
        expect(error.message).toContain('404 Not Found');
        done();
      },
    });
  });

  it('should return access token', () => {
    spyOn(LoginUserCredTestData.user, 'getIdTokenResult').and.callThrough();
    // let signUpResult;
    authService.getTokenData(accessTokenUserCred).subscribe((result) => {
      expect(result).toEqual(accessTokenMock);
    });
  });

  it('should log out', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const authServiceSpy = spyOn(authService, 'clearAutoLogOut');

    authService.logOut();

    expect(store.dispatch).toHaveBeenCalledWith(
      loadUser({ user: unAuthUserTestData })
    );

    expect(navigateSpy).toHaveBeenCalledWith(['/auth']);

    expect(authServiceSpy).toHaveBeenCalled();
  });

  it('should clear auto logout (no existing timer)', () => {
    authService.clearAutoLogOut();
    expect(authService.tokenExpirationTimer).toBeFalsy();
  });

  it('should clear auto logout (with existing timer)', () => {
    authService.tokenExpirationTimer = setTimeout(() => {
      authService.logOut();
    }, 100);
    expect(authService.tokenExpirationTimer).toBeTruthy();
    authService.clearAutoLogOut();
    expect(authService.tokenExpirationTimer).toBeFalsy();
  });

  it('should logout based on timer', fakeAsync(() => {
    const logoutSpy = spyOn(authService, 'logOut');

    authService.tokenExpirationTimer = setTimeout(() => {
      authService.logOut();
    }, 3000);

    expect(authService.tokenExpirationTimer).toBeTruthy();

    expect(logoutSpy).not.toHaveBeenCalled();

    tick(3100);

    expect(logoutSpy).toHaveBeenCalled();
  }));

  it('should auto logout', fakeAsync(() => {
    const logoutSpy = spyOn(authService, 'logOut');

    // set the expiry date to 3 seconds from now
    let currentDate = new Date();
    currentDate.setSeconds(currentDate.getSeconds() + 3);

    // trigger the auto logout
    authService.autoLogOut(currentDate.toDateString());

    // check an expiration timer has been created
    expect(authService.tokenExpirationTimer).toBeTruthy();

    // check the logout has not been called before the timer ends
    expect(logoutSpy).not.toHaveBeenCalled();

    // fake the time passing
    tick(3100);

    // check the logout has been called
    expect(logoutSpy).toHaveBeenCalled();
  }));

  it('should return an error when triggered by native event', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: new Event('click'),
      status: 404,
      statusText: 'Not Found',
    });

    spyOn(authService, 'logIn').and.returnValue(asyncError(errorResponse));

    authService.logIn('user', 'password').subscribe({
      next: (accessToken) => done.fail('expected on click event error'),
      error: (error) => {
        expect(error.message).toBe(
          'Http failure response for (unknown url): 404 Not Found'
        );
        done();
      },
    });
  });
});
