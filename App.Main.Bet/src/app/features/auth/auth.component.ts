import { Component, OnInit } from '@angular/core';

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
  // input from user
  userName: string = '';
  email: string = '';
  password: string = '';
  // invalid message
  invalidUserNameMsg: string = 'Invalid User Name';
  invalidEmailMsg: string = 'Invalid E-mail Address';
  invalidPasswordMsg: string = 'Invalid Password';

  constructor() {}

  ngOnInit(): void {}

  onAuthSelection(event: any) {
    let buttonClicked = event.target.innerText;

    buttonClicked === 'Sign up' ? (this.signup = true) : (this.login = true);
  }

  onSubmit(event: any) {
    let buttonClicked = event.target.innerText;

    console.log(buttonClicked);
  }

  onResetAuth() {
    this.signup = false;
    this.login = false;
  }

  onProceedAsGuest() {
    console.log('Proceed as guest');
  }
}
