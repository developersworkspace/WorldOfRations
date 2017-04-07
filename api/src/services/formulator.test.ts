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

    let formulatorService: FormulatorService = null;

    const validUsername = 'ValidUsername';

    const listOfFeedstuffs = [
        new DomainFeedstuff('1', null, 0, 100, 400),
        new DomainFeedstuff('2', null, 50, 200, 400),
    ];

    const validFormulaId = '1';

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
            } else {
                return Promise.resolve([]);
            }
        });

        formulatorService = new FormulatorService(formulaRepository, feedstuffRepository, formulationRepository);
    });

    describe('createFormulation', () => {

        it('should return formulation where elements of feedstuffs are populated', () => {
            return co(function*() {
                const createFormulationResult: DomainFormulation = yield formulatorService.createFormulation(listOfFeedstuffs, validFormulaId, 'ZAR', validUsername);
                expect(createFormulationResult.feedstuffs[0].elements.length).to.be.eq(1);
                expect(createFormulationResult.feedstuffs[1].elements.length).to.be.eq(1);
            });
        });

        it('should return formulation where elements of formula are populated', () => {
            return co(function*() {
                const createFormulationResult: DomainFormulation = yield formulatorService.createFormulation(listOfFeedstuffs, validFormulaId, 'ZAR', validUsername);
                expect(createFormulationResult.formula.elements.length).to.be.eq(1);
            });
        });

        it('should return formulation where name of formula are populated', () => {
            return co(function*() {
                const createFormulationResult: DomainFormulation = yield formulatorService.createFormulation(listOfFeedstuffs, validFormulaId, 'ZAR', validUsername);
                expect(createFormulationResult.formula.name).to.be.not.null;
            });
        });
    });

});
