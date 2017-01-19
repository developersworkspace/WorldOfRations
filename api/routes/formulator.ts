/// <reference path="./../typings/index.d.ts"/>
import { Express, Request, Response } from "express";
import { FormulatorService } from './../../core/services/formulator'
import { Formulation } from './../../core/models/formulation'

let express = require('express');
let router = express.Router();

router.post('/formulate', function (req: Request, res: Response, next: Function) {
    let formulatorService = new FormulatorService();
    formulatorService.createFormulation(req.body.feedstuffs, '60DA895D-59CD-44D3-9A74-3C9817F8F55C').then((formulation: Formulation) => {
        let result = formulatorService.formulate(formulation);
        res.json(result);
    }).catch((err: Error) => {
        console.log(err.message);
    });
});

export = router;
