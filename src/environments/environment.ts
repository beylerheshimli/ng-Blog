// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    firebase: {
        apiKey: 'AIzaSyAAn74XmKE2UwztcgrDcgLGuoQ-uSMwJQA',
        authDomain: 'ng-simple-blog.firebaseapp.com',
        databaseURL: 'https://ng-simple-blog.firebaseio.com',
        projectId: 'ng-simple-blog',
        storageBucket: 'ng-simple-blog.appspot.com',
        messagingSenderId: '666541167171'
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
