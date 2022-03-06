import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  signup: boolean = false;
  login: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  onAuthSelection(event: any) {
    let buttonClicked = event.target.innerText;

    buttonClicked === 'Sign up' ? (this.signup = true) : (this.login = true);
  }
}
