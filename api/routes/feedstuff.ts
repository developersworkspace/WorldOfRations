/// <reference path="./../typings/index.d.ts"/>
import { Express, Request, Response } from "express";
import { FeedstuffService } from './../../core/services/feedstuff'

let express = require('express');
let router = express.Router();

router.get('/list', function (req: Request, res: Response, next: Function) {
    let feedstuffService = new FeedstuffService();
    feedstuffService.listFeedstuff().then((result: any[]) => {
        res.json(result);
    }).catch((err: Error) => {
        res.json(err.message);
    });
});

router.get('/suggestedValues', function (req: Request, res: Response, next: Function) {
    let feedstuffService = new FeedstuffService();
    feedstuffService.getSuggestedValues(req.query.formulaId, req.query.feedstuffId).then((result: any[]) => {
        res.json(result);
    }).catch((err: Error) => {
        res.json(err.message);
    });
});

router.get('/listExample', function (req: Request, res: Response, next: Function) {
    let feedstuffService = new FeedstuffService();
    feedstuffService.listExampleFeedstuff().then((result: any[]) => {
        res.json(result);
    }).catch((err: Error) => {
        res.json(err.message);
    });
});

export = router;
