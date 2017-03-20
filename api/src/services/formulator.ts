// Imports
import * as solver from 'javascript-lp-solver';
import * as uuid from 'uuid';

// Imports domain models
import { CompositionElement as DomainCompositionElement } from './../models/composition-element';
import { SupplementElement as DomainSupplementElement } from './../models/supplement-element';
import { Feedstuff as DomainFeedstuff } from './../models/feedstuff';
import { Formulation as DomainFormulation } from './../models/formulation';
import { Formula as DomainFormula } from './../models/formula';
import { FormulaMeasurement as DomainFormulaMeasurement } from './../models/formula-measurement';

// Imports repositories
import { FormulaRepository } from './../repositories/mysql/formula';
import { FeedstuffRepository } from './../repositories/mysql/feedstuff';
import { FormulationRepository } from './../repositories/mongo/formulation';

// Imports services
import { FeedstuffService } from './../services/feedstuff';

export class FormulatorService {

    public formulaRepository: FormulaRepository;
    public feedstuffRepository: FeedstuffRepository;
    public formulationRepository: FormulationRepository;

    feedstuffService: FeedstuffService;

    constructor(private config: any) {
        this.formulaRepository = new FormulaRepository(this.config.db);
        this.feedstuffRepository = new FeedstuffRepository(this.config.db);
        this.formulationRepository = new FormulationRepository(this.config.mongodb);

        this.feedstuffService = new FeedstuffService(this.config.db);
    }

    public createFormulation(feedstuffs: DomainFeedstuff[], formulaId: string, currencyCode: string): Promise<DomainFormulation> {
        let formula = new DomainFormula(formulaId, null);
        let formulation = new DomainFormulation();
        formulation.currencyCode = currencyCode;

        return Promise.all([
            this.feedstuffService.loadElementsForFeedstuffs(feedstuffs),
            this.feedstuffService.loadNamesForFeedstuffs(feedstuffs),
            this.formulaRepository.getFormula(formula.id),
            this.formulaRepository.listElementsForFormula(formula.id)
        ]).then((results: any[]) => {

            formulation.feedstuffs = results[0];

            formulation.feedstuffs.forEach((x, i) => {
                x.name = results[1][i].name;
            });

            formulation.formula = results[2];
            formulation.formula.elements = results[3];
            return formulation;
        });
    }

    public formulate(formulation: DomainFormulation): Promise<any> {

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

        return this.loadCompositionForFormulation(formulation).then((loadCompositionForFormulationResult: DomainFormulation) => {
            return this.loadSupplementFeedstuffsForFormulation(loadCompositionForFormulationResult);
        }).then((loadSupplementFeedstuffsForFormulationResult: DomainFormulation) => {
            return this.formulationRepository.saveFormulation(loadSupplementFeedstuffsForFormulationResult);
        }).then((result: any) => {
            return {
                currencyCode: formulation.currencyCode,
                cost: formulation.cost,
                feasible: formulation.feasible,
                id: formulation.id
            };
        });
    }

    private loadCompositionForFormulation(formulation: DomainFormulation): Promise<DomainFormulation> {
        return this.formulaRepository.getComparisonFormula(formulation.formula.id).then((getComparisonFormulaResult: DomainFormula) => {
            return this.formulaRepository.listElementsForFormula(getComparisonFormulaResult.id).then((listElementsForFormulaResult: DomainFormulaMeasurement[]) => {
                for (let i = 0; i < listElementsForFormulaResult.length; i++) {
                    let elementId = listElementsForFormulaResult[i].id;
                    let elementName = listElementsForFormulaResult[i].name;
                    let elementMinimum = listElementsForFormulaResult[i].minimum == null ? 0 : listElementsForFormulaResult[i].minimum;
                    let elementMaximum = listElementsForFormulaResult[i].maximum == null ? 1000000 : listElementsForFormulaResult[i].maximum;
                    let elementUnit = listElementsForFormulaResult[i].unit;
                    let elementSortOrder = listElementsForFormulaResult[i].sortOrder;
                    let sum = 0;
                    for (let j = 0; j < formulation.feedstuffs.length; j++) {
                        let feedstuffElements = formulation.feedstuffs[j].elements.filter((x) => x.id == elementId);
                        if (feedstuffElements.length > 0 && formulation.feedstuffs[j].weight != undefined) {
                            sum += feedstuffElements[0].value * formulation.feedstuffs[j].weight;
                        }
                    }

                    elementMinimum = listElementsForFormulaResult[i].minimum == null ? 0 : listElementsForFormulaResult[i].minimum;
                    elementMaximum = listElementsForFormulaResult[i].maximum == null ? 1000000 : listElementsForFormulaResult[i].maximum;

                    formulation.composition.push(new DomainCompositionElement(elementId, elementName, this.roundToTwoDecimal(elementMinimum), this.roundToTwoDecimal(elementMaximum), this.roundToTwoDecimal(sum / 1000), elementUnit, elementSortOrder));
                }
                return formulation;
            });
        });
    }

    public getFormulation(formulationId: string): Promise<DomainFormulation> {
        return this.formulationRepository.getFormulationById(formulationId);
    }

    public getFormulations(): Promise<DomainFormulation[]> {
        return this.formulationRepository.getFormulations();
    }

    public loadSupplementFeedstuffsForFormulation(formulation: DomainFormulation): Promise<DomainFormulation> {
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

    private cleanFormulation(formulation: DomainFormulation) {

        for (let i = 0; i < formulation.feedstuffs.length; i++) {
            formulation.feedstuffs[i].elements = null;
        }
        formulation.formula.elements = null;
        return formulation;
    }

    private buildConstraints(feedstuffs: DomainFeedstuff[], formula: DomainFormula) {
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

    private buildVariables(feedstuffs: DomainFeedstuff[]) {
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

    private roundToTwoDecimal(value: number) {
        return Math.round(value * 100) / 100;
    }
}