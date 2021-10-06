// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  supabase: {
    key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMzM1NTkxOSwiZXhwIjoxOTQ4OTMxOTE5fQ.nVX6lZ-zuUQCwp2FjkBJdiZKhY0LPe-nDnScAETK1O8",
    url: "https://edyepibtnkccgdrkqcix.supabase.co",
    storage: {
      url: "https://edyepibtnkccgdrkqcix.supabase.in/storage/v1/object/public/"
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
