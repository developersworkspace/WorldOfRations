// Imports
import express = require("express");
import bodyParser = require('body-parser');
import { winston } from './core/logger';
import * as cluster from 'cluster';

// Imports middleware
import { CORS } from './middleware/common';

// Imports routes
import feedstuffRoute = require('./routes/feedstuff');
import formulaRoute = require('./routes/formula');
import formulatorRoute = require('./routes/formulator');

export class WebApi {

    constructor(private app: express.Express, private port: number) {
        this.configureMiddleware(app);
        this.configureRoutes(app);
    }

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

// if (cluster.isMaster) {
//     var cpuCount = require('os').cpus().length;
//     for (var i = 0; i < cpuCount; i += 1) {
//         cluster.fork();
//     }
// } else {

    let port = 8083;
    let api = new WebApi(express(), port);
    api.run();
    console.info(`listening on ${port}`);
//}