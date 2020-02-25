// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig :{
    apiKey: "AIzaSyAp-f8XwAMWUYoHlf4_sP-1HQtUu9sxFig",
    authDomain: "enta-elnegm.firebaseapp.com",
    databaseURL: "https://enta-elnegm.firebaseio.com",
    projectId: "enta-elnegm",
    storageBucket: "enta-elnegm.appspot.com",
    messagingSenderId: "650120348599",
    appId: "1:650120348599:web:a82a9b5f4f5c3331c5de32",
    measurementId: "G-2FQWHKZ8QY"
  },
  tokenKey:"x-entaelnagm-token-key",
  STORAGE_APP_LANG:"x-entaelnagm-lang-key",
  database:{
    name: '__entaelnagmdb',
    driverOrder: ['indexeddb', 'sqlite', 'websql']
  },
  apiKey:"BkMId5al9ETygAeWJ8u6iCjNDvszwmf4cKVHUYZ3nb2Sr0hFpOPq7XLG1QxtoR",
  // apiUrl:"http://localhost:8000",
  apiUrl:"https://entaelnegm.com",
  version:'1.0.1'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
