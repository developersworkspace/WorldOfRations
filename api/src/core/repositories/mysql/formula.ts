// Imports
import { Base } from './base';
import * as util from 'util';
import { winston } from './../../logger';

// Import models
import { Formulation } from './../../models/formulation';
import { Feedstuff } from './../../models/feedstuff';
import { Formula } from './../../models/formula';
import { Element } from './../../models/element';

export class FormulaRepository extends Base {

    constructor(config: any) {
        super(config);
    }

    public listFormulas() {
        return this.query('CALL listFormulas()');
    }


    public loadElementsForFormula(formula: Formula) {
        return this.query(util.format('CALL listElementsForFormula(%s)', this.escapeAndFormat(formula.id)))
            .then((listElementsForFormulaRecordSet: Element[]) => {
                formula.elements = listElementsForFormulaRecordSet;
                return this.query(util.format('CALL getFormula(%s)', this.escapeAndFormat(formula.id)))
                    .then((getFormulaRecordSet: any[]) => {
                        formula.name = getFormulaRecordSet[0].name;
                        return formula;
                    });
            });
    }

    public loadCompositionForFormulation(formulation: Formulation) {
        return this.query(util.format('CALL getComparisonFormula(%s)', this.escapeAndFormat(formulation.formula.id))).then((getComparisonFormulaRecordSet: any[]) => {
            let comparisonFormulaId = getComparisonFormulaRecordSet[0].formulaId;
            return this.query(util.format('CALL listElementsForFormula(%s)', this.escapeAndFormat(comparisonFormulaId))).then((listElementsForFormulaRecordSet: any[]) => {
                let comparisonFormulaElements: Element[] = listElementsForFormulaRecordSet;

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
                        if (feedstuffElements.length > 0) {
                            sum += feedstuffElements[0].value * formulation.feedstuffs[j].weight;
                        }
                    }

                    elementMinimum = comparisonFormulaElements[i].minimum == null ? 0 : comparisonFormulaElements[i].minimum;
                    elementMaximum = comparisonFormulaElements[i].maximum == null ? 1000000 : comparisonFormulaElements[i].maximum;

                    formulation.composition.push(new Element(elementId, elementName, this.roundToTwoDecimal(elementMinimum), this.roundToTwoDecimal(elementMaximum), this.roundToTwoDecimal(sum / 1000), elementUnit, elementSortOrder));
                }
                return formulation;
            });
        });
    }

}