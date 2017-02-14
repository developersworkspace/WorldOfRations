// Imports
import * as solver from 'javascript-lp-solver';
import * as uuid from 'uuid';
import { winston } from './../logger';

// Import models
import { Formulation } from './../models/formulation';
import { Feedstuff } from './../models/feedstuff';
import { Formula } from './../models/formula';
import { Element } from './../models/element';
import { SupplementFeedstuff } from './../models/supplement-feedstuff';

// Imports domain models
import { CompositionElement as DomainCompositionElement } from './../models/composition-element';
import { SupplementElement as DomainSupplementElement } from './../models/supplement-element';

// Imports repositories
import { FormulaRepository } from './../repositories/mysql/formula';
import { FeedstuffRepository } from './../repositories/mysql/feedstuff';
import { FormulationRepository } from './../repositories/mongo/formulation';

// Imports services
import { FeedstuffService } from './../services/feedstuff';

export class FormulatorService {

    formulaRepository: FormulaRepository;
    feedstuffRepository: FeedstuffRepository;
    formulationRepository: FormulationRepository;

    feedstuffService: FeedstuffService;

    constructor(private config: any) {
        this.formulaRepository = new FormulaRepository(this.config.db);
        this.feedstuffRepository = new FeedstuffRepository(this.config.db);
        this.formulationRepository = new FormulationRepository(this.config.mongodb);

        this.feedstuffService = new FeedstuffService(this.config.db);
    }

    public createFormulation(feedstuffs: Feedstuff[], formulaId: string): Promise<Formulation> {

        let formula = new Formula(formulaId, 'Unknown');
        let formulation = new Formulation();

        return this.feedstuffService.loadNamesForFeedstuffs(feedstuffs).then((loadNamesForFeedstuffsResult: Feedstuff[]) => {
            return Promise.all(
                [
                    this.feedstuffService.loadElementsForFeedstuffs(loadNamesForFeedstuffsResult),
                    this.formulaRepository.loadElementsForFormula(formula)
                ]).then((results: any[]) => {

                    formulation.feedstuffs = results[0];
                    formulation.formula = results[1];
                    return formulation;
                });
        });
    }

    public formulate(formulation: Formulation): any {

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

    public getFormulation(formulationId: string): Promise<Formulation> {
        return this.formulationRepository.getFormulationById(formulationId).then((formulation: Formulation) => {
            return this.formulaRepository.loadCompositionForFormulation(formulation);
        }).then((formulation: Formulation) => {
            return this.loadSupplementFeedstuffsForFormulation(formulation);
        }).then((formulation: Formulation) => {
            let formulationResult = this.cleanFormulation(formulation);
            return formulationResult;
        });
    }

    public loadSupplementFeedstuffsForFormulation(formulation: Formulation): Promise<Formulation> {
        let parent = this;
        let supplementElements: DomainCompositionElement[] = formulation.composition.filter((x) => x.value < x.minimum);
        formulation.supplementComposition = [];

        let listOfPromise = [];

        for (let i = 0; i < supplementElements.length; i++) {
            listOfPromise.push(this.feedstuffRepository.listSupplementFeedstuffByElementId(supplementElements[i]));
        }

        return Promise.all(listOfPromise).then((elementsResult: DomainSupplementElement[]) => {
            formulation.supplementComposition = elementsResult;
            return formulation;
        });
    }

    private cleanFormulation(formulation: Formulation) {

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