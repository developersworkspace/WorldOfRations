// Imports
import * as util from 'util';
import { IFormulaRepository } from './../formula';
import { Base } from './base';

// Imports data models
import { Formula as DataFormula } from './../../data-models/formula';
import { FormulaMeasurement as DataFormulaMeasurement } from './../../data-models/formula-measurement';

// Imports domain models
import { CompositionElement as DomainCompositionElement } from './../../models/composition-element';
import { Formula as DomainFormula } from './../../models/formula';
import { FormulaMeasurement as DomainFormulaMeasurement } from './../../models/formula-measurement';
import { Formulation as DomainFormulation } from './../../models/formulation';

export class FormulaRepository extends Base implements IFormulaRepository {

    constructor(config: any) {
        super(config);
    }

    public listFormulas(): Promise<DomainFormula[]> {
        return this.query('CALL listFormulas();').then((result: DataFormula[]) => {
            return result.map((x) => new DomainFormula(x.id, x.name));
        });
    }

    public listElementsByFormulaId(formulaId: string): Promise<DomainFormulaMeasurement[]> {
        return this.query(util.format('CALL listElementsForFormula(%s);', this.escapeAndFormat(formulaId)))
            .then((listElementsForFormulaRecordSet: DataFormulaMeasurement[]) => {
                return listElementsForFormulaRecordSet.map((x) => new DomainFormulaMeasurement(x.id, x.name, x.minimum, x.maximum, x.unit, x.sortOrder));
            });
    }

    public findFormulaByFormulaId(formulaId: string): Promise<DomainFormula> {
        return this.query(util.format('CALL findFormulaByFormulaId(%s);', this.escapeAndFormat(formulaId)))
            .then((findFormulaByFormulaIdResult: DataFormula[]) => {
                return new DomainFormula(findFormulaByFormulaIdResult[0].id, findFormulaByFormulaIdResult[0].name);
            });
    }

    public findComparisonFormulaByFormulaId(formulaId: string): Promise<DomainFormula> {
        return this.query(util.format('CALL findComparisonFormulaByFormulaId(%s);', this.escapeAndFormat(formulaId))).then((findComparisonFormulaByFormulaIdResult: any[]) => {
            return new DomainFormula(findComparisonFormulaByFormulaIdResult[0].formulaId, null);
        });
    }
}
