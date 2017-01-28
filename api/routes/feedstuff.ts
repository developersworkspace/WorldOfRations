import { Express, Request, Response } from "express";
import { FeedstuffService } from './../../core/services/feedstuff';
import { config } from './../config';

import * as express from 'express';
let router = express.Router();


/**
 * @api {get} /feedstuff/list RETRIEVE LIST OF FEEDSTUFFS
 * @apiName FeedstuffList
 * @apiGroup Feedstuff
 * 
 * @apiSuccess {Object[]} response Empty.
 * 
 */
router.get('/list', function (req: Request, res: Response, next: Function) {
    let feedstuffService = new FeedstuffService(config);
    feedstuffService.listFeedstuff().then((result: any[]) => {
        res.json(result);
    }).catch((err: Error) => {
        res.json(err.message);
    });
});

/**
 * @api {get} /feedstuff/suggestedValues RETRIEVE SUGGESTED VALUES
 * @apiName FeedstuffSuggestedValues
 * @apiGroup Feedstuff
 *
 * @apiParam {String} formulaId Empty.
 * @apiParam {String} feedstuffId Empty.
 * 
 * @apiSuccess {Boolean} minumum Empty.
 * @apiSuccess {Boolean} maximum Empty.
 * 
 */
router.get('/suggestedValues', function (req: Request, res: Response, next: Function) {
    let feedstuffService = new FeedstuffService(config);
    feedstuffService.getSuggestedValues(req.query.formulaId, req.query.feedstuffId).then((result: any[]) => {
        res.json(result);
    }).catch((err: Error) => {
        res.json(err.message);
    });
});


/**
 * @api {get} /feedstuff/listExample RETRIEVE LIST OF EXAMPLE FEEDSTUFFS
 * @apiName FeedstuffListExample
 * @apiGroup Feedstuff
 *
 * @apiSuccess {Object[]} response Empty.
 * 
 */
router.get('/listExample', function (req: Request, res: Response, next: Function) {
    let feedstuffService = new FeedstuffService(config);
    feedstuffService.listExampleFeedstuff().then((result: any[]) => {
        res.json(result);
    }).catch((err: Error) => {
        res.json(err.message);
    });
});

export = router;
