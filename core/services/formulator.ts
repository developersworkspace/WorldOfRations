import * as solver from './../node_modules/javascript-lp-solver/src/solver';
import { Formulation } from './../models/formulation';
import { Feedstuff } from './../models/feedstuff';
import { Formula } from './../models/formula';
import { Element } from './../models/element';
import { SupplementFeedstuff } from './../models/supplementFeedstuff';
import { FormulaRepository } from './../repositories/formula'
import { FeedstuffRepository } from './../repositories/feedstuff'
import { FormulationRepository } from './../repositories/formulation'
import * as uuid from 'uuid';


export class FormulatorService {

    formulaRepository: FormulaRepository;
    feedstuffRepository: FeedstuffRepository;
    formulationRepository: FormulationRepository;

    constructor(private config: any) {
        this.formulaRepository = new FormulaRepository(this.config.db);
        this.feedstuffRepository = new FeedstuffRepository(this.config.db);
        this.formulationRepository = new FormulationRepository(this.config.mongodb);
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

        this.formulationRepository.saveFormulation(formulation).then((result) => {

        });

        return {
            cost: formulation.cost,
            feasible: formulation.feasible,
            id: formulation.id
        };
    }

    public getFormulation(formulationId: string) {
        return new Promise((resolve: Function, reject: Function) => {
            this.formulationRepository.getFormulationById(formulationId).then((formulationResult1: Formulation) => {
                this.formulaRepository.loadCompositionForFormulation(formulationResult1).then((formulationResult2: Formulation) => {
                            this.feedstuffRepository.loadSupplementFeedstuffsForFormulation(formulationResult2).then((formulationResult3) => {
                                resolve(formulationResult3);
                            }).catch((err: Error) => {
                                reject(err);
                            });
                        }).catch((err: Error) => {
                            reject(err);
                        });
            }).catch((err: Error) => {
                reject(err);
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