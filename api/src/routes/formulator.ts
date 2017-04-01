// Imports
import { Express, Request, Response } from "express";
import * as express from 'express';
import { config } from './../config';

// Imports domain models
import { Formulation as DomainFormulation } from './../models/formulation';

// Imports repositories
import { FeedstuffRepository } from './../repositories/mysql/feedstuff';
import { FormulaRepository } from './../repositories/mysql/formula';
import { FormulationRepository } from './../repositories/mysql/formulation';

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
router.post('/formulate', (req: Request, res: Response, next: Function) => {
    let feedstuffRepository = new FeedstuffRepository(config.db);
    let formulaRepository = new FormulaRepository(config.db);
    let formulationRepository = new FormulationRepository(config.db);
    let formulatorService = new FormulatorService(formulaRepository, feedstuffRepository, formulationRepository);

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
router.get('/formulation', (req: Request, res: Response, next: Function) => {
    let feedstuffRepository = new FeedstuffRepository(config.db);
    let formulaRepository = new FormulaRepository(config.db);
    let formulationRepository = new FormulationRepository(config.db);
    let formulatorService = new FormulatorService(formulaRepository, feedstuffRepository, formulationRepository);

    formulatorService.findFormulation(req.query.formulationId).then((formulation: DomainFormulation) => {
        res.json({
            id: formulation.id,
            feedstuffs: formulation.feedstuffs.map(x => {
                return {
                    id: x.id,
                    name: x.name,
                    weight: x.weight,
                    cost: x.cost
                };
            }),
            composition: formulation.composition.map(x => {
                return {
                    id: x.id,
                    name: x.name,
                    value: x.value,
                    unit: x.unit,
                    sortOrder: x.sortOrder,
                    status: x.value < x.minimum? 'Inadequate' : x.value> x.maximum? 'Excessive' : 'Adequate'
                };
            }),
            currencyCode: formulation.currencyCode,
            cost: formulation.cost,
            feasible: formulation.feasible,
            supplementComposition: formulation.supplementComposition.map(x => {
                return {
                    id: x.id,
                    name: x.name,
                    unit: x.unit,
                    sortOrder: x.sortOrder,
                    supplementFeedstuffs: x.supplementFeedstuffs,
                    selectedSupplementFeedstuffs: x.selectedSupplementFeedstuffs
                };
            }),
            formula: {
                name: formulation.formula.name
            }
        });
    }).catch((err: Error) => {
        res.json(err.message);
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
router.get('/formulations', (req: Request, res: Response, next: Function) => {
    let feedstuffRepository = new FeedstuffRepository(config.db);
    let formulaRepository = new FormulaRepository(config.db);
    let formulationRepository = new FormulationRepository(config.db);
    let formulatorService = new FormulatorService(formulaRepository, feedstuffRepository, formulationRepository);
    
    formulatorService.listFormulations().then((formulations: DomainFormulation[]) => {
        res.json(formulations.map(x => {
            return {
                id: x.id,
                formula: {
                    id: x.formula.id,
                    name: x.formula.name
                }
            }
        }));
    }).catch((err: Error) => {
        res.json(err.message);
    });
});

export = router;
