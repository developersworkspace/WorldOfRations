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
import databaseRoute = require('./routes/database');

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

    public getApp(): express.Application {
        return this.app;
    }

    public run() {
        this.app.listen(this.port);
    }

    private configureMiddleware(app: express.Express) {

        // Configure body-parser
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));

        // Configure CORS
        app.use(cors());

        // Configure express-jwt
        app.use(jwt({
            audience: 'worldofrations.com',
            credentialsRequired: false,
            issuer: config.oauth.jwtIssuer,
            secret: config.oauth.jwtSecret,
        }));

        // Configure express-winston
        app.use(expressWinston.logger({
            meta: false,
            msg: 'HTTP Request: {{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}',
            winstonInstance: logger,
        }));
    }

    private configureRoutes(app: express.Express) {
        app.use("/api/feedstuff", feedstuffRoute);
        app.use("/api/formula", formulaRoute);
        app.use("/api/formulator", formulatorRoute);
        app.use("/api/auth", authRoute);
        app.use("/api/database", databaseRoute);
    }

    private configureErrorHandling(app: express.Express) {
        app.use((err: Error, req: express.Request, res: express.Response, next: () => void) => {
            logger.error(err.message);
            if (err.name === 'UnauthorizedError') {
                res.status(401).end();
            } else {
                res.status(500).send(err.message);
            }
        });
    }
}

const port = 8083;
const api = new WebApi(express(), port);
api.run();
logger.info(`Listening on ${port}`);
