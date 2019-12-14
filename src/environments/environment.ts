// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig :{
    apiKey: "AIzaSyCOEaTIXn9dinbS5L-QYgqaU_Jmhf6vgV4",
    authDomain: "enta-elnagm.firebaseapp.com",
    databaseURL: "https://enta-elnagm.firebaseio.com",
    projectId: "enta-elnagm",
    storageBucket: "enta-elnagm.appspot.com",
    messagingSenderId: "991952097357",
    appId: "1:991952097357:web:2c332e5375a5d160688c04",
    measurementId: "G-9L5D2G380D"
  },
  tokenKey:"x-entaelnagm-token-key",
  database:{
    name: '__entaelnagmdb',
    driverOrder: ['indexeddb', 'sqlite', 'websql']
  },
  apiKey:"7F53sB7WZEMXjuMju4vhj8DzvpLNtUuGGTE3CWREk9CTGXSET5qPUgFD7XRpDkozyrahw7bxVWZqHrc4",
  apiUrl:"http://localhost:8000",
  version:'2.0.8'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
