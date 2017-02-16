// Imports
import proxyquire = require('proxyquire');
import 'mocha';
import { expect } from 'chai';

// Imports services
import { FormulatorService } from './../../../../api/src/core/services/formulator';

// Imports repositories
import { FeedstuffRepository } from './../../../../api/src/core/repositories/mysql/feedstuff';
import { FormulaRepository } from './../../../../api/src/core/repositories/mysql/formula'


// Imports models
import { Formulation as DomainFormulation } from './../../../../api/src/core/models/formulation';
import { Feedstuff as DomainFeedstuff } from './../../../../api/src/core/models/feedstuff';

describe('FeedstuffService', () => {

    let formulatorService: FormulatorService = null;
    let feedstuffRepository: FeedstuffRepository = null;
    let formulaRepository: FormulaRepository = null;

    let feedstuffs: DomainFeedstuff[] = null;
    let formulaId: string = null;

    beforeEach(function (done: Function) {
        let dbConfig = {
            server: '127.0.0.1',
            user: 'worldofrations_user',
            password: 'worldofrations_password',
            database: 'worldofrations'
        };

        let mongoDbConfig = {
            server: 'mongo',
            database: 'worldofrations'
        };

        formulatorService = new FormulatorService({
            db: dbConfig,
            mongodb: mongoDbConfig
        });

        feedstuffRepository = new FeedstuffRepository(dbConfig);
        formulaRepository = new FormulaRepository(dbConfig);

        feedstuffRepository.listExampleFeedstuffs().then((exampleFeedstuff: DomainFeedstuff[]) => {
            feedstuffs = exampleFeedstuff.map(x => new DomainFeedstuff(x.id, null, x.minimum, x.maximum, x.cost));
            done();
        });
    });

    describe('createFormulation', () => {
        it('should return formulation with feedstuff elements populated', () => {
            return formulatorService.createFormulation(feedstuffs, 'CB0360F3-4617-4922-B20D-C3F223BBBCEB').then((formulation: DomainFormulation) => {
                for (let i = 0; i < formulation.feedstuffs.length; i++) {
                    expect(formulation.feedstuffs[i].elements.length).to.be.greaterThan(0);
                }
            });
        });
        it('should return formulation with formula elements populated', () => {
            return formulatorService.createFormulation(feedstuffs, 'CB0360F3-4617-4922-B20D-C3F223BBBCEB').then((formulation: DomainFormulation) => {
                expect(formulation.formula.elements.length).to.be.greaterThan(0);
            });
        });
        it('should return formulation with formula name populated', () => {
            return formulatorService.createFormulation(feedstuffs, 'CB0360F3-4617-4922-B20D-C3F223BBBCEB').then((formulation: DomainFormulation) => {
                expect(formulation.formula.name).to.be.not.null;
            });
        });
        it('should return formulation with feedstuff name populated', () => {
            return formulatorService.createFormulation(feedstuffs, 'CB0360F3-4617-4922-B20D-C3F223BBBCEB').then((formulation: DomainFormulation) => {
                for (let i = 0; i < formulation.feedstuffs.length; i++) {
                    expect(formulation.feedstuffs[i].name).to.be.not.null;
                }
            });
        });
    });

    describe('formulate', () => {
        it('should return result that is feasible given formulation', () => {
            return formulatorService.createFormulation(feedstuffs, 'CB0360F3-4617-4922-B20D-C3F223BBBCEB').then((formulation: DomainFormulation) => {
                let result = formulatorService.formulate(formulation)
                expect(result.feasible).to.be.true;
            });
        });
    });

    describe('getFormulation', () => {
        it('should return formulation with composition populated', () => {
            return formulatorService.createFormulation(feedstuffs, 'CB0360F3-4617-4922-B20D-C3F223BBBCEB').then((formulation: DomainFormulation) => {
                let formulationResult = formulatorService.formulate(formulation);
                return formulatorService.getFormulation(formulationResult.id).then((formulation: DomainFormulation) => {
                    expect(formulation.composition).to.be.not.null;
                    expect(formulation.composition.length).to.be.greaterThan(0);
                })
            })
        });
        it('should return formulation with supplement composition populated', () => {
            return formulatorService.createFormulation(feedstuffs, 'CB0360F3-4617-4922-B20D-C3F223BBBCEB').then((formulation: DomainFormulation) => {
                let formulationResult = formulatorService.formulate(formulation);
                return formulatorService.getFormulation(formulationResult.id).then((formulation: DomainFormulation) => {
                    expect(formulation.supplementComposition).to.be.not.null;
                    expect(formulation.supplementComposition.length).to.be.greaterThan(0);
                });
            });
        });
    });
});