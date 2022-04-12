import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthMock } from 'src/app/shared/Mocks/AngularFireAuthMock';

import { AuthComponent } from './auth.component';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HttpClient } from '@angular/common/http';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PasswordModule } from 'primeng/password';
import { SignupUserCredTestData } from 'src/app/shared/test-data/SignupUserCredentialsTestData';
import { User } from 'src/app/shared/models/user.model';
import {
  accessTokenMock,
  LoginUserCredTestData,
} from 'src/app/shared/test-data/LoginUserCredentialsTestData';
import { MockIDTokenResult } from 'src/app/shared/test-data/mockIDTokenResult';
import { AuthService } from './auth.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let store: MockStore;
  let messageService: MessageService;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
        ToastModule,
        DialogModule,
        ButtonModule,
        BrowserAnimationsModule,
        PasswordModule,
      ],
      providers: [
        MessageService,
        AuthService,
        { provide: AngularFireAuth, useClass: AngularFireAuthMock },
        { provide: HttpClient, useValue: httpClientSpy },
        provideMockStore({
          selectors: [],
        }),
      ],
      declarations: [AuthComponent],
    }).compileComponents();

    router = TestBed.inject(Router);
    messageService = TestBed.inject(MessageService);
    authService = TestBed.inject(AuthService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch').and.callThrough();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct default properties', () => {
    // test boolean values
    expect(component.signup).toBeFalse();
    expect(component.login).toBeFalse();
    expect(component.display).toBeTrue();

    // test forms exist
    expect(component.signUpForm).toBeTruthy();
    expect(component.logInForm).toBeTruthy();

    // buttons should appear on screen
    const authPageElement: HTMLElement = fixture.nativeElement;
    let buttons = authPageElement.querySelectorAll('.p-button');
    expect(buttons[0].textContent).toEqual('Sign up');
    expect(buttons[1].textContent).toEqual('Login');
    expect(buttons[2].textContent).toEqual('Proceed as Guest');
  });

  it('should handle signup', fakeAsync(() => {
    spyOn(component, 'onAuthSelection').and.callThrough();

    const authPageElement = fixture.nativeElement;
    let signupButton = authPageElement.querySelector('.signup button');

    expect(component.signup).toBeFalse();
    expect(component.login).toBeFalse();

    signupButton.click();
    tick();

    fixture.detectChanges();

    expect(component.onAuthSelection).toHaveBeenCalled();
    expect(component.signup).toBeTrue();
    expect(component.login).toBeFalse();

    const authPageHTMLElement = fixture.nativeElement;
    let signUpForm: HTMLElement =
      authPageHTMLElement.querySelector('#signUpForm');
    const signUpFormElements = signUpForm.querySelectorAll('input');

    expect(signUpFormElements.length).toEqual(3);

    const signupFormGroup = component.signUpForm;

    const signupFormValues = {
      userName: '',
      email: '',
      password: '',
    };

    expect(signupFormGroup.value).toEqual(signupFormValues);

    expect(component.signUpUserName.errors!['required']).toBeTrue();
    expect(component.signUpUserName.status).toBe('INVALID');

    expect(component.signUpEmail.errors!['required']).toBeTrue();
    expect(component.signUpEmail.status).toBe('INVALID');

    expect(component.signUpPassword.errors!['required']).toBeTrue();
    expect(component.signUpPassword.status).toBe('INVALID');

    const userNameElement: HTMLInputElement = authPageHTMLElement.querySelector(
      '#signUpForm .userName input'
    );
    userNameElement.value = 'testUserName';
    userNameElement.dispatchEvent(new Event('input'));

    const emailElement: HTMLInputElement = authPageHTMLElement.querySelector(
      '#signUpForm .email input'
    );
    emailElement.value = 'khoi@gmail.com';
    emailElement.dispatchEvent(new Event('input'));

    const passwordElement: HTMLInputElement = authPageHTMLElement.querySelector(
      '#signUpForm .password input'
    );
    passwordElement.value = 'password';
    passwordElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(component.signUpUserName.value).toEqual(userNameElement.value);
    expect(component.signUpUserName.errors).toBeNull();

    expect(component.signUpEmail.value).toEqual(emailElement.value);
    expect(component.signUpEmail.errors).toBeNull();

    expect(component.signUpPassword.value).toEqual(passwordElement.value);
    expect(component.signUpPassword.errors).toBeNull();

    expect(component.signUpForm.valid).toBeTrue();
  }));

  it('should handle login', fakeAsync(() => {
    spyOn(component, 'onAuthSelection').and.callThrough();

    const authPageElement = fixture.nativeElement;
    let loginButton = authPageElement.querySelector('.login button');

    expect(component.signup).toBeFalse();
    expect(component.login).toBeFalse();

    loginButton.click();
    tick();

    fixture.detectChanges();

    expect(component.onAuthSelection).toHaveBeenCalled();
    expect(component.login).toBeTrue();
    expect(component.signup).toBeFalse();

    const authPageHTMLElement = fixture.nativeElement;
    let logInForm: HTMLElement =
      authPageHTMLElement.querySelector('#logInForm');
    const signUpFormElements = logInForm.querySelectorAll('input');

    expect(signUpFormElements.length).toEqual(2);

    const loginFormGroup = component.logInForm;

    const loginFormValues = {
      email: '',
      password: '',
    };

    expect(loginFormGroup.value).toEqual(loginFormValues);

    expect(component.logInEmail.errors!['required']).toBeTrue();
    expect(component.logInEmail.status).toBe('INVALID');

    expect(component.logInPassword.errors!['required']).toBeTrue();
    expect(component.logInPassword.status).toBe('INVALID');

    const emailElement: HTMLInputElement = authPageHTMLElement.querySelector(
      '#logInForm .email input'
    );
    emailElement.value = 'khoi@gmail.com';
    emailElement.dispatchEvent(new Event('input'));

    const passwordElement: HTMLInputElement = authPageHTMLElement.querySelector(
      '#logInForm .password input'
    );
    passwordElement.value = 'password';
    passwordElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(component.logInEmail.value).toEqual(emailElement.value);
    expect(component.logInEmail.errors).toBeNull();

    expect(component.logInPassword.value).toEqual(passwordElement.value);
    expect(component.logInPassword.errors).toBeNull();

    expect(component.logInForm.valid).toBeTrue();
  }));

  it('should handle go back from signup', fakeAsync(() => {
    spyOn(component, 'onResetAuth').and.callThrough();

    const authPageElement = fixture.nativeElement;
    let signupButton = authPageElement.querySelector('.signup button');

    expect(component.signup).toBeFalse();
    expect(component.login).toBeFalse();

    signupButton.click();
    tick();
    fixture.detectChanges();

    let goBackButton = authPageElement.querySelector('.goBack button');

    goBackButton.click();
    tick();
    fixture.detectChanges();

    expect(component.onResetAuth).toHaveBeenCalled();
    expect(component.signup).toBeFalse();
    expect(component.login).toBeFalse();
  }));

  it('should handle go back from login', fakeAsync(() => {
    spyOn(component, 'onResetAuth').and.callThrough();

    const authPageElement = fixture.nativeElement;
    let loginButton = authPageElement.querySelector('.login button');

    expect(component.signup).toBeFalse();
    expect(component.login).toBeFalse();

    loginButton.click();
    tick();
    fixture.detectChanges();

    let goBackButton = authPageElement.querySelector('.goBack button');

    goBackButton.click();
    tick();
    fixture.detectChanges();

    expect(component.onResetAuth).toHaveBeenCalled();
    expect(component.signup).toBeFalse();
    expect(component.login).toBeFalse();
  }));

  it('should create new user', () => {
    const testSignupUser: User = new User(
      '',
      'khoi.huynh.tran@gmail.com',
      '9GnElKRIxogCoyFcms0JmYuM4SS2',
      '',
      ''
    );

    const testLoginUser: User = new User(
      'Khoi',
      'khoi.huynh.tran@gmail.com',
      '9GnElKRIxogCoyFcms0JmYuM4SS2',
      '',
      ''
    );

    expect(component.createNewUser(SignupUserCredTestData)).toEqual(
      testSignupUser
    );

    expect(component.createNewUser(LoginUserCredTestData)).toEqual(
      testLoginUser
    );
  });

  it('should add access token to user', () => {
    const testSignupUser: User = new User(
      '',
      'khoi.huynh.tran@gmail.com',
      '9GnElKRIxogCoyFcms0JmYuM4SS2',
      '',
      ''
    );

    expect(component.createNewUser(SignupUserCredTestData)).toEqual(
      testSignupUser
    );

    component.addUserTokenData(MockIDTokenResult, testSignupUser);

    expect(testSignupUser.expirationDate).toEqual(
      new Date(MockIDTokenResult.expirationTime)
    );
    expect(testSignupUser.accessToken).toEqual(MockIDTokenResult.token);

    const testLoginUser: User = new User(
      'Khoi',
      'khoi.huynh.tran@gmail.com',
      '9GnElKRIxogCoyFcms0JmYuM4SS2',
      '',
      ''
    );

    expect(component.createNewUser(LoginUserCredTestData)).toEqual(
      testLoginUser
    );

    component.addUserTokenData(MockIDTokenResult, testLoginUser);

    expect(testLoginUser.expirationDate).toEqual(
      new Date(MockIDTokenResult.expirationTime)
    );
    expect(testLoginUser.accessToken).toEqual(MockIDTokenResult.token);
  });

  it('should add toast message', () => {
    spyOn(messageService, 'add');

    component.toastOutputError('test error');

    expect(messageService.add).toHaveBeenCalled();
  });

  it('should log in guest', () => {
    spyOn(authService, 'logIn').and.returnValue(of(LoginUserCredTestData));
    spyOn(authService, 'getTokenData').and.returnValue(of(accessTokenMock));
    spyOn(component, 'addUserTokenData');
    spyOn(authService, 'autoLogOut');
    const navigateSpy = spyOn(router, 'navigate');

    component.onGuestLogIn();

    expect(authService.logIn).toHaveBeenCalled();
    expect(authService.getTokenData).toHaveBeenCalled();
    expect(component.addUserTokenData).toHaveBeenCalled();
    expect(authService.autoLogOut).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/bet']);
  });

  it('should return error for guest login', () => {
    spyOn(authService, 'logIn').and.returnValue(
      throwError(() => new Error('test'))
    );
    spyOn(authService, 'getTokenData').and.returnValue(
      throwError(() => new Error('test'))
    );
    spyOn(messageService, 'add');
    spyOn(component, 'toastOutputError').and.callThrough();

    component.onGuestLogIn();

    expect(component.toastOutputError).toHaveBeenCalled();
    expect(messageService.add).toHaveBeenCalled();
  });

  it('should log in', () => {
    spyOn(authService, 'logIn').and.returnValue(of(LoginUserCredTestData));
    spyOn(authService, 'getTokenData').and.returnValue(of(accessTokenMock));
    spyOn(component, 'addUserTokenData');
    spyOn(authService, 'autoLogOut');
    const navigateSpy = spyOn(router, 'navigate');

    component.onLogIn();

    expect(authService.logIn).toHaveBeenCalled();
    expect(authService.getTokenData).toHaveBeenCalled();
    expect(component.addUserTokenData).toHaveBeenCalled();
    expect(authService.autoLogOut).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/bet']);
  });

  it('should return error for login', () => {
    spyOn(authService, 'logIn').and.returnValue(
      throwError(() => new Error('test'))
    );
    spyOn(authService, 'getTokenData').and.returnValue(
      throwError(() => new Error('test'))
    );
    spyOn(messageService, 'add');
    spyOn(component, 'toastOutputError').and.callThrough();

    component.onLogIn();

    expect(component.toastOutputError).toHaveBeenCalled();
    expect(messageService.add).toHaveBeenCalled();
  });

  it('should signup', () => {
    spyOn(authService, 'signUp').and.returnValue(of(SignupUserCredTestData));
    spyOn(authService, 'getTokenData').and.returnValue(of(accessTokenMock));
    spyOn(component, 'addUserTokenData');
    spyOn(authService, 'autoLogOut');
    const navigateSpy = spyOn(router, 'navigate');

    component.onSignUp();

    expect(authService.signUp).toHaveBeenCalled();
    expect(authService.getTokenData).toHaveBeenCalled();
    expect(component.addUserTokenData).toHaveBeenCalled();
    expect(authService.autoLogOut).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/bet']);
  });

  it('should return error for signup', () => {
    spyOn(authService, 'signUp').and.returnValue(
      throwError(() => new Error('test'))
    );
    spyOn(authService, 'getTokenData').and.returnValue(
      throwError(() => new Error('test'))
    );
    spyOn(messageService, 'add');
    spyOn(component, 'toastOutputError').and.callThrough();

    component.onSignUp();

    expect(component.toastOutputError).toHaveBeenCalled();
    expect(messageService.add).toHaveBeenCalled();
  });
});
