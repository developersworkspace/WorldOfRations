import { expect } from 'chai';
import 'mocha';

// Imports services
import { FormulatorService } from './formulator';

// Imports repositories
import { MockElementRepository } from './../repositories/mock/element';
import { MockFeedstuffRepository } from './../repositories/mock/feedstuff';
import { MockFormulaRepository } from './../repositories/mock/formula';
import { MockFormulationRepository } from './../repositories/mock/formulation';

// Imports domain models
import { Feedstuff as DomainFeedstuff } from './../models/feedstuff';
import { Formulation as DomainFormulation } from './../models/formulation';

describe('FeedstuffService', () => {

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

        formulatorService = new FormulatorService(formulaRepository, feedstuffRepository, formulationRepository);
    });

    describe('createFormulation', () => {

        it('should return formulation where elements of feedstuffs are populated', () => {
            return formulatorService.createFormulation(listOfFeedstuffs, validFormulaId, 'ZAR', validUsername).then((result: DomainFormulation) => {
                expect(result.feedstuffs[0].elements.length).to.be.eq(1);
                expect(result.feedstuffs[1].elements.length).to.be.eq(1);
            });
        });

        it('should return formulation where elements of formula are populated', () => {
            return formulatorService.createFormulation(listOfFeedstuffs, validFormulaId, 'ZAR', validUsername).then((result: DomainFormulation) => {
                expect(result.formula.elements.length).to.be.eq(1);
            });
        });
    });

});
