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
import { FeedstuffMeasurement as DomainFeedstuffMeasurement } from './../models/feedstuff-measurement';

let router = express.Router();

router.get('/listFeedstuffs', (req: Request, res: Response, next: Function) => {
    let feedstuffRepository = new FeedstuffRepository(config.db);
    let feedstuffService = new FeedstuffService(feedstuffRepository);
    feedstuffService.listFeedstuffs(req.user == null ? null : req.user.username).then((listFeedstuffsResult: DomainFeedstuff[]) => {
        res.json(listFeedstuffsResult.map(x => {
            return {
                id: x.id,
                name: x.name
            };
        }));
    }).catch((err: Error) => {
        res.json(err.message);
    });
});

router.get('/listUserFeedstuffs', (req: Request, res: Response, next: Function) => {


    if (req.user == null) {
        res.status(401).end();
        return;
    }

    let feedstuffRepository = new FeedstuffRepository(config.db);
    let feedstuffService = new FeedstuffService(feedstuffRepository);

    feedstuffService.listUserFeedstuffs(req.user.username).then((listFeedstuffsForUserResult: DomainFeedstuff[]) => {
        res.json(listFeedstuffsForUserResult.map(x => {
            return {
                id: x.id,
                name: x.name
            };
        }));
    }).catch((err: Error) => {
        res.json(err.message);
    });
});

router.get('/findUserFeedstuff', (req: Request, res: Response, next: Function) => {

    if (req.user == null) {
        res.status(401).end();
        return;
    }

    let feedstuffRepository = new FeedstuffRepository(config.db);
    let feedstuffService = new FeedstuffService(feedstuffRepository);

    feedstuffService.findUserFeedstuff(req.query.feedstuffId, req.user.username).then((findUserFeedstuffResult: DomainFeedstuff) => {
        res.json({
            id: findUserFeedstuffResult.id,
            name: findUserFeedstuffResult.name
        });
    }).catch((err: Error) => {
        res.json(err.message);
    });
});

router.post('/createUserFeedstuff', (req: Request, res: Response, next: Function) => {


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


router.get('/findSuggestedValues', (req: Request, res: Response, next: Function) => {
    let feedstuffRepository = new FeedstuffRepository(config.db);
    let feedstuffService = new FeedstuffService(feedstuffRepository);
    feedstuffService.findSuggestedValues(req.query.formulaId, req.query.feedstuffId).then((findSuggestedValuesResult: DomainSuggestedValue) => {
        if (findSuggestedValuesResult == null) {
            res.json({
                minimum: 0,
                maximum: 1000
            });
        } else {
            res.json({
                minimum: findSuggestedValuesResult.minimum,
                maximum: findSuggestedValuesResult.maximum
            });
        }
    }).catch((err: Error) => {
        res.json(err.message);
    });
});

router.get('/listExampleFeedstuffs', (req: Request, res: Response, next: Function) => {
    let feedstuffRepository = new FeedstuffRepository(config.db);
    let feedstuffService = new FeedstuffService(feedstuffRepository);
    feedstuffService.listExampleFeedstuffs().then((listExampleFeedstuffsResult: DomainFeedstuff[]) => {
        res.json(listExampleFeedstuffsResult.map(x => {
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

router.post('/saveUserFeedstuffMeasurements', (req: Request, res: Response, next: Function) => {

    if (req.user == null) {
        res.status(401).end();
        return;
    }

    let feedstuffRepository = new FeedstuffRepository(config.db);
    let feedstuffService = new FeedstuffService(feedstuffRepository);
    feedstuffService.saveUserFeedstuffMeasurements(req.body.feedstuffId, req.body.measurements).then((saveUserFeedstuffMeasurementsResult: Boolean) => {
        res.json(saveUserFeedstuffMeasurementsResult);
    }).catch((err: Error) => {
        res.json(err.message);
    });
});


router.get('/listUserFeedstuffMeasurements', (req: Request, res: Response, next: Function) => {

    if (req.user == null) {
        res.status(401).end();
        return;
    }

    let feedstuffRepository = new FeedstuffRepository(config.db);
    let feedstuffService = new FeedstuffService(feedstuffRepository);
    feedstuffService.listUserFeedstuffMeasurements(req.query.feedstuffId).then((listUserFeedstuffMeasurementsResult: DomainFeedstuffMeasurement[]) => {
        res.json(listUserFeedstuffMeasurementsResult.map(x => {
            return {
                id: x.id,
                name: x.name,
                value: x.value,
                unit: x.unit
            };
        }));
    }).catch((err: Error) => {
        res.json(err.message);
    });
});

export = router;
