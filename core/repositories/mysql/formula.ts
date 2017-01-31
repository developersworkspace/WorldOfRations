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
        return new Promise((resolve: Function, reject: Function) => {
            winston.profile('FormulaRepository.loadElementsForFormula');
            let connection = this.getConnection();
            this.query(util.format('CALL listElementsForFormula(%s)', this.escapeAndFormat(formula.id)))
                .then((listElementsForFormulaRecordSet: any[]) => {
                    formula.elements = listElementsForFormulaRecordSet;
                    this.query(util.format('CALL getFormula(%s)', this.escapeAndFormat(formula.id)))
                        .then((getFormulaRecordSet: any[]) => {
                            formula.name = getFormulaRecordSet[0].name;
                            resolve(formula);
                            winston.profile('FormulaRepository.loadElementsForFormula');
                        }).catch((err: Error) => {
                            reject(err);
                            winston.profile('FormulaRepository.loadElementsForFormula');
                        });
                }).catch((err: Error) => {
                    reject(err);
                    winston.profile('FormulaRepository.loadElementsForFormula');
                });

        });
    }

    public loadCompositionForFormulation(formulation: Formulation) {
        return new Promise((resolve: Function, reject: Function) => {
            winston.profile('FormulaRepository.loadCompositionForFormulation');
            let connection = this.getConnection();
            this.query(util.format('CALL getComparisonFormula(%s)', this.escapeAndFormat(formulation.formula.id))).then((getComparisonFormulaRecordSet: any[]) => {
                    let comparisonFormulaId = getComparisonFormulaRecordSet[0].formulaId;
                    this.query(util.format('CALL listElementsForFormula(%s)', this.escapeAndFormat(comparisonFormulaId))).then((listElementsForFormulaRecordSet: any[]) => {
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
                            resolve(formulation);
                            winston.profile('FormulaRepository.loadCompositionForFormulation');
                        }).catch((err: Error) => {
                            reject(err);
                            winston.profile('FormulaRepository.loadCompositionForFormulation');
                        });

                }).catch((err: Error) => {
                    reject(err);
                    winston.profile('FormulaRepository.loadCompositionForFormulation');
                });

        });
    }


    private roundToTwoDecimal(value: number) {
        return Math.round(value * 100) / 100;
    }

}