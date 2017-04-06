// Imports
import { Express, Request, Response } from "express";
import * as express from 'express';
import * as request from 'request';
import { config } from './../config';

// Imports services
import { AuthService } from './../services/auth';
import { UserService } from './../services/user';

const router = express.Router();

router.get('/verify', (req: Request, res: Response, next: () => void) => {

    if (req.user == null) {
        res.status(401).end();
        return;
    }

    res.json(req.user);
});

router.get('/google', (req: Request, res: Response, next: () => void) => {
    const authService = new AuthService(config.baseUri, config.oauth.jwtSecret, config.oauth.jwtIssuer, config.oauth);
    const auth = authService.createClientAuths();
    const uri = auth.googleAuth.code.getUri();
    res.redirect(uri);
});

router.get('/google/callback', (req: Request, res: Response, next: () => void) => {
    const authService = new AuthService(config.baseUri, config.oauth.jwtSecret, config.oauth.jwtIssuer, config.oauth);
    const userService = new UserService(config.db);
    const auth = authService.createClientAuths();
    auth.googleAuth.code.getToken(req.originalUrl)
        .then((user: any) => {
            request('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + user.accessToken, (error: Error, response: any, body: any) => {
                if (!error && response.statusCode === 200) {
                    userService.login(JSON.parse(body).email).then((loginResult: any) => {
                        const token = authService.encodeToken(JSON.parse(body).email);
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
