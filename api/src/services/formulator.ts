// Imports
import * as solver from 'javascript-lp-solver';
import * as uuid from 'uuid';

// Imports domain models
import { CompositionElement as DomainCompositionElement } from './../models/composition-element';
import { Feedstuff as DomainFeedstuff } from './../models/feedstuff';
import { Formula as DomainFormula } from './../models/formula';
import { FormulaMeasurement as DomainFormulaMeasurement } from './../models/formula-measurement';
import { Formulation as DomainFormulation } from './../models/formulation';
import { SupplementElement as DomainSupplementElement } from './../models/supplement-element';

// Imports repositories
import { FeedstuffRepository } from './../repositories/mysql/feedstuff';
import { FormulaRepository } from './../repositories/mysql/formula';
import { FormulationRepository } from './../repositories/mysql/formulation';

// Imports services
import { FeedstuffService } from './../services/feedstuff';

export class FormulatorService {

    private feedstuffService: FeedstuffService;

    constructor(private formulaRepository: FormulaRepository, private feedstuffRepository: FeedstuffRepository, private formulationRepository: FormulationRepository) {
        this.feedstuffService = new FeedstuffService(feedstuffRepository, null);
    }

    public createFormulation(feedstuffs: DomainFeedstuff[], formulaId: string, currencyCode: string, username: string): Promise<DomainFormulation> {
        const formula = new DomainFormula(formulaId, null);
        const formulation = new DomainFormulation(uuid.v4());
        formulation.currencyCode = currencyCode;

        return Promise.all([
            this.feedstuffService.populateElementsOfFeedstuffs(feedstuffs, username),
            this.formulaRepository.findFormulaByFormulaId(formula.id),
            this.formulaRepository.listElementsByFormulaId(formula.id),
        ]).then((results: any[]) => {

            formulation.feedstuffs = results[0];

            formulation.formula = results[1];
            formulation.formula.elements = results[2];

            return formulation;
        });
    }

    public formulate(formulation: DomainFormulation): Promise<any> {

        let results: any;
        const model = {
            constraints: this.buildConstraintsForSolver(formulation.feedstuffs, formulation.formula),
            opType: "min",
            optimize: "cost",
            variables: this.buildVariablesForSolver(formulation.feedstuffs),
        };

        results = solver.Solve(model);

        for (const feedstuff of formulation.feedstuffs) {
            feedstuff.weight = results[feedstuff.id] === undefined ? 0 : results[feedstuff.id];
        }

        formulation.cost = results.result / 1000;
        formulation.feasible = results.feasible;

        return this.formulationRepository.insertFormulation(formulation).then((insertFormulationResult: any) => {
            return {
                cost: formulation.cost,
                currencyCode: formulation.currencyCode,
                feasible: formulation.feasible,
                id: formulation.id,
            };
        });
    }

    public findFormulation(formulationId: string, username: string): Promise<DomainFormulation> {
        return this.formulationRepository.findFormulationById(formulationId).then((findFormulationByIdResult: DomainFormulation) => {
            return this.populateFormulationFeedstuffOfFormulation(findFormulationByIdResult);
        }).then((populateFormulationFeedstuffOfFormulationResult: DomainFormulation) => {
            return Promise.all([
                populateFormulationFeedstuffOfFormulationResult,
                this.feedstuffService.populateElementsOfFeedstuffs(populateFormulationFeedstuffOfFormulationResult.feedstuffs, username),
            ]);
        }).then((results: any[]) => {
            const formulation: DomainFormulation = results[0];

            formulation.feedstuffs = results[1];
            return formulation;
        })
            .then((result: DomainFormulation) => {
                return this.populateCompositionOfFormulation(result);
            }).then((populateCompositionOfFormulationResult: DomainFormulation) => {
                return this.populateSupplementFeedstuffsOfFormulation(populateCompositionOfFormulationResult);
            }).then((populateSupplementFeedstuffsOfFormulationResult: DomainFormulation) => {
                return populateSupplementFeedstuffsOfFormulationResult;
            });
    }

