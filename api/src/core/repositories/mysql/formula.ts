// Imports
import { Base } from './base';
import * as util from 'util';
import { winston } from './../../logger';

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


    public loadElementsForFormula(formula: DomainFormula): Promise<DomainFormula> {
        return this.query(util.format('CALL listElementsForFormula(%s)', this.escapeAndFormat(formula.id)))
            .then((listElementsForFormulaRecordSet: DataFormulaMeasurement[]) => {
                formula.elements = listElementsForFormulaRecordSet;
                return this.query(util.format('CALL getFormula(%s)', this.escapeAndFormat(formula.id)))
                    .then((getFormulaRecordSet: DataFormula[]) => {
                        formula.name = getFormulaRecordSet[0].name;
                        return formula;
                    });
            });
    }

    public loadCompositionForFormulation(formulation: DomainFormulation): Promise<DomainFormulation> {
        return this.query(util.format('CALL getComparisonFormula(%s)', this.escapeAndFormat(formulation.formula.id))).then((getComparisonFormulaRecordSet: any[]) => {
            let comparisonFormulaId = getComparisonFormulaRecordSet[0].formulaId;
            return this.query(util.format('CALL listElementsForFormula(%s)', this.escapeAndFormat(comparisonFormulaId))).then((comparisonFormulaElements: DataFormulaMeasurement[]) => {
                for (let i = 0; i < comparisonFormulaElements.length; i++) {
                    let elementId = comparisonFormulaElements[i].id;
                    let elementName = comparisonFormulaElements[i].name;
                    let elementMinimum = comparisonFormulaElements[i].minimum == null ? 0 : comparisonFormulaElements[i].minimum;
                    let elementMaximum = comparisonFormulaElements[i].maximum == null ? 1000000 : comparisonFormulaElements[i].maximum;
                    let elementUnit = comparisonFormulaElements[i].unit;
                    let elementSortOrder = comparisonFormulaElements[i].sortOrder;
                    let sum = 0;
                    for (let j = 0; j < formulation.feedstuffs.length; j++) {
                        let feedstuffElements = formulation.feedstuffs[j].elements.filter((x) => x.id == elementId);
                        if (feedstuffElements.length > 0 && formulation.feedstuffs[j].weight != undefined) {
                            sum += feedstuffElements[0].value * formulation.feedstuffs[j].weight;
                        }
                    }
                    
                    elementMinimum = comparisonFormulaElements[i].minimum == null ? 0 : comparisonFormulaElements[i].minimum;
                    elementMaximum = comparisonFormulaElements[i].maximum == null ? 1000000 : comparisonFormulaElements[i].maximum;
                    
                    formulation.composition.push(new DomainCompositionElement(elementId, elementName, this.roundToTwoDecimal(elementMinimum), this.roundToTwoDecimal(elementMaximum), this.roundToTwoDecimal(sum / 1000), elementUnit, elementSortOrder));
                }
                return formulation;
            });
        });
    }

}