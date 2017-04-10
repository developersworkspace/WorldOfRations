import { expect } from 'chai';
import * as co from 'co';
import 'mocha';
import * as sinon from 'sinon';

// Imports services
import { FormulatorService } from './formulator';

// Imports repositories
import { MockElementRepository } from './../repositories/mock/element';
import { MockFeedstuffRepository } from './../repositories/mock/feedstuff';
import { MockFormulaRepository } from './../repositories/mock/formula';
import { MockFormulationRepository } from './../repositories/mock/formulation';

// Imports domain models
import { Feedstuff as DomainFeedstuff } from './../models/feedstuff';
import { FeedstuffMeasurement as DomainFeedstuffMeasurement } from './../models/feedstuff-measurement';
import { Formula as DomainFormula } from './../models/formula';
import { FormulaMeasurement as DomainFormulaMeasurement } from './../models/formula-measurement';
import { Formulation as DomainFormulation } from './../models/formulation';

describe('FormualtorService', () => {

    describe('createFormulation', () => {

        let formulatorService: FormulatorService = null;

        beforeEach(() => {
            const feedstuffRepository = new MockFeedstuffRepository(null);
            const elementRepository = new MockElementRepository(null);
            const formulaRepository = new MockFormulaRepository(null);
            const formulationRepository = new MockFormulationRepository(null);

            sinon.stub(formulaRepository, 'findFormulaByFormulaId').callsFake((formulaId: string) => {
                return Promise.resolve(new DomainFormula(formulaId, 'Formula' + formulaId));
            });

            sinon.stub(formulaRepository, 'listElementsByFormulaId').callsFake((formulaId: string) => {
                return Promise.resolve([
                    new DomainFormulaMeasurement('1', 'Element1', 0, 0, '%', 0),
                ]);
            });

            sinon.stub(feedstuffRepository, 'listElementsByFeedstuffId').callsFake((feedstuffId: string) => {
                if (feedstuffId === '1' || feedstuffId === '2') {
                    return Promise.resolve([
                        new DomainFeedstuffMeasurement('1', 'Element1', 0, '%', 0),
                    ]);
                }
            });

            formulatorService = new FormulatorService(formulaRepository, feedstuffRepository, formulationRepository);
        });

        it('should return formulation where elements of feedstuffs are populated', () => {
            return co(function*() {
                const createFormulationResult: DomainFormulation = yield formulatorService.createFormulation([
                    new DomainFeedstuff('1', null, 0, 100, 400),
                    new DomainFeedstuff('2', null, 50, 200, 400),
                ], '1', 'ZAR', 'ValidUsername');
                expect(createFormulationResult.feedstuffs[0].elements.length).to.be.eq(1);
                expect(createFormulationResult.feedstuffs[1].elements.length).to.be.eq(1);
            });
        });

        it('should return formulation where elements of formula are populated', () => {
            return co(function*() {
                const createFormulationResult: DomainFormulation = yield formulatorService.createFormulation([
                    new DomainFeedstuff('1', null, 0, 100, 400),
                    new DomainFeedstuff('2', null, 50, 200, 400),
                ], '1', 'ZAR', 'ValidUsername');
                expect(createFormulationResult.formula.elements.length).to.be.eq(1);
            });
        });

        it('should return formulation where name of formula are populated', () => {
            return co(function*() {
                const createFormulationResult: DomainFormulation = yield formulatorService.createFormulation([
                    new DomainFeedstuff('1', null, 0, 100, 400),
                    new DomainFeedstuff('2', null, 50, 200, 400),
                ], '1', 'ZAR', 'ValidUsername');
                expect(createFormulationResult.formula.name).to.be.not.null;
            });
        });
    });

    describe('formulate', () => {

        let insertFormulationSpy: sinon.SinonSpy = null;
        let formulatorService: FormulatorService = null;

        beforeEach(() => {
            const feedstuffRepository = new MockFeedstuffRepository(null);
            const elementRepository = new MockElementRepository(null);
            const formulaRepository = new MockFormulaRepository(null);
            const formulationRepository = new MockFormulationRepository(null);

            insertFormulationSpy = sinon.spy(formulationRepository, 'insertFormulation');

            formulatorService = new FormulatorService(formulaRepository, feedstuffRepository, formulationRepository);
        });

        it('should call insertFormulation on repository', () => {
            return co(function*() {
                const formulation: DomainFormulation = new DomainFormulation('1');

                formulation.formula = new DomainFormula('1', null);

                formulation.formula.elements = [
                    new DomainFormulaMeasurement('1', 'Element1', 0, 0, '%', 0),
                ];

                formulation.feedstuffs = [
                    new DomainFeedstuff('1', null, 0, 100, 400),
                ];

                formulation.feedstuffs[0].elements = [
                    new DomainFeedstuffMeasurement('1', 'Element1', 0, '%', 0),
                ];

                const formulateResult: any = yield formulatorService.formulate(formulation);

                sinon.assert.calledOnce(insertFormulationSpy);
            });
        });
    });

});
