/// <reference path="./../typings/index.d.ts"/>
import { Express, Request, Response } from "express";
import { FormulaService } from './../../core/services/formula'

let express = require('express');
let router = express.Router();

router.get('/list', function (req: Request, res: Response, next: Function) {
    let formulaService = new FormulaService();
    formulaService.listFormula().then((result: any[]) => {
        res.json(result);
    }).catch((err: Error) => {
        res.json(err.message);
    });
});

export = router;