    public listFormulations(): Promise<DomainFormulation[]> {
        return this.formulationRepository.listFormulations();
    }

    public populateSupplementFeedstuffsOfFormulation(formulation: DomainFormulation): Promise<DomainFormulation> {
        const parent = this;
        const supplementElements: DomainCompositionElement[] = formulation.composition.filter((x) => x.value < x.minimum);
        formulation.supplementComposition = [];

        const listOfPromise = [];

        for (const supplementElement of supplementElements) {
            listOfPromise.push(this.feedstuffRepository.listSupplementFeedstuffByElementId(supplementElement));
        }

        return Promise.all(listOfPromise).then((elementsResult: DomainSupplementElement[]) => {
            formulation.supplementComposition = elementsResult;
            return formulation;
        });
    }

    private populateCompositionOfFormulation(formulation: DomainFormulation): Promise<DomainFormulation> {
        return this.formulaRepository.findComparisonFormulaByFormulaId(formulation.formula.id).then((findComparisonFormulaByFormulaIdResult: DomainFormula) => {
            return this.formulaRepository.listElementsByFormulaId(findComparisonFormulaByFormulaIdResult.id).then((listElementsForFormulaResult: DomainFormulaMeasurement[]) => {
                formulation.composition = [];

                for (const element of listElementsForFormulaResult) {
                    const elementId = element.id;
                    const elementName = element.name;
                    let elementMinimum = element.minimum == null ? 0 : element.minimum;
                    let elementMaximum = element.maximum == null ? 1000000 : element.maximum;
                    const elementUnit = element.unit;
                    const elementSortOrder = element.sortOrder;
                    let sum = 0;
                    for (const feedstuff of formulation.feedstuffs) {
                        const feedstuffElements = feedstuff.elements.filter((x) => x.id === elementId);
                        if (feedstuffElements.length > 0 && feedstuff.weight !== undefined) {
                            sum += feedstuffElements[0].value * feedstuff.weight;
                        }
                    }

                    elementMinimum = element.minimum === null ? 0 : element.minimum;
                    elementMaximum = element.maximum === null ? 1000000 : element.maximum;

                    formulation.composition.push(new DomainCompositionElement(elementId, elementName, this.roundToTwoDecimal(elementMinimum), this.roundToTwoDecimal(elementMaximum), this.roundToTwoDecimal(sum / 1000), elementUnit, elementSortOrder));
                }
                return formulation;
            });
        });
    }

    private populateFormulationFeedstuffOfFormulation(formulation: DomainFormulation): Promise<DomainFormulation> {
        return this.formulationRepository.listFormulationFeedstuffByFormulationId(formulation.id).then((listFormulationFeedstuffByFormulationIdResult: DomainFeedstuff[]) => {
            formulation.feedstuffs = listFormulationFeedstuffByFormulationIdResult;
            return formulation;
        });
    }

    private buildConstraintsForSolver(feedstuffs: DomainFeedstuff[], formula: DomainFormula) {
        const constraints = {
            weight: null,
        };

        for (const element of formula.elements) {
            constraints[element.id] = {
                max: element.maximum == null ? 100000000 : element.maximum * 1000,
                min: element.minimum * 1000,
            };
        }

        for (const feedstuff of feedstuffs) {
            constraints[feedstuff.id] = {
                max: feedstuff.maximum,
                min: feedstuff.minimum,
            };
        }

        constraints.weight = {
            max: 1000,
            min: 1000,
        };

        return constraints;
    }

    private buildVariablesForSolver(feedstuffs: DomainFeedstuff[]) {
        const variables = {};

        for (const feedstuff of feedstuffs) {
            const t = {
                cost: feedstuff.cost,
                weight: 1,
            };

            for (const element of feedstuff.elements) {
                t[element.id] = element.value;
            }

            t[feedstuff.id] = 1;

            variables[feedstuff.id] = t;
        }

        return variables;
    }

    private roundToTwoDecimal(value: number) {
        return Math.round(value * 100) / 100;
    }
}
