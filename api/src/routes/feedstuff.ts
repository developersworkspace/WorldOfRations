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
    feedstuffService.listFeedstuffs(req.user.username).then((result: DomainFeedstuff[]) => {
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


    if (req.user == null) {
        res.status(401).end();
        return;
    }

    let feedstuffRepository = new FeedstuffRepository(config.db);
    let feedstuffService = new FeedstuffService(feedstuffRepository);

    feedstuffService.listFeedstuffForUser(req.user.username).then((result: DomainFeedstuff[]) => {
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
 * @api {get} /feedstuff/get RETRIEVE FEEDSTUFF
 * @apiName FeedstuffGet
 * @apiGroup Feedstuff
 * 
 * @apiParam {String} feedstuffId Empty.
 * 
 * @apiSuccess {Object[]} response Empty.
 * 
 */
router.get('/get', (req: Request, res: Response, next: Function) => {

    let feedstuffRepository = new FeedstuffRepository(config.db);
    let feedstuffService = new FeedstuffService(feedstuffRepository);

    feedstuffService.findFeedstuff(req.query.feedstuffId, req.user.username).then((result: DomainFeedstuff) => {
        res.json({
            id: result.id,
            name: result.name
        });
    }).catch((err: Error) => {
        res.json(err.message);
    });
});


/**
 * @api {post} /feedstuff/createforuser CREATE FEEDSTUFF FOR USER
 * @apiName FeedstuffCreateForUser
 * @apiGroup Feedstuff
 * 
 * @apiSuccess {Object} response Empty.
 * 
 */
router.post('/createforuser', (req: Request, res: Response, next: Function) => {


    if (req.user == null) {
        res.status(401).end();
        return;
    }
    
    let feedstuffRepository = new FeedstuffRepository(config.db);
    let feedstuffService = new FeedstuffService(feedstuffRepository);

    feedstuffService.createUserFeedstuff(req.user.username, req.body.name, req.body.description).then((createUserFeedstuffResult: DomainFeedstuff) => {
        res.json({
            id: createUserFeedstuffResult.id,
            name: createUserFeedstuffResult.name
        });
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
