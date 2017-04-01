// Imports
import { Express, Request, Response } from "express";
import * as express from 'express';
import { config } from './../config';

// Imports services
import { FeedstuffService } from './../services/feedstuff';

// Imports repositories
import { FeedstuffRepository } from './../repositories/mysql/feedstuff';

// Imports models
import { Feedstuff as DomainFeedstuff } from './../models/feedstuff';
import { SuggestedValue as DomainSuggestedValue } from './../models/suggested-value';

let router = express.Router();

/**
 * @api {get} /feedstuff/list RETRIEVE LIST OF FEEDSTUFFS
 * @apiName FeedstuffList
 * @apiGroup Feedstuff
 * 
 * @apiSuccess {Object[]} response Empty.
 * 
 */
router.get('/list', (req: Request, res: Response, next: Function) => {
    let feedstuffRepository = new FeedstuffRepository(config.db);
    let feedstuffService = new FeedstuffService(feedstuffRepository);
    feedstuffService.listFeedstuffs().then((result: DomainFeedstuff[]) => {
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


/**
 * @api {get} /feedstuff/listforuser RETRIEVE LIST OF FEEDSTUFFS FOR USER
 * @apiName FeedstuffListForUser
 * @apiGroup Feedstuff
 * 
 * @apiSuccess {Object[]} response Empty.
 * 
 */
router.get('/listforuser', (req: Request, res: Response, next: Function) => {

    // if (req.user == null) {
    //     res.status(401).send('UNAUTHORIZED');
    //     return;
    // }

    //req.user.username

    let feedstuffRepository = new FeedstuffRepository(config.db);
    let feedstuffService = new FeedstuffService(feedstuffRepository);

    feedstuffService.listFeedstuffForUser('demouser').then((result: DomainFeedstuff[]) => {
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
router.get('/suggestedValues', (req: Request, res: Response, next: Function) => {
    let feedstuffRepository = new FeedstuffRepository(config.db);
    let feedstuffService = new FeedstuffService(feedstuffRepository);
    feedstuffService.findSuggestedValues(req.query.formulaId, req.query.feedstuffId).then((result: DomainSuggestedValue) => {
        if (result == null) {
            res.json({
                minimum: 0,
                maximum: 1000
            });
        } else {
            res.json({
                minimum: result.minimum,
                maximum: result.maximum
            });
        }
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
router.get('/listExample', (req: Request, res: Response, next: Function) => {
    let feedstuffRepository = new FeedstuffRepository(config.db);
    let feedstuffService = new FeedstuffService(feedstuffRepository);
    feedstuffService.listExampleFeedstuffs().then((result: DomainFeedstuff[]) => {
        res.json(result.map(x => {
            return {
                id: x.id,
                name: x.name,
                minimum: x.minimum,
                maximum: x.maximum,
                cost: x.cost
            };
        }));
    }).catch((err: Error) => {
        res.json(err.message);
    });
});

export = router;
