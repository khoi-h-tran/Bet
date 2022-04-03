// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'betapp-dc664',
    appId: '1:737917342156:web:9911b185d44ebd09b04d69',
    databaseURL: 'https://betapp-dc664-default-rtdb.firebaseio.com',
    storageBucket: 'betapp-dc664.appspot.com',
    apiKey: 'AIzaSyAOGVNO4Om-S3-nnA76FL2rw-BYgKz5S08',
    authDomain: 'betapp-dc664.firebaseapp.com',
    messagingSenderId: '737917342156',
    measurementId: 'G-3CXKCHSFDY',
  },
  production: false,
  // urlBetDB:
  //   'https://betapp-dc664-default-rtdb.firebaseio.com/tempId123_UFC 271_Main Card_Middleweight.json',
  // urlBetDB:
  //   'https://betapp-dc664-default-rtdb.firebaseio.com/bets/tempId123_UFC 271_Main Card_Middleweight.json',
  // urlBetDB: 'https://betapp-dc664-default-rtdb.firebaseio.com/bets/bets.json',
  urlBetDB: 'https://betapp-dc664-default-rtdb.firebaseio.com/bets/',
  urlTestJSONData:
    'https://raw.githubusercontent.com/khoi-h-tran/TestJSONData/master/UFCEventsTestData.json',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
