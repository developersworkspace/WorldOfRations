import * as sql from 'mssql';
import { Formulation } from './../../models/formulation';
import { Feedstuff } from './../../models/feedstuff';
import { Formula } from './../../models/formula';
import { Element } from './../../models/element';

export class FormulaRepository {

    constructor(private config: any) {

    }

    public listFormulas() {
        return new Promise((resolve: Function, reject: Function) => {
            new sql.Connection(this.config)
                .connect().then((connection: sql.Connection) => {
                    new sql.Request(connection)
                        .execute('[dbo].[listFormulas]').then((listFormulasRecordSet: any[]) => {
                            resolve(listFormulasRecordSet[0]);
                        }).catch(function (err: Error) {
                            reject(err);
                        });
                });
        });
    }


    public loadElementsForFormula(formula: Formula) {
        return new Promise((resolve: Function, reject: Function) => {
            new sql.Connection(this.config)
                .connect().then((connection: sql.Connection) => {
                    new sql.Request(connection)
                        .input('formulaId', formula.id)
                        .execute('[dbo].[listElementsForFormula]').then((listElementsForFormulaRecordSet: any[]) => {
                            formula.elements = listElementsForFormulaRecordSet[0];
                            new sql.Request(connection)
                                .input('formulaId', formula.id)
                                .execute('[dbo].[getFormula]').then((getFormulaRecordSet: any[]) => {
                                    formula.name = getFormulaRecordSet[0][0].name;
                                    resolve(formula);
                                }).catch((err: Error) => {
                                    reject(err);
                                });

                        }).catch((err: Error) => {
                            reject(err);
                        });
                });
        });
    }

    public loadCompositionForFormulation(formulation: Formulation) {
        return new Promise((resolve: Function, reject: Function) => {
            new sql.Connection(this.config)
                .connect().then((connection: sql.Connection) => {
                    new sql.Request(connection)
                        .input('formulaId', formulation.formula.id)
                        .execute('[dbo].[getComparisonFormula]').then((getComparisonFormulaRecordSet: any[]) => {
                            let comparisonFormulaId = getComparisonFormulaRecordSet[0][0].formulaId;
                            new sql.Request(connection)
                                .input('formulaId', comparisonFormulaId)
                                .execute('[dbo].[listElementsForFormula]').then((listElementsForFormulaRecordSet: any[]) => {
                                    let comparisonFormulaElements: Element[] = listElementsForFormulaRecordSet[0];

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
                                }).catch((err: Error) => {
                                    reject(err);
                                });

                        }).catch((err: Error) => {
                            reject(err);
                        });
                });
        });
    }


    private roundToTwoDecimal(value: number) {
        return Math.round(value * 100) / 100;
    }

}