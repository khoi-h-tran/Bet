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
  emailVerified: false,
  getIdTokenResult: function (forceRefresh?: boolean): Promise<IdTokenResult> {
    return new Promise((resolve, reject) => {
      resolve(accessTokenMock), reject();
    });
  },
  isAnonymous: false,
  metadata: {},
  phoneNumber: null,
  providerData: [],
  refreshToken: '',
  tenantId: null,
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
    // updateProfile(displayName: any) {
    //   this.displayName = displayName;
    // },
    getIdTokenResult() {
      return 'testAccessToken';
    },
  },
};
