// Imports
import * as uuid from 'uuid';
import * as jwt from 'jsonwebtoken';
import * as base64 from 'base-64';
import * as utf8 from 'utf8';
import * as clientOAuth2 from 'client-oauth2';

export class AuthService {

    constructor(private baseUri: string, private jwtSecret: string, private jwtIssuer: string, private oauthConfig: any) { }

    verify(token: string): Boolean {
        try {
            let decoded = jwt.verify(token, this.jwtSecret, {
                issuer: this.jwtIssuer
            });
            return true;
        } catch (err) {
            return false;
        }
    }

     encodeToken(username: string): string {
        let token = jwt.sign({ username: username }, this.jwtSecret, {
            expiresIn: 3600,
            audience: 'worldofrations.com',
            issuer: this.jwtIssuer,
            jwtid: uuid.v4()
        });

        return token;
    }

    decodeToken(token: string): any {
        try {
            let decoded = jwt.verify(token, this.jwtSecret, {
                issuer: this.jwtIssuer
            });
            return decoded;
        } catch (err) {
            return null;
        }
    }

    createClientAuths(): any {

        let googleAuth = new clientOAuth2({
            clientId: this.oauthConfig.google.clientId,
            clientSecret: this.oauthConfig.google.clientSecret,
            accessTokenUri: 'https://www.googleapis.com/oauth2/v4/token',
            authorizationUri: 'https://accounts.google.com/o/oauth2/v2/auth',
            redirectUri: this.baseUri + '/api/auth/google/callback',
            scopes: ['https://www.googleapis.com/auth/userinfo.email']
        }, null);

        return {
            googleAuth: googleAuth
        };
    }
}