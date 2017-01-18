/// <reference path="./typings/index.d.ts"/>

import express = require("express");

import feedstuffRoute = require('./routes/feedstuff');
import formulaRoute = require('./routes/formula');

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
        //app.use(requestLogger);
    }

    private configureRoutes(app: express.Express) {
        app.use("/api/feedstuff", feedstuffRoute);
        app.use("/api/formula", formulaRoute);
    }

    public run() {
        this.app.listen(this.port);  
    }
}


let port = 9001; 
let api = new WebApi(express(), port);
api.run();
console.info(`listening on ${port}`);