// Angular
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

// Components
import { AuthService } from './auth.service';

// PrimeNG
import { MessageService } from 'primeng/api';

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
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  onAuthSelection(event: any) {
    let buttonClicked = event.target.innerText;

    buttonClicked === 'Sign up' ? (this.signup = true) : (this.login = true);
  }

  onLogIn(event: any) {
    let buttonClicked = event.target.innerText;

    console.log(buttonClicked);
    this.logInForm.reset();
    // this.authService.login();
  }

  onSignUp(event: any) {
    let buttonClicked = event.target.innerText;

    this.authService
      .signUp(this.signUpEmail.value, this.signUpPassword.value)
      .subscribe(
        (userCredentials) => {
          console.log(userCredentials);
        },
        (err) => {
          this.toastOutputError(err.message);
        }
      );
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
