/// <reference path="./../typings/index.d.ts"/>

import * as sql from 'mssql';
import { config } from './../config';
import * as solver from './../node_modules/javascript-lp-solver/src/solver';
import { Formulation } from './../models/formulation';
import { Feedstuff } from './../models/feedstuff';
import { Formula } from './../models/formula';
import { Element } from './../models/element';
import * as uuid from 'uuid';
import * as mongodb from 'mongodb';

export class FormulatorService {

    constructor() {

    }

    public createFormulation(feedstuffs: Feedstuff[], formulaId: string) {
        return new Promise((resolve: Function, reject: Function) => {
            this.loadFeedstuffsElements(feedstuffs).then((resultFeedstuffs: Feedstuff[]) => {
                let formula = new Formula(formulaId);
                this.loadFormulaElements(formula).then((resultFormula: Formula) => {
                    let formulation = new Formulation();
                    formulation.feedstuffs = resultFeedstuffs;
                    formulation.formula = resultFormula;
                    resolve(formulation);
                });
            }).catch((err: Error) => {
                reject(err);
            });
        });
    }

    public formulate(formulation: Formulation) {
        let results: any;
        let model = {
            optimize: "cost",
            opType: "min",
            constraints: this.buildConstraints(formulation.feedstuffs, formulation.formula),
            variables: this.buildVariables(formulation.feedstuffs)
        };
        results = solver.Solve(model);

        for (let i = 0; i < formulation.feedstuffs.length; i++) {
            formulation.feedstuffs[i].weight = results[formulation.feedstuffs[i].id];
        }

        formulation.cost = results.result / 1000;
        formulation.feasible = results.feasible;
        formulation.id = uuid.v4();

        let mongoClient = new mongodb.MongoClient();
        mongoClient.connect('mongodb://' + config.mongodb.server + ':27017/' + config.mongodb.database, (err: Error, db: mongodb.Db) => {
            if (err) {

            } else {
                var collection = db.collection('fomulations');
                collection.insertOne(formulation, (err: Error, result: any) => {
                    db.close();
                });
            }
        });
        return {
            cost: formulation.cost,
            feasible: formulation.feasible,
            id: formulation.id
        };
    }

    public getFormulation(formulationId: string) {
        return new Promise((resolve: Function, reject: Function) => {
            let mongoClient = new mongodb.MongoClient();
            mongoClient.connect('mongodb://' + config.mongodb.server + ':27017/' + config.mongodb.database, (err: Error, db: mongodb.Db) => {
                if (err) {
                    reject(err);
                } else {
                    var collection = db.collection('fomulations');
                    collection.findOne({ id: formulationId }, (err: Error, formulation: Formulation) => {
                        this.loadComposition(formulation).then((resultFormulation: Formulation) => {
                            formulation = resultFormulation;
                            formulation = this.cleanFormulationData(formulation);
                            resolve(formulation);
                            db.close();
                        }).catch((err: Error) => {
                            reject(err);
                        });
                    });
                }
            });
        });
    }

    private loadComposition(formulation: Formulation) {

        return new Promise((resolve: Function, reject: Function) => {
            new sql.Connection(config.db)
                .connect().then((connection: sql.Connection) => {
                    new sql.Request(connection)
                        .input('formulaId', formulation.formula.id)
                        .execute('[dbo].[getComparisonFormula]').then((recordsets1: any[]) => {
                            let comparisonFormulaId = recordsets1[0][0].formulaId;
                            new sql.Request(connection)
                                .input('formulaId', comparisonFormulaId)
                                .execute('[dbo].[listElementsForFormula]').then((recordsets2: any[]) => {
                                    let comparisonFormulaElements: Element[] = recordsets2[0];

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

    private cleanFormulationData(formulation: Formulation) {
        for (let i = 0; i < formulation.feedstuffs.length; i++) {
            formulation.feedstuffs[i].elements = null;
        }

        formulation.formula.elements = null;

        return formulation;
    }

    private loadFormulaElements(formula: Formula) {
        return new Promise((resolve: Function, reject: Function) => {
            new sql.Connection(config.db)
                .connect().then((connection: sql.Connection) => {
                    new sql.Request(connection)
                        .input('formulaId', formula.id)
                        .execute('[dbo].[listElementsForFormula]').then((recordsets1: any[]) => {
                            formula.elements = recordsets1[0];

                            new sql.Request(connection)
                                .input('formulaId', formula.id)
                                .execute('[dbo].[getFormula]').then((recordsets2: any[]) => {
                                    formula.name = recordsets2[0][0].name;
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

    private loadFeedstuffsElements(feedstuffs: Feedstuff[]) {
        let parent = this;
        return new Promise((resolve: Function, reject: Function) => {
            new sql.Connection(config.db)
                .connect().then((connection: sql.Connection) => {
                    let listOfPromise = [];
                    for (let i = 0; i < feedstuffs.length; i++) {
                        listOfPromise.push(parent.loadFeedstuffElements(connection, feedstuffs[i]));
                    }
                    Promise.all(listOfPromise).then((values: Feedstuff[]) => {
                        resolve(values);
                    });
                });
        });
    }

    private loadFeedstuffElements(connection: sql.Connection, feedstuff: Feedstuff) {
        return new Promise((resolve: Function, reject: Function) => {
            new sql.Request(connection)
                .input('feedstuffId', feedstuff.id)
                .execute('[dbo].[listElementsForFeedstuff]').then((recordsets1: any[]) => {
                    feedstuff.elements = recordsets1[0];
                    new sql.Request(connection)
                        .input('feedstuffId', feedstuff.id)
                        .execute('[dbo].[getFeedstuff]').then((recordsets2: any[]) => {
                            feedstuff.name = recordsets2[0][0].name;
                            resolve(feedstuff);
                        }).catch((err: Error) => {
                            reject(err);
                        });

                }).catch((err: Error) => {
                    reject(err);
                });
        });
    }

    private buildConstraints(feedstuffs: Feedstuff[], formula: Formula) {
        let constraints = {};

        for (let i = 0; i < formula.elements.length; i++) {
            constraints[formula.elements[i].id] = {
                min: formula.elements[i].minimum * 1000,
                max: formula.elements[i].maximum == null ? 100000000 : formula.elements[i].maximum * 1000
            };
        }

        for (let i = 0; i < feedstuffs.length; i++) {
            constraints[feedstuffs[i].id] = {
                min: feedstuffs[i].minimum,
                max: feedstuffs[i].maximum
            };
        }

        constraints['weight'] = {
            max: 1000,
            min: 1000
        };

        return constraints;
    }

    private buildVariables(feedstuffs: Feedstuff[]) {
        let variables = {};

        for (let i = 0; i < feedstuffs.length; i++) {
            let t = {
                'cost': feedstuffs[i].cost,
                'weight': 1
            };

            for (let j = 0; j < feedstuffs[i].elements.length; j++) {
                t[feedstuffs[i].elements[j].id] = feedstuffs[i].elements[j].value;
            }

            t[feedstuffs[i].id] = 1;

            variables[feedstuffs[i].id] = t;
        }

        return variables;
    }
}