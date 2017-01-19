/// <reference path="./../typings/index.d.ts"/>
import { Express, Request, Response } from "express";
import { FormulatorService } from './../../core/services/formulator'

let express = require('express');
let router = express.Router();

router.post('/formulate', function (req: Request, res: Response, next: Function) {

    let formulatorService = new FormulatorService();
    formulatorService.loadFeedstuffWithElements(req.body.feedstuffs).then((x) => {
        res.json(x);
    }).catch((err: Error) => {
        console.log(err.message);
    });


});

export = router;
