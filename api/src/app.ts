// Imports
import express = require("express");
import bodyParser = require('body-parser');


// Imports middleware
import * as cors from 'cors';
import jwt = require('express-jwt');
import expressWinston = require('express-winston');

// Imports routes
import feedstuffRoute = require('./routes/feedstuff');
import formulaRoute = require('./routes/formula');
import formulatorRoute = require('./routes/formulator');
import authRoute = require('./routes/auth');

// Imports logger
import { logger } from './logger';

// Imports configurations
import { config } from './config';

export class WebApi {

    constructor(private app: express.Express, private port: number) {
        this.configureMiddleware(app);
        this.configureRoutes(app);
        this.configureErrorHandling(app);
    }

    private configureMiddleware(app: express.Express) {

        // Configure body-parser
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));

        // Configure CORS
        app.use(cors());

        // Configure express-jwt
        app.use(jwt({
            secret: config.oauth.jwtSecret,
            audience: 'worldofrations.com',
            issuer: config.oauth.jwtIssuer
        }).unless((req: express.Request) => {
            
            if (['/api/feedstuff/listforuser', '/api/feedstuff/createforuser'].indexOf(req.originalUrl) > -1)  {
                return false;
            }

            return true;
        }));

        // Configure express-winston
        app.use(expressWinston.logger({
            winstonInstance: logger,
            meta: false,
            msg: 'HTTP Request: {{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}'
        }));
    }

    private configureRoutes(app: express.Express) {
        app.use("/api/feedstuff", feedstuffRoute);
        app.use("/api/formula", formulaRoute);
        app.use("/api/formulator", formulatorRoute);
        app.use("/api/auth", authRoute);
    }

    private configureErrorHandling(app: express.Express) {
        app.use((err: Error, req : express.Request, res: express.Response, next: Function) => {
            logger.error(err.message);
            if (err.name === 'UnauthorizedError') {
                res.status(401).end();
            }else {
                res.status(500).send(err.message);
            }
        });
    }

    public getApp() {
        return this.app;
    }

    public run() {
        this.app.listen(this.port);
    }
}

let port = 8083;
let api = new WebApi(express(), port);
api.run();
logger.info(`Listening on ${port}`);
