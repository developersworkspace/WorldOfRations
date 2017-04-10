// Imports
import { Express, Request, Response } from "express";
import * as express from 'express';
import { config } from './../config';

// Imports repositories
import { FormulaRepository } from './../repositories/mysql/formula';

// Imports services
import { FormulaService } from './../services/formula';

const router = express.Router();

router.get('/listFormula', (req: Request, res: Response, next: () => void) => {
    const formulaRepository = new FormulaRepository(config.db);
    const formulaService = new FormulaService(formulaRepository);
    formulaService.listFormula().then((listFormulaResult: any[]) => {
        res.json(listFormulaResult.map((x) => {
            return {
                id: x.id,
                name: x.name,
            };
        }));
    }).catch((err: Error) => {
        res.json(err.message);
    });
});

export = router;
