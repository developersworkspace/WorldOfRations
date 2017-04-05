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

router.post('/formulate', (req: Request, res: Response, next: Function) => {
    let feedstuffRepository = new FeedstuffRepository(config.db);
    let formulaRepository = new FormulaRepository(config.db);
    let formulationRepository = new FormulationRepository(config.db);
    let formulatorService = new FormulatorService(formulaRepository, feedstuffRepository, formulationRepository);

    formulatorService.createFormulation(req.body.feedstuffs, req.body.formulaId, req.body.currencyCode).then((createFormulationResult: DomainFormulation) => {
        formulatorService.formulate(createFormulationResult).then((formulateResult: any) => {
            res.json(formulateResult);
        });
    }).catch((err: Error) => {
        res.json(err.message);
    });
});

router.get('/formulation', (req: Request, res: Response, next: Function) => {
    let feedstuffRepository = new FeedstuffRepository(config.db);
    let formulaRepository = new FormulaRepository(config.db);
    let formulationRepository = new FormulationRepository(config.db);
    let formulatorService = new FormulatorService(formulaRepository, feedstuffRepository, formulationRepository);

    formulatorService.findFormulation(req.query.formulationId).then((findFormulationResult: DomainFormulation) => {
        res.json({
            id: findFormulationResult.id,
            feedstuffs: findFormulationResult.feedstuffs.map(x => {
                return {
                    id: x.id,
                    name: x.name,
                    weight: x.weight,
                    cost: x.cost
                };
            }),
            composition: findFormulationResult.composition.map(x => {
                return {
                    id: x.id,
                    name: x.name,
                    value: x.value,
                    unit: x.unit,
                    sortOrder: x.sortOrder,
                    status: x.value < x.minimum? 'Inadequate' : x.value> x.maximum? 'Excessive' : 'Adequate'
                };
            }),
            currencyCode: findFormulationResult.currencyCode,
            cost: findFormulationResult.cost,
            feasible: findFormulationResult.feasible,
            supplementComposition: findFormulationResult.supplementComposition.map(x => {
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
                name: findFormulationResult.formula.name
            }
        });
    }).catch((err: Error) => {
        res.json(err.message);
    });
});

router.get('/formulations', (req: Request, res: Response, next: Function) => {
    let feedstuffRepository = new FeedstuffRepository(config.db);
    let formulaRepository = new FormulaRepository(config.db);
    let formulationRepository = new FormulationRepository(config.db);
    let formulatorService = new FormulatorService(formulaRepository, feedstuffRepository, formulationRepository);
    
    formulatorService.listFormulations().then((listFormulationsResult: DomainFormulation[]) => {
        res.json(listFormulationsResult.map(x => {
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
