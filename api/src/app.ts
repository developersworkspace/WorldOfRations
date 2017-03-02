// Imports
import express = require("express");
import bodyParser = require('body-parser');
import expressWinston = require('express-winston');
import * as cluster from 'cluster';

// Imports middleware
import { CORS } from './middleware/common';

// Imports routes
import feedstuffRoute = require('./routes/feedstuff');
import formulaRoute = require('./routes/formula');
import formulatorRoute = require('./routes/formulator');

// Imports logger
import { logger } from './logger';

export class WebApi {

    constructor(private app: express.Express, private port: number) {
        this.configureMiddleware(app);
        this.configureRoutes(app);
    }

    private configureMiddleware(app: express.Express) {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(CORS);
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
