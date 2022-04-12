// Angular
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

// Components
import { AuthService } from './auth.service';

// PrimeNG
import { MessageService } from 'primeng/api';

// NGRx
import { Store } from '@ngrx/store';
import { loadUser } from 'src/app/app-state/actions/user.actions';
import { Observable, of, switchMap, tap } from 'rxjs';

// Models
import { User } from 'src/app/shared/models/user.model';

// Firebase
import firebase from 'firebase/compat/app';
import { IdTokenResult } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
// TODO: UNIT TEST Entire Class
export class AuthComponent implements OnInit {
  // tracks which button user clicked on
  signup: boolean = false;
  login: boolean = false;
  // Sets the dialog to display
  display: boolean = true;

  // Note: Created separate forms for sign-up and log-in because if you nest form validation in directives like NgIf, it doesn't work.
  // e.g. NgIf within an NgIf. It no longer recognizes where or not the form is valid. So I had to spread out the logic.
  signUpForm = this.fb.group({
    userName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  logInForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  get signUpUserName() {
    return this.signUpForm.get('userName')!;
  }
  get signUpEmail() {
    return this.signUpForm.get('email')!;
  }
  get signUpPassword() {
    return this.signUpForm.get('password')!;
  }

  get logInEmail() {
    return this.logInForm.get('email')!;
  }
  get logInPassword() {
    return this.logInForm.get('password')!;
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onAuthSelection(event: any) {
    let buttonClicked = event.target.innerText;

    buttonClicked === 'Sign up' ? (this.signup = true) : (this.login = true);
  }

  onGuestLogIn() {
    let user: User;

    this.authService
      // logging in through firebase
      .logIn('guest@guest.com', 'guestpassword')
      .pipe(
        // once login is successful, use credentials to populate user data (access token must be retrieved after)
        tap((userCredentials) => {
          user = this.createNewUser(userCredentials);
        }),
        // switch map so we can get the token data (firebase makes us get this using a promise after the user credentials are retrieved)
        switchMap((userCredentials: firebase.auth.UserCredential) => {
          return this.authService.getTokenData(userCredentials);
        })
      )
      // after the initial user data was populated and we have the access token data returned as an observable
      .subscribe({
        next: (idTokenResult: IdTokenResult) => {
          // add the access token data
          this.addUserTokenData(idTokenResult, user);
          // start the auto log-out timer (logs out upon token expiry)
          this.authService.autoLogOut(idTokenResult.expirationTime);
          this.logInForm.reset();
          this.router.navigate(['/bet']);
        }, // completeHandler
        error: (err) => {
          this.toastOutputError(err.message);
        }, // errorHandler
      });
  }

  onLogIn() {
    let user: User;

    this.authService
      // logging in through firebase
      .logIn(this.logInEmail.value, this.logInPassword.value)
      .pipe(
        // once login is successful, use credentials to populate user data (access token must be retrieved after)
        tap((userCredentials) => {
          user = this.createNewUser(userCredentials);
        }),
        // switch map so we can get the token data (firebase makes us get this using a promise after the user credentials are retrieved)
        switchMap((userCredentials: firebase.auth.UserCredential) => {
          return this.authService.getTokenData(userCredentials);
        })
      )
      // after the initial user data was populated and we have the access token data returned as an observable
      .subscribe({
        next: (idTokenResult: IdTokenResult) => {
          // add the access token data
          this.addUserTokenData(idTokenResult, user);
          // start the auto log-out timer (logs out upon token expiry)
          this.authService.autoLogOut(idTokenResult.expirationTime);
          this.logInForm.reset();
          this.router.navigate(['/bet']);
        }, // completeHandler
        error: (err) => {
          this.toastOutputError(err.message);
        }, // errorHandler
      });
  }

  // TODO: unsubscribe from all subscriptions
  // Same logic as Sign in
  onSignUp() {
    let user: User;

    this.authService
      .signUp(
        this.signUpUserName.value,
        this.signUpEmail.value,
        this.signUpPassword.value
      )
      .pipe(
        tap((userCredentials) => {
          user = this.createNewUser(userCredentials);
        }),
        switchMap((userCredentials: firebase.auth.UserCredential) => {
          return this.authService.getTokenData(userCredentials);
        })
      )
      .subscribe({
        next: (idTokenResult: IdTokenResult) => {
          this.addUserTokenData(idTokenResult, user);
          this.authService.autoLogOut(idTokenResult.expirationTime);
          this.signUpForm.reset();
          this.router.navigate(['/bet']);
        }, // completeHandler
        error: (err) => {
          this.toastOutputError(err.message);
        }, // errorHandler
      });
  }

  // signin/login helper methods
  // createNewUser(userCredentials: firebase.auth.UserCredential) {
  createNewUser(userCredentials: any) {
    return new User(
      userCredentials.user?.displayName
        ? userCredentials.user?.displayName
        : '',
      userCredentials.user?.email ? userCredentials.user?.email : '',
      userCredentials.user?.uid ? userCredentials.user?.uid : '',
      '',
      userCredentials.user?.refreshToken
        ? userCredentials.user?.refreshToken
        : ''
    );
  }

  addUserTokenData(idTokenResult: IdTokenResult, user: User) {
    user.ExpirationDate = idTokenResult.expirationTime;
    user.accessToken = idTokenResult.token;

    this.store.dispatch(loadUser({ user }));
  }

  onResetAuth() {
    this.signup = false;
    this.login = false;
  }

  toastOutputError(errorMessage: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error:',
      detail: errorMessage,
    });
  }
}
