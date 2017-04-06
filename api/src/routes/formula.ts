// Imports
import { Express, Request, Response } from "express";
import * as express from 'express';
import { config } from './../config';

// Imports services
import { FormulaService } from './../services/formula';

const router = express.Router();

router.get('/list', (req: Request, res: Response, next: () => void) => {
    const formulaService = new FormulaService(config);
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
