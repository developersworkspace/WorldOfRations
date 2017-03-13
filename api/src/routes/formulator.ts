// Imports
import { Express, Request, Response } from "express";
import * as express from 'express';
import { config } from './../config';

// Imports domain models
import { Formulation as DomainFormulation } from './../models/formulation';

// Imports services
import { FormulatorService } from './../services/formulator';

let router = express.Router();


/**
 * @api {POST} /formulator/formulate RETRIEVE LIST OF FORMULAS
 * @apiName FormulatorFormulate
 * @apiGroup Formulator
 * 
 * @apiParam {Object[]} feedstuffs Empty.
 * @apiParam {String} formulaId Empty.
 * @apiParam {String} currencyCode Empty.
 * 
 * @apiSuccess {Number} cost Empty.
 * @apiSuccess {Boolean} feasible Empty.
 * @apiSuccess {String} id Empty.
 * 
 */
router.post('/formulate', function (req: Request, res: Response, next: Function) {
    let formulatorService = new FormulatorService(config);
    formulatorService.createFormulation(req.body.feedstuffs, req.body.formulaId, req.body.currencyCode).then((formulation: DomainFormulation) => {
        formulatorService.formulate(formulation).then((result: any) => {
            res.json(result);
        });
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
    formulatorService.getFormulation(req.query.formulationId).then((formulation: DomainFormulation) => {
        res.json(formulation);
    }).catch((err: Error) => {
        console.log(err.message);
    });
});


/**
 * @api {get} /formulator/formulations RETRIEVE LIST OF FORMULATIONS
 * @apiName FormulatorFormulations
 * @apiGroup Formulator
 * 
 * @apiSuccess {Object[]} response Empty.
 * 
 */
router.get('/formulations', function (req: Request, res: Response, next: Function) {
    let formulatorService = new FormulatorService(config);
    formulatorService.getFormulations().then((formulations: DomainFormulation[]) => {
        res.json(formulations);
    }).catch((err: Error) => {
        console.log(err.message);
    });
});

export = router;
