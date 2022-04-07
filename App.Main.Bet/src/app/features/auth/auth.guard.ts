import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, take, tap } from 'rxjs';
import { selectAccessToken } from 'src/app/app-state/selectors/user.selectors';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store,
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select(selectAccessToken).pipe(
      take(1), // without take 1, the subscription will continue, and could cause bugs
      map(
        // !!accessToken means
        // !accessToken (inverted boolean: i.e. if it is access token is null, this will return true)
        // then add another ! to make it false
        // i.e. the first ! converts it to a boolean (but it's inverted). The second converts it to the correct boolean we want.
        (accessToken) => {
          const isAuth = !!accessToken;
          // if we are authenticated
          if (isAuth) {
            return true;
          }
          // if unauthenticated, re-route to auth
          // reset the timer in the auth service for auto logout
          this.authService.clearAutoLogOut();
          return this.router.createUrlTree(['/auth']);
        }
      )
      // tap((isAuth) => {
      //   if (!isAuth) {
      //     this.router.navigate(['/auth']);
      //   }
      // })
    );
  }
}
