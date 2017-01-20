// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  api: {
        uri: 'http://localhost:9001'
    },
    oauth: {
        'uri': 'http://localhost:9009/api/auth/authorize',
        'redirectUri': 'http://localhost:4200/login',
        'clientId': '123',
        'clientSecret': '987'
    }
};
