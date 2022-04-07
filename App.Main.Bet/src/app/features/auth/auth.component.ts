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

  onLogIn() {
    let user: User;

    this.authService
      .logIn(this.logInEmail.value, this.logInPassword.value)
      .pipe(
        tap((userCredentials) => {
          user = this.createNewUser(userCredentials);
        }),
        switchMap((userCredentials: firebase.auth.UserCredential) => {
          return this.authService.createUser(userCredentials);
        })
      )
      .subscribe({
        next: (idTokenResult: IdTokenResult) => {
          this.addUserTokenData(idTokenResult, user);
          this.logInForm.reset();
          this.router.navigate(['/bet']);
        }, // completeHandler
        error: (err) => {
          this.toastOutputError(err.message);
        }, // errorHandler
      });
  }

  // TODO: unsubscribe from all subscriptions
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
          return this.authService.createUser(userCredentials);
        })
      )
      .subscribe({
        next: (idTokenResult: IdTokenResult) => {
          this.addUserTokenData(idTokenResult, user);
          this.signUpForm.reset();
          this.router.navigate(['/bet']);
        }, // completeHandler
        error: (err) => {
          this.toastOutputError(err.message);
        }, // errorHandler
      });
  }

  // signin/login helper methods
  createNewUser(userCredentials: firebase.auth.UserCredential) {
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

  onProceedAsGuest() {
    console.log('Proceed as guest');
  }

  toastOutputError(errorMessage: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error:',
      detail: errorMessage,
    });
  }
}
