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
import { FormulationRepository } from './../repositories/mysql/formulation';

// Imports services
import { FeedstuffService } from './../services/feedstuff';

export class FormulatorService {

    feedstuffService: FeedstuffService;

    constructor(private formulaRepository: FormulaRepository, private feedstuffRepository: FeedstuffRepository, private formulationRepository: FormulationRepository) {
        this.feedstuffService = new FeedstuffService(feedstuffRepository);
    }

    public createFormulation(feedstuffs: DomainFeedstuff[], formulaId: string, currencyCode: string): Promise<DomainFormulation> {
        let formula = new DomainFormula(formulaId, null);
        let formulation = new DomainFormulation(uuid.v4());
        formulation.currencyCode = currencyCode;

        return Promise.all([
            this.feedstuffService.populateElementsOfFeedstuffs(feedstuffs),
            this.formulaRepository.findFormulaByFormulaId(formula.id),
            this.formulaRepository.listElementsByFormulaId(formula.id)
        ]).then((results: any[]) => {

            formulation.feedstuffs = results[0];

            formulation.formula = results[1];
            formulation.formula.elements = results[2];
            return formulation;
        });
    }

    public formulate(formulation: DomainFormulation): Promise<any> {

        let results: any;
        let model = {
            optimize: "cost",
            opType: "min",
            constraints: this.buildConstraintsForSolver(formulation.feedstuffs, formulation.formula),
            variables: this.buildVariablesForSolver(formulation.feedstuffs)
        };

        results = solver.Solve(model);

        for (let i = 0; i < formulation.feedstuffs.length; i++) {
            formulation.feedstuffs[i].weight = results[formulation.feedstuffs[i].id] == undefined? 0 : results[formulation.feedstuffs[i].id];
        }

        formulation.cost = results.result / 1000;
        formulation.feasible = results.feasible;

        return this.formulationRepository.insertFormulation(formulation).then((result: any) => {
            return {
                currencyCode: formulation.currencyCode,
                cost: formulation.cost,
                feasible: formulation.feasible,
                id: formulation.id
            };
        });
    }

    public findFormulation(formulationId: string): Promise<DomainFormulation> {
        return this.formulationRepository.findFormulationById(formulationId).then((result: DomainFormulation) => {
            return this.populateFormulationFeedstuffOfFormulation(result);
        }).then((result: DomainFormulation) => {
            return Promise.all([
                result, 
                this.feedstuffService.populateElementsOfFeedstuffs(result.feedstuffs)
            ])
        }).then((results: any[]) => {
            let formulation: DomainFormulation = results[0];

            formulation.feedstuffs = results[1];
            return formulation;
        })
        .then((result: DomainFormulation) => {
            return this.populateCompositionOfFormulation(result);
        }).then((result: DomainFormulation) => {
            return this.populateSupplementFeedstuffsOfFormulation(result)
        }).then((result: DomainFormulation) => {
            return result;
        });
    }

    public listFormulations(): Promise<DomainFormulation[]> {
        return this.formulationRepository.listFormulations();
    }

    public populateSupplementFeedstuffsOfFormulation(formulation: DomainFormulation): Promise<DomainFormulation> {
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


    private populateCompositionOfFormulation(formulation: DomainFormulation): Promise<DomainFormulation> {
        return this.formulaRepository.findComparisonFormulaByFormulaId(formulation.formula.id).then((getComparisonFormulaResult: DomainFormula) => {
            return this.formulaRepository.listElementsByFormulaId(getComparisonFormulaResult.id).then((listElementsForFormulaResult: DomainFormulaMeasurement[]) => {
                formulation.composition = [];

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

    private populateFormulationFeedstuffOfFormulation(formulation: DomainFormulation): Promise<DomainFormulation> {
        return this.formulationRepository.listFormulationFeedstuffByFormulationId(formulation.id).then((result: DomainFeedstuff[]) => {
            formulation.feedstuffs = result;
            return formulation;
        });
    }

    private buildConstraintsForSolver(feedstuffs: DomainFeedstuff[], formula: DomainFormula) {
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

    private buildVariablesForSolver(feedstuffs: DomainFeedstuff[]) {
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