import {
  ActionCodeSettings,
  ApplicationVerifier,
  AuthCredential,
  AuthProvider,
  ConfirmationResult,
  IdTokenResult,
  User,
  UserCredential,
} from '@angular/fire/auth';
import firebase from 'firebase/compat/app';

export const accessTokenMock: IdTokenResult = {
  authTime: '',
  expirationTime: '',
  issuedAtTime: '',
  signInProvider: null,
  signInSecondFactor: null,
  token: '',
  claims: {},
};

export const testUser: any = {
  delete: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  emailVerified: false,
  getIdTokenResult: function (forceRefresh?: boolean): Promise<IdTokenResult> {
    return new Promise((resolve, reject) => {
      resolve(accessTokenMock), reject();
    });
  },
  getIdToken: function (forceRefresh?: boolean): Promise<string> {
    throw new Error('Function not implemented.');
  },
  isAnonymous: false,
  linkAndRetrieveDataWithCredential: function (
    credential: AuthCredential
  ): Promise<UserCredential> {
    throw new Error('Function not implemented.');
  },
  linkWithCredential: function (
    credential: AuthCredential
  ): Promise<UserCredential> {
    throw new Error('Function not implemented.');
  },
  linkWithPhoneNumber: function (
    phoneNumber: string,
    applicationVerifier: ApplicationVerifier
  ): Promise<ConfirmationResult> {
    throw new Error('Function not implemented.');
  },
  linkWithPopup: function (provider: AuthProvider): Promise<UserCredential> {
    throw new Error('Function not implemented.');
  },
  linkWithRedirect: function (provider: AuthProvider): Promise<void> {
    throw new Error('Function not implemented.');
  },
  metadata: {},
  phoneNumber: null,
  providerData: [],
  reauthenticateWithRedirect: function (provider: AuthProvider): Promise<void> {
    throw new Error('Function not implemented.');
  },
  refreshToken: '',
  reload: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  sendEmailVerification: function (
    actionCodeSettings?: ActionCodeSettings | null
  ): Promise<void> {
    throw new Error('Function not implemented.');
  },
  tenantId: null,
  toJSON: function (): Object {
    throw new Error('Function not implemented.');
  },
  unlink: function (providerId: string): Promise<User> {
    throw new Error('Function not implemented.');
  },
  updateEmail: function (newEmail: string): Promise<void> {
    throw new Error('Function not implemented.');
  },
  updatePassword: function (newPassword: string): Promise<void> {
    throw new Error('Function not implemented.');
  },
  updatePhoneNumber: function (phoneCredential: AuthCredential): Promise<void> {
    throw new Error('Function not implemented.');
  },
  updateProfile: function (profile: {
    displayName?: string | null | undefined;
    photoURL?: string | null | undefined;
  }): Promise<void> {
    throw new Error('Function not implemented.');
  },
  verifyBeforeUpdateEmail: function (
    newEmail: string,
    actionCodeSettings?: ActionCodeSettings | null
  ): Promise<void> {
    throw new Error('Function not implemented.');
  },
  displayName: null,
  email: null,
  photoURL: null,
  providerId: '',
  uid: '',
};

export const accessTokenUserCred: firebase.auth.UserCredential = {
  credential: null,
  user: testUser,
};

// export const accessTokenUserCred: firebase.auth.UserCredential = {
//   operationType: 'signIn',
//   credential: null,
//   additionalUserInfo: {
//     isNewUser: false,
//     providerId: 'password',
//     profile: {},
//   },
//   user: {
//     uid: '9GnElKRIxogCoyFcms0JmYuM4SS2',
//     email: 'khoi.huynh.tran@gmail.com',
//     emailVerified: false,
//     displayName: 'Khoi',
//     isAnonymous: false,
//     providerData: [
//       {
//         providerId: 'password',
//         uid: 'khoi.huynh.tran@gmail.com',
//         displayName: 'Khoi',
//         email: 'khoi.huynh.tran@gmail.com',
//         phoneNumber: null,
//         photoURL: null,
//       },
//     ],
//     getIdTokenResult(forceRefresh?: boolean | undefined): Promise<IdTokenResult> {
//       return new Promise((resolve, reject) => {
//         resolve(accessTokenMock),
//         reject();
//       })
//     },
//   },
// };

export const LoginUserCredTestData = {
  operationType: 'signIn',
  credential: null,
  additionalUserInfo: {
    isNewUser: false,
    providerId: 'password',
    profile: {},
  },
  user: {
    uid: '9GnElKRIxogCoyFcms0JmYuM4SS2',
    email: 'khoi.huynh.tran@gmail.com',
    emailVerified: false,
    displayName: 'Khoi',
    isAnonymous: false,
    providerData: [
      {
        providerId: 'password',
        uid: 'khoi.huynh.tran@gmail.com',
        displayName: 'Khoi',
        email: 'khoi.huynh.tran@gmail.com',
        phoneNumber: null,
        photoURL: null,
      },
    ],
    updateProfile(displayName: any) {
      this.displayName = displayName;
    },
    getIdTokenResult() {
      return 'testAccessToken';
    },
  },
};
