/// <reference path="./../typings/index.d.ts"/>

import * as sql from 'mssql';
import { config } from './../config';
import * as solver from './../node_modules/javascript-lp-solver/src/solver';
import { Formulation } from './../models/formulation';
import { Feedstuff } from './../models/feedstuff';
import { Formula } from './../models/formula';
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

        formulation.cost = results.result;
        formulation.feasible = results.feasible;
        formulation.id = uuid.v4();

        let mongoClient = new mongodb.MongoClient();
        mongoClient.connect('mongodb://' + config.mongodb.server + ':27017/' + config.mongodb.database, (err, db) => {
            if (err) {

            } else {
                var collection = db.collection('fomulations');
                collection.insertOne(formulation, (err, result) => {
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
            mongoClient.connect('mongodb://' + config.mongodb.server + ':27017/' + config.mongodb.database, (err, db) => {
                if (err) {
                    reject(err);
                } else {
                    var collection = db.collection('fomulations');
                    collection.findOne({ id: formulationId }, (err, result) => {
                        resolve(result);
                        db.close();
                    });
                }
            });
        });
    }


    private loadFormulaElements(formula: Formula) {
        return new Promise((resolve: Function, reject: Function) => {
            new sql.Connection(config.db)
                .connect().then((connection: any) => {
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
                .connect().then((connection: any) => {
                    let listOfPromise = [];
                    for (let i = 0; i < feedstuffs.length; i++) {
                        listOfPromise.push(parent.loadFeedstuffElements(connection, feedstuffs[i]));
                    }

                    Promise.all(listOfPromise).then((values: any[]) => {
                        resolve(values);
                    });
                });
        });
    }

    private loadFeedstuffElements(connection: any, feedstuff: Feedstuff) {
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