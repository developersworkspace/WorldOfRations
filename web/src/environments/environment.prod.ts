export const environment = {
  production: true,
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
