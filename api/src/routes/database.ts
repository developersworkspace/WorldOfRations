// Imports
import { Express, Request, Response } from "express";
import * as express from 'express';
import { config } from './../config';
import mysqldump = require('mysqldump');

import { IRepositoryFactory } from './../repositories/factory';

export class DatabaseRouter {

    private router = express.Router();

    constructor() {
        this.router.get('/export', this.export);
    }

    public GetRouter() {
        return this.router;
    }

    private export(req: Request, res: Response, next: () => void) {
        mysqldump({
            database: config.db.database,
            dest: './data.sql',
            host: config.db.server,
            password: 'password',
            user: 'root',
        }, (err: Error) => {
            res.sendfile('./data.sql', {
                headers: {
                    "content-disposition": "attachment; filename=\"data.sql\"",
                },
            });
        });
    }
}
