import 'mocha';
import { expect } from 'chai';

// Imports services
import { FormulatorService } from './formulator';

// Imports repositories
import { FeedstuffRepository } from './../repositories/mysql/feedstuff';
import { FormulaRepository } from './../repositories/mysql/formula';
import { FormulationRepository } from './../repositories/mysql/formulation';

// Imports domain models
import { Feedstuff as DomainFeedstuff } from './../models/feedstuff';
import { Formula as DomainFormula } from './../models/formula';
import { SupplementElement as DomainSupplementElement } from './../models/supplement-element';
import { Formulation as DomainFormulation } from './../models/formulation';
import { FeedstuffMeasurement as DomainFeedstuffMeasurement } from './../models/feedstuff-measurement';
import { FormulaMeasurement as DomainFormulaMeasurement } from './../models/formula-measurement';

describe('FormulatorService', () => {

    let formulatorService: FormulatorService = null;

    beforeEach(() => {
        let feedstuffRepository = new FeedstuffRepository(null);
        let formulaRepository = new FormulaRepository(null);
        let formulationRepository = new FormulationRepository(null);

        feedstuffRepository.listElementsByFeedstuffId = () => {
            return Promise.resolve([
                new DomainFeedstuffMeasurement('', 'Element1', randomNumber(30, 400), '%', randomNumber(1, 100))
            ]);
        };

        feedstuffRepository.getFeedstuffById = () => {
            return Promise.resolve(new DomainFeedstuff('baada53b-3a22-43ac-9ae9-2853eb136ce2', 'Feedstuff1', null, null, null));
        };

        feedstuffRepository.listSupplementFeedstuffByElementId = () => {
            return Promise.resolve(new DomainSupplementElement('b33630fa-94d8-48aa-aba1-7f2692f3afc7', 'Element1', '%', randomNumber(0, 100)));
        }


        formulaRepository.getFormula = () => {
            return Promise.resolve(new DomainFormula('f40339a5-0d34-4708-bcf7-6d97aaee3374', 'Formula1'));
        };

        formulaRepository.listElementsForFormula = () => {
            return Promise.resolve([
                new DomainFormulaMeasurement('', 'Element1', randomNumber(0, 50), randomNumber(50, 100), '%', randomNumber(0, 100))
            ]);
        };

        formulaRepository.getComparisonFormula = () => {
            return Promise.resolve(new DomainFormula('e17b7b0e-1301-4d5c-9a2a-7cacd18352ad', null));
        }

        formulationRepository.getFormulationById = () => {
            let formulation = new DomainFormulation('e6eae775-1edf-47dc-a74b-65cc911bfa8a');
            
            formulation.formula = new DomainFormula('d6cd49a1-18cb-466f-9e3e-d8fc49e071c3', null);
            formulation.cost = randomNumber(1000, 4000);
            formulation.feasible = true;
            formulation.currencyCode = 'ZAR';

            return Promise.resolve(formulation);
        };

        formulatorService = new FormulatorService(formulaRepository, feedstuffRepository, formulationRepository);
    });

    describe('createFormulation', () => {
        it('should return formulation', () => {
            let feedstuffs = [
                new DomainFeedstuff('198f8caa-6b44-4f66-a839-3c7b7bc38311', '', randomNumber(0, 50), randomNumber(50, 100), randomNumber(1000, 4000)),
                new DomainFeedstuff('2c84734a-cc56-413c-a7b3-b961056a20ae', '', randomNumber(0, 50), randomNumber(50, 100), randomNumber(1000, 4000))
            ];

            return formulatorService.createFormulation(feedstuffs, 'bf33e764-6d3c-4518-84a9-1432faea20c2', 'ZAR').then((result: DomainFormulation) => {
                expect(result).to.be.not.null;
                expect(result.id).to.be.not.null;
                expect(result.feedstuffs).to.be.not.null;
                expect(result.currencyCode).to.be.not.null;
                expect(result.formula).to.be.not.null;

                expect(result.cost).to.be.null;
                expect(result.feasible).to.be.null;
                expect(result.supplementComposition).to.be.null;
                expect(result.composition).to.be.null;
            });
        });

        it('should return formulation where elements of feedstuffs are populated', () => {
            let feedstuffs = [
                new DomainFeedstuff('198f8caa-6b44-4f66-a839-3c7b7bc38311', '', randomNumber(0, 50), randomNumber(50, 100), randomNumber(1000, 4000)),
                new DomainFeedstuff('2c84734a-cc56-413c-a7b3-b961056a20ae', '', randomNumber(0, 50), randomNumber(50, 100), randomNumber(1000, 4000))
            ];

            return formulatorService.createFormulation(feedstuffs, 'bf33e764-6d3c-4518-84a9-1432faea20c2', 'ZAR').then((result: DomainFormulation) => {
                for (let i = 0; i < result.feedstuffs.length; i ++) {
                    expect(result.feedstuffs[i].elements).to.be.not.null;
                    expect(result.feedstuffs[i].elements.length).to.be.eq(1);
                } 
            });
        });

        it('should return formulation where elements of formula are populated', () => {
            let feedstuffs = [
                new DomainFeedstuff('198f8caa-6b44-4f66-a839-3c7b7bc38311', '', randomNumber(0, 50), randomNumber(50, 100), randomNumber(1000, 4000)),
                new DomainFeedstuff('2c84734a-cc56-413c-a7b3-b961056a20ae', '', randomNumber(0, 50), randomNumber(50, 100), randomNumber(1000, 4000))
            ];

            return formulatorService.createFormulation(feedstuffs, 'bf33e764-6d3c-4518-84a9-1432faea20c2', 'ZAR').then((result: DomainFormulation) => {
                    expect(result.formula.elements).to.be.not.null;
                    expect(result.formula.elements.length).to.be.eq(1);
            });
        });
    });

    describe('getFormulation', () => {
        it('should return formulation', () => {
            return formulatorService.getFormulation('ee1c1bf1-f41e-4268-aef2-3802b2ede1e1').then((result: DomainFormulation) => {
                expect(result).to.be.not.null;
            });
        });
    });
});


function randomNumber(low: number, high: number) {
    return Math.random() * (high - low) + low;
}