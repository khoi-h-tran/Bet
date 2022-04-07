import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { exhaustMap, Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAccessToken } from 'src/app/app-state/selectors/user.selectors';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(selectAccessToken).pipe(
      take(1),
      exhaustMap((accessToken) => {
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', accessToken),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
