import { LoginUserCredTestData } from '../test-data/LoginUserCredentialsTestData';
import { SignupUserCredTestData } from '../test-data/SignupUserCredentialsTestData';

export class AngularFireAuthMock {
  createUserWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<any> {
    return new Promise((resolve) => {
      resolve(SignupUserCredTestData);
    });
  }

  signInWithEmailAndPassword(email: string, password: string): Promise<any> {
    return new Promise((resolve) => {
      resolve(LoginUserCredTestData);
    });
  }
}
