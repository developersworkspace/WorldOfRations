// Imports
import * as util from 'util';
import { IFormulaRepository } from './../formula';

// Imports data models
import { Formula as DataFormula } from './../../data-models/formula';
import { FormulaMeasurement as DataFormulaMeasurement } from './../../data-models/formula-measurement';

// Imports domain models
import { CompositionElement as DomainCompositionElement } from './../../models/composition-element';
import { Formula as DomainFormula } from './../../models/formula';
import { FormulaMeasurement as DomainFormulaMeasurement } from './../../models/formula-measurement';
import { Formulation as DomainFormulation } from './../../models/formulation';

export class MockFormulaRepository implements IFormulaRepository {

    private formulas = [
        new DomainFormula('1', 'Formula1'),
    ];

    constructor(private config: any) {

    }

    public listFormulas(): Promise<DomainFormula[]> {
        return Promise.resolve(this.formulas);
    }

    public listElementsByFormulaId(formulaId: string): Promise<DomainFormulaMeasurement[]> {
        return Promise.resolve([
            new DomainFormulaMeasurement('1', 'Element1', 0, 100, '%', 1),
        ]);
    }

    public findFormulaByFormulaId(formulaId: string): Promise<DomainFormula> {
        return Promise.resolve(this.formulas.find((x) => x.id === formulaId));
    }

    public findComparisonFormulaByFormulaId(formulaId: string): Promise<DomainFormula> {
        return null;
    }
}
