// Angular
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

// NGRx
import { of, Observable, from } from 'rxjs';
import { catchError, exhaustMap, map, take, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

// Models
import { IUFCEvents } from '../../shared/models/ufc-events.model';
import { IBet } from 'src/app/shared/models/bet.model';

// Envrionment
import { environment } from '../../../environments/environment';

// Firebase
import {
  getDatabase,
  ref,
  set,
  child,
  get,
  DataSnapshot,
} from 'firebase/database';

@Injectable({
  providedIn: 'root',
})
export class BetService {
  readonly ufcDataURL =
    'https://raw.githubusercontent.com/khoi-h-tran/TestJSONData/master/UFCEventsTestData.json';

  constructor(private http: HttpClient, private store: Store) {}

  getUFCEvents(): Observable<any> {
    return this.http.get<IUFCEvents[]>(environment.urlTestJSONData).pipe(
      tap((ufcEvents) => this.log('fetched ufc events')),
      catchError(this.handleError('getUFCEvents'))
    ) as Observable<Array<IUFCEvents>>;
  }

  getUsersBets(userId: string): Observable<any> {
    const dbRef = ref(getDatabase());
    return from(get(child(dbRef, `bets/${userId}`)));
  }

  // TODO: UNIT TEST THIS
  placeBet(betPlacement: IBet): Observable<any> {
    const db = getDatabase();
    let documentKey: string = `${betPlacement.eventName}_${betPlacement.cardType}_${betPlacement.eventWeightClass}_${betPlacement.eventMatchUp}`;
    return from(
      set(ref(db, `bets/${betPlacement.userID}/${documentKey}`), {
        eventName: betPlacement.eventName,
        cardType: betPlacement.cardType,
        eventWeightClass: betPlacement.eventWeightClass,
        selectedFighter: betPlacement.selectedFighter,
      })
    );
  }

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
