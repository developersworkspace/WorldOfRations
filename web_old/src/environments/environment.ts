// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
    production: false,
    api: {
        uri: 'http://api.worldofrations.com:8083'
    },
    oauth: {
        worldofrations: {
            'uri': 'http://api.worldofrations.com:8081/api/auth/authorize',
            'redirectUri': 'http://worldofrations.com/login',
            'clientId': 'uvMOcnBdKi',
            'clientSecret': '5JXUNDKDqr'
        },
        google: {
            'uri': 'http://api.worldofrations.com:8081/api/auth/google',
            'redirectUri': 'http://worldofrations.com/login',
            'clientId': 'uvMOcnBdKi',
            'clientSecret': '5JXUNDKDqr'
        }
    }
};
