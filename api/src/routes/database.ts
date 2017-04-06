// Imports
import { Express, Request, Response } from "express";
import * as express from 'express';
import { config } from './../config';
import mysqldump = require('mysqldump');

const router = express.Router();

router.get('/export', (req: Request, res: Response, next: () => void) => {
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
});

export = router;
