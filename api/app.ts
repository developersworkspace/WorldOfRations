/// <reference path="./typings/index.d.ts"/>

import express = require("express");

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
        //app.use("/customer", customerRouter );
        // mount more routers here
        // e.g. app.use("/organisation", organisationRouter);
    }

    public run() {
        this.app.listen(this.port);  
    }
}


let port = 5000; 
let api = new WebApi(express(), port);
api.run();
console.info(`listening on ${port}`);