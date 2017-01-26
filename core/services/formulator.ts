import { config } from './../config';
import * as solver from './../node_modules/javascript-lp-solver/src/solver';
import { Formulation } from './../models/formulation';
import { Feedstuff } from './../models/feedstuff';
import { Formula } from './../models/formula';
import { Element } from './../models/element';
import { SupplementFeedstuff } from './../models/supplementFeedstuff';
import { FormulaRepository } from './../repositories/formula'
import { FeedstuffRepository } from './../repositories/feedstuff'
import * as uuid from 'uuid';
import * as mongodb from 'mongodb';

export class FormulatorService {

    formulaRepository: FormulaRepository;
    feedstuffRepository: FeedstuffRepository;

    constructor() {
        this.formulaRepository = new FormulaRepository(config.db);
        this.feedstuffRepository = new FeedstuffRepository(config.db);
    }

    public createFormulation(feedstuffs: Feedstuff[], formulaId: string) {
        return new Promise((resolve: Function, reject: Function) => {
            this.feedstuffRepository.loadElementsForFeedstuffs(feedstuffs).then((feedstuffsResult: Feedstuff[]) => {
                let formula = new Formula(formulaId);
                this.formulaRepository.loadElementsForFormula(formula).then((formulaResult: Formula) => {
                    let formulation = new Formulation();
                    formulation.feedstuffs = feedstuffsResult;
                    formulation.formula = formulaResult;
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
                        this.formulaRepository.loadCompositionForFormulation(formulation).then((formulationResult1: Formulation) => {
                            formulation = formulationResult1;
                            this.feedstuffRepository.loadSupplementFeedstuffsForFormulation(formulation).then((formulationResult2) => {
                                 resolve(formulationResult2);
                            }).catch((err:  Error) => {
                                reject(err);
                            });
                            db.close();
                        }).catch((err: Error) => {
                            reject(err);
                        });
                    });
                }
            });
        });
    }

    private cleanFormulationData(formulation: Formulation) {
        for (let i = 0; i < formulation.feedstuffs.length; i++) {
            formulation.feedstuffs[i].elements = null;
        }

        formulation.formula.elements = null;

        return formulation;
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