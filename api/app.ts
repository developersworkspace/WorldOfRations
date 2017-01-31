import express = require("express");
import bodyParser = require('body-parser');
import { winston } from './../core/logger';

import feedstuffRoute = require('./routes/feedstuff');
import formulaRoute = require('./routes/formula');
import formulatorRoute = require('./routes/formulator');
import * as cluster from 'cluster';
import { CORS } from './middleware/common';

export class WebApi {
    /**
     * @param app - express application
     * @param port - port to listen on
     */
    constructor(private app: express.Express, private port: number) {
        this.configureMiddleware(app);
        this.configureRoutes(app);
    }

    /**
     * @param app - express application
     */
    private configureMiddleware(app: express.Express) {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(CORS);
    }

    private configureRoutes(app: express.Express) {
        app.use("/api/feedstuff", feedstuffRoute);
        app.use("/api/formula", formulaRoute);
        app.use("/api/formulator", formulatorRoute);
    }

    public run() {
        this.app.listen(this.port);
    }
}

if (cluster.isMaster) {
    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length * 3;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }
} else {

    let port = 8083;
    let api = new WebApi(express(), port);
    api.run();
    console.info(`listening on ${port}`);
}