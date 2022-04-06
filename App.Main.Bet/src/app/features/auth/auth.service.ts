import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, from, Observable, tap } from 'rxjs';

// Firebase
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { IdTokenResult } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data

  constructor(public auth: AngularFireAuth) {}

  signUp(
    userName: string,
    email: string,
    password: string
  ): Observable<firebase.auth.UserCredential> {
    // Note: from converts promise returned to observable
    return from(this.auth.createUserWithEmailAndPassword(email, password)).pipe(
      tap((userCrendentials) => {
        this.log('created user.');
        userCrendentials.user?.updateProfile({ displayName: userName });
      }),
      catchError(this.handleError('signUp'))
    ) as Observable<firebase.auth.UserCredential>;
  }

  logIn(
    email: string,
    password: string
  ): Observable<firebase.auth.UserCredential> {
    // Note: from converts promise returned to observable
    return from(this.auth.signInWithEmailAndPassword(email, password)).pipe(
      tap((userCrendentials) => {
        this.log('logged in user.');
      }),
      catchError(this.handleError('logIn'))
    ) as Observable<firebase.auth.UserCredential>;
  }

  createUser(
    userCredentials: firebase.auth.UserCredential
  ): Observable<IdTokenResult> {
    return from(userCredentials.user?.getIdTokenResult(true)!);
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

      const message = `${error.message}`;
      // TODO: better job of transforming error for user consumption
      throw new Error(`${operation} failed: ${message}`);
    };
  }

  private log(message: string) {
    console.log('AuthService: ' + message);
  }
}
