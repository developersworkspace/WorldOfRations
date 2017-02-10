// Imports
import { Express, Request, Response } from "express";
import * as express from 'express';
import { config } from './../config';

// Imports services
import { FormulaService } from './../core/services/formula';

let router = express.Router();

/**
 * @api {get} /formula/list RETRIEVE LIST OF FORMULAS
 * @apiName FormulaList
 * @apiGroup Formula
 * 
 * @apiSuccess {Object[]} response Empty.
 * 
 */
router.get('/list', function (req: Request, res: Response, next: Function) {
    let formulaService = new FormulaService(config);
    formulaService.listFormula().then((result: any[]) => {
        res.json(result);
    }).catch((err: Error) => {
        res.json(err.message);
    });
});

export = router;