import { TestBed } from '@angular/core/testing';

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

fdescribe('AuthService', () => {
  let authService: AuthService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  let router: Router;
  let store: MockStore;

  // converting JSON to user crendeital object
  let userCredObj: any = signupUserTestData; // string to generic object first
  let userCrentials: firebase.auth.UserCredential = <
    firebase.auth.UserCredential
  >userCredObj;

  class AngularFireAuthMock {
    createUserWithEmailAndPassword(
      email: string,
      password: string
    ): Promise<any> {
      return new Promise((resolve) => {
        resolve(SignupUserCredTestData);
      });
    }
  }

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
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should test for the log console output', function () {
    console.log = jasmine.createSpy('log');
    authService.log('test');
    expect(console.log).toHaveBeenCalledWith('AuthService: test');
  });

  it('should be created', () => {
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
});
