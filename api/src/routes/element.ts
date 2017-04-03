// Imports
import { Express, Request, Response } from "express";
import * as express from 'express';
import { config } from './../config';

// Imports services
import { ElementService } from './../services/element';

// Imports repositories
import { ElementRepository } from './../repositories/mysql/element';

// Imports models
import { Element as DomainElement } from './../models/element';

let router = express.Router();

/**
 * @api {get} /element/list RETRIEVE LIST OF ELEMENTS
 * @apiName ElementList
 * @apiGroup Element
 * 
 * @apiSuccess {Object[]} response Empty.
 * 
 */
router.get('/list', (req: Request, res: Response, next: Function) => {
    let elementRepository = new ElementRepository(config.db);
    let elementService = new ElementService(elementRepository);
    elementService.listElements().then((result: DomainElement[]) => {
        res.json(result.map(x => {
            return {
                id: x.id,
                name: x.name
            };
        }));
    }).catch((err: Error) => {
        res.json(err.message);
    });
});


export = router;
