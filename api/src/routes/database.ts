// Imports
import { Express, Request, Response } from "express";
import * as express from 'express';
import { config } from './../config';
import mysqldump = require('mysqldump');

let router = express.Router();

router.get('/export', (req: Request, res: Response, next: Function) => {
    mysqldump({
        host: config.db.server,
        user: 'root',
        password: 'password',
        database: config.db.database,
        dest: './data.sql' 
    }, (err: Error) => {
        res.sendfile('./data.sql', {
            headers: {
                "content-disposition": "attachment; filename=\"data.sql\""
            }
        })
    })
});



export = router;
