import firebase from 'firebase/compat/app';

export const SignupUserCredTestData = {
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
    displayName: '',
    isAnonymous: false,
    providerData: [
      {
        providerId: 'password',
        uid: 'khoi.huynh.tran@gmail.com',
        displayName: '',
        email: 'khoi.huynh.tran@gmail.com',
        phoneNumber: null,
        photoURL: null,
      },
    ],
    updateProfile(displayName: any) {
      this.displayName = displayName;
    },
  },
};
