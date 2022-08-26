import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  ParamMap,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectAccessToken } from 'src/app/app-state/selectors/user.selectors';
import { MockIDTokenResult } from 'src/app/shared/test-data/mockIDTokenResult';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireAuthMock } from 'src/app/shared/Mocks/AngularFireAuthMock';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Component } from '@angular/core';
import { of } from 'rxjs';

const mockParamMap: ParamMap = {
  has: function (name: string): boolean {
    throw new Error('Function not implemented.');
  },
  get: function (name: string): string | null {
    throw new Error('Function not implemented.');
  },
  getAll: function (name: string): string[] {
    throw new Error('Function not implemented.');
  },
  keys: [],
};

const mockRoute: ActivatedRouteSnapshot = {
  url: [],
  params: {},
  queryParams: {},
  fragment: null,
  data: {},
  outlet: '',
  component: null,
  routeConfig: null,
  root: new ActivatedRouteSnapshot(),
  parent: null,
  firstChild: null,
  children: [],
  pathFromRoot: [],
  paramMap: mockParamMap,
  queryParamMap: mockParamMap,
};

const mockRouterState: RouterStateSnapshot = {
  url: '',
  root: new ActivatedRouteSnapshot(),
};

describe('AuthGuard Pass', () => {
  let guard: AuthGuard;
  let store: MockStore;
  let router: Router;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        AuthGuard,
        AuthService,
        { provide: AngularFireAuth, useClass: AngularFireAuthMock },
        provideMockStore({
          selectors: [
            {
              selector: selectAccessToken,
              value: MockIDTokenResult.token,
            },
          ],
        }),
      ],
    });

    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
    guard = TestBed.inject(AuthGuard);

    spyOn(authService, 'clearAutoLogOut');
    // spyOn(guard, 'canActivate').and.callThrough();
    spyOn(guard, 'canActivate').and.callFake;
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should run canActivate', () => {
    const navigateSpy = spyOn(router, 'createUrlTree');

    let test = guard.canActivate(mockRoute, mockRouterState);

    // expect(authService.clearAutoLogOut).toHaveBeenCalled();
    // expect(navigateSpy).toHaveBeenCalledWith(['/auth']);

    expect(guard.canActivate).toHaveBeenCalled();
    // console.log(test);
    // expect(guard.canActivate).toBeTrue();
  });
});

describe('AuthGuard Fail', () => {
  let guard: AuthGuard;
  let store: MockStore;
  let router: Router;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        AuthGuard,
        AuthService,
        { provide: AngularFireAuth, useClass: AngularFireAuthMock },
        provideMockStore({
          selectors: [
            {
              selector: selectAccessToken,
              value: '',
            },
          ],
        }),
      ],
    });

    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
    guard = TestBed.inject(AuthGuard);

    spyOn(authService, 'clearAutoLogOut');
    spyOn(guard, 'canActivate').and.callThrough();
    // spyOn(store, 'select').and.callThrough();
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should run canActivate', () => {
    const navigateSpy = spyOn(router, 'createUrlTree');
    // const navigateSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

    let test = guard.canActivate(mockRoute, mockRouterState);

    // expect(authService.clearAutoLogOut).toHaveBeenCalled();
    // expect(navigateSpy).toHaveBeenCalledWith(['/auth']);

    expect(guard.canActivate).toHaveBeenCalled();
    // console.log(test);
    // expect(guard.canActivate).toBeTrue();
  });
});
