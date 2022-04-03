import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, from, Observable, tap } from 'rxjs';

// Firebase
// import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import firebase from 'firebase/compat/app';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import firebase from 'firebase/compat/app';
// import { provideAuth } from '@angular/fire/auth';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data

  constructor(public auth: AngularFireAuth) {}

  signUp(
    email: string,
    password: string
  ): Observable<firebase.auth.UserCredential> {
    // Note: from converts promise returned to observable
    return from(this.auth.createUserWithEmailAndPassword(email, password)).pipe(
      tap((userCrendentials) => this.log('created user.')),
      catchError(this.handleError('signUp'))
    ) as Observable<firebase.auth.UserCredential>;
  }

  // login() {
  //   this.auth.createUserWithEmailAndPassword();
  // }

  // login(email: string, password: string) {
  //   createUserWithEmailAndPassword(this.auth, email, password)
  //     .then((userCredential) => {
  //       // Signed in
  //       const user = userCredential.user;
  //       // ...
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // ..
  //     });
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

      const message = `${error.message}`;
      // TODO: better job of transforming error for user consumption
      throw new Error(`${operation} failed: ${message}`);
    };
  }

  private log(message: string) {
    console.log('AuthService: ' + message);
  }
}
