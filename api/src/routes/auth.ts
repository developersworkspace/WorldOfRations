// Imports
import { Express, Request, Response } from "express";
import * as express from 'express';
import { config } from './../config';
import * as request from 'request';

// Imports services
import { AuthService } from './../services/auth';
import { UserService } from './../services/user';

let router = express.Router();

/**
 * @api {get} /auth/verify VERIFY A JSON WEB TOKEN
 * @apiName AuthVerify
 * @apiGroup Auth
 *
 * @apiParam {String} token JSON Web Token (JWT) (RFC 7519).
 * 
 * @apiSuccess {Object} response Empty.
 */
router.get('/verify', (req: Request, res: Response, next: Function) => {

    if (req.user == null) {
        res.status(401).end();
        return;
    }

    res.json(req.user);
});

/**
 * @api {get} /auth/google AUTHENTICATE USING GOOGLE
 * @apiName AuthGoogle
 * @apiGroup Auth
 * 
 */
router.get('/google', (req: Request, res: Response, next: Function) => {
    let authService = new AuthService(config.baseUri, config.oauth.jwtSecret, config.oauth.jwtIssuer, config.oauth);
    let auth = authService.createClientAuths();
    var uri = auth.googleAuth.code.getUri();
    res.redirect(uri);
});

/**
 * @api {get} /auth/google/callback GOOGLE CALLBACK
 * @apiName AuthGoogleCallback
 * @apiGroup Auth
 *
 * @apiParam {String} code Empty.
 * @apiParam {String} state Empty.
 * 
 */
router.get('/google/callback', (req: Request, res: Response, next: Function) => {
    let authService = new AuthService(config.baseUri, config.oauth.jwtSecret, config.oauth.jwtIssuer, config.oauth);
    let userService = new UserService(config.db);
    let auth = authService.createClientAuths();
    auth.googleAuth.code.getToken(req.originalUrl)
        .then((user: any) => {
            request('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + user.accessToken, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    userService.login(JSON.parse(body).email).then((loginResult: any) => {
                        let token = authService.encodeToken(JSON.parse(body).email);
                        res.redirect(config.web.uri + '/login?token=' + token);
                    });
                } else {
                    return res.status(500).send('An Error Occurred');
                }
            });
        }).catch((err: Error) => {
            return res.status(500).send(err.message);
        });
});


export = router;
