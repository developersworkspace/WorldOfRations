import express = require("express");
import bodyParser = require('body-parser');

import feedstuffRoute = require('./routes/feedstuff');
import formulaRoute = require('./routes/formula');
import formulatorRoute = require('./routes/formulator');

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
        app.use((req, res, next) => {
            res.set('Access-Control-Allow-Origin', '*');
            res.set('Access-Control-Allow-Headers', 'Content-Type');
            next();
        });
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


let port = 8083;
let api = new WebApi(express(), port);
api.run();
console.info(`listening on ${port}`);