// Angular
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

// NGRx
import { of, Observable } from 'rxjs';
import { catchError, exhaustMap, map, take, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

// Models
import { IUFCEvents } from '../../shared/models/ufc-events.model';
import { IBetPlacement } from 'src/app/shared/models/bet.model';

// Envrionment
import { environment } from '../../../environments/environment';
import { selectAccessToken } from 'src/app/app-state/selectors/user.selectors';

@Injectable({
  providedIn: 'root',
})
export class BetService {
  readonly ufcDataURL =
    'https://raw.githubusercontent.com/khoi-h-tran/TestJSONData/master/UFCEventsTestData.json';

  constructor(private http: HttpClient, private store: Store) {}

  getUFCEvents(): Observable<Array<IUFCEvents>> {
    return this.http.get<IUFCEvents[]>(environment.urlTestJSONData).pipe(
      tap((ufcEvents) => this.log('fetched ufc events')),
      catchError(this.handleError('getUFCEvents'))
    ) as Observable<Array<IUFCEvents>>;
  }

  // TODO: UNIT TEST THIS
  addBet(key: string, selectedFighter: IBetPlacement): Observable<any> {
    return this.http
      .put(`${environment.urlBetDB}${key}.json`, selectedFighter)
      .pipe(
        tap((betPlacementResponse) => this.log('placed bet')),
        catchError(this.handleError('onPlaceBet'))
      ) as Observable<any>;
  }

  // addBet(betPlacement: IBetPlacement): Observable<any> {
  //   console.log(environment.urlBetDB);
  //   return this.http.put(environment.urlBetDB, betPlacement).pipe(
  //     tap((betPlacementResponse) => this.log('placed bet')),
  //     catchError(this.handleError('onPlaceBet'))
  //   ) as Observable<any>;
  // }

  /**
   * Returns a function that handles Http operation failures.
   * This error handler lets the app continue to run as if no error occurred.
   *
   * @param operation - name of the operation that failed
   */
  private handleError<T>(operation: string) {
    return (error: HttpErrorResponse): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // If a native error is caught, do not transform it. We only want to
      // transform response errors that are not wrapped in an `Error`.
      if (error.error instanceof Event) {
        throw error.error;
      }

      const message = `server returned code ${error.status} with body "${error.error}"`;
      // TODO: better job of transforming error for user consumption
      throw new Error(`${operation} failed: ${message}`);
    };
  }

  private log(message: string) {
    console.log('BetService: ' + message);
  }
}
