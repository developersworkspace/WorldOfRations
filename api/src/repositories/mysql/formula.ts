// Imports
import { Base } from './base';
import * as util from 'util';

// Imports data models
import { FormulaMeasurement as DataFormulaMeasurement } from './../../data-models/formula-measurement';
import { Formula as DataFormula } from './../../data-models/formula';

// Imports domain models
import { Formula as DomainFormula } from './../../models/formula';
import { FormulaMeasurement as DomainFormulaMeasurement } from './../../models/formula-measurement';
import { CompositionElement as DomainCompositionElement } from './../../models/composition-element';
import { Formulation as DomainFormulation } from './../../models/formulation';

export class FormulaRepository extends Base {

    constructor(config: any) {
        super(config);
    }

    public listFormulas(): Promise<DomainFormula[]> {
        return this.query('CALL listFormulas()').then((result: DataFormula[]) => {
            return result.map(x => new DomainFormula(x.id, x.name));
        });
    }

    public listElementsByFormulaId(formulaId: string): Promise<DomainFormulaMeasurement[]> {
        return this.query(util.format('CALL listElementsForFormula(%s)', this.escapeAndFormat(formulaId)))
            .then((listElementsForFormulaRecordSet: DataFormulaMeasurement[]) => {
                return listElementsForFormulaRecordSet.map(x => new DomainFormulaMeasurement(x.id, x.name, x.minimum, x.maximum, x.unit, x.sortOrder));
            });
    }

    public findFormulaByFormulaId(formulaId: string) {
        return this.query(util.format('CALL getFormula(%s)', this.escapeAndFormat(formulaId)))
            .then((getFormulaRecordSet: DataFormula[]) => {
                return new DomainFormula(getFormulaRecordSet[0].id, getFormulaRecordSet[0].name);
            });
    }

    public findComparisonFormulaByFormulaId(formulaId: string) : Promise<DomainFormula> {
        return this.query(util.format('CALL getComparisonFormula(%s)', this.escapeAndFormat(formulaId))).then((getComparisonFormulaRecordSet: any[]) => {
            return new DomainFormula(getComparisonFormulaRecordSet[0].formulaId, null);
        });
    }
}