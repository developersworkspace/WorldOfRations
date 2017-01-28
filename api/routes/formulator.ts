import { Express, Request, Response } from "express";
import { FormulatorService } from './../../core/services/formulator';
import { Formulation } from './../../core/models/formulation';
import { config } from './../config';

import * as express from 'express';
let router = express.Router();

/**
 * @api {POST} /formulator/formulate RETRIEVE LIST OF FORMULAS
 * @apiName FormulatorFormulate
 * @apiGroup Formulator
 * 
 * @apiParam {Object[]} feedstuffs Empty.
 * @apiParam {String} formulaId Empty.
 * 
 * @apiSuccess {Number} cost Empty.
 * @apiSuccess {Boolean} feasible Empty.
 * @apiSuccess {String} id Empty.
 * 
 */
router.post('/formulate', function (req: Request, res: Response, next: Function) {
    let formulatorService = new FormulatorService(config);
    formulatorService.createFormulation(req.body.feedstuffs, req.body.formulaId).then((formulation: Formulation) => {
        let result = formulatorService.formulate(formulation);
        res.json(result);
    }).catch((err: Error) => {
        console.log(err.message);
    });
});

/**
 * @api {get} /formulator/formulation RETRIEVE LIST OF FORMULAS
 * @apiName FormulatorFormulation
 * @apiGroup Formulator
 * 
 * @apiParam {String} formulationId Empty.
 * 
 * @apiSuccess {String} id Empty.
 * @apiSuccess {Object[]} feedstuffs Empty.
 * @apiSuccess {Object[]} composition Empty.
 * @apiSuccess {Object} formula Empty.
 * @apiSuccess {Boolean} feasible Empty.
 * @apiSuccess {Number} cost Empty.
 * 
 */
router.get('/formulation', function (req: Request, res: Response, next: Function) {
    let formulatorService = new FormulatorService(config);
    formulatorService.getFormulation(req.query.formulationId).then((formulation: Formulation) => {
        res.json(formulation);
    }).catch((err: Error) => {
        console.log(err.message);
    });
});

export = router;
