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
//import { Feedstuff } from './../../../../api/src/core/data-models/feedstuff';
import { Formulation } from './../../../../api/src/core/models/formulation';
import { Feedstuff } from './../../../../api/src/core/models/feedstuff';

describe('FeedstuffService', () => {

    let formulatorService: FormulatorService = null;
    let feedstuffRepository: FeedstuffRepository = null;
    let formulaRepository: FormulaRepository = null;

    let feedstuffs: Feedstuff[] = null;
    let formulaId: string = null;

    beforeEach(function (done: Function) {
        let dbConfig = {
            server: '127.0.0.1',
            user: 'worldofrations_user',
            password: 'worldofrations_password',
            database: 'worldofrations'
        };

        formulatorService = new FormulatorService({
            db: dbConfig
        });

        feedstuffRepository = new FeedstuffRepository(dbConfig);
        formulaRepository = new FormulaRepository(dbConfig);

        feedstuffRepository.listExampleFeedstuffs().then((exampleFeedstuff: Feedstuff[]) => {
            feedstuffs = exampleFeedstuff;
            done();
        });
    });

    describe('createFormulation', () => {


        it('should return formulation with feedstuff elements populated', (done) => {
            formulatorService.createFormulation(feedstuffs, 'CB0360F3-4617-4922-B20D-C3F223BBBCEB').then((formulation: Formulation) => {
                for (let i = 0; i < formulation.feedstuffs.length; i++) {
                    expect(formulation.feedstuffs[i].elements.length).to.be.greaterThan(0);
                }
                done();
            }).catch((err: Error) => {
                done(err);
            });
        });

        it('should return formulation with formula elements populated', (done) => {
            formulatorService.createFormulation(feedstuffs, 'CB0360F3-4617-4922-B20D-C3F223BBBCEB').then((formulation: Formulation) => {
                expect(formulation.formula.elements.length).to.be.greaterThan(0);
                done();
            }).catch((err: Error) => {
                done(err);
            });
        });


    });


    describe('formulate', () => {


        it('should return result that is feasible given formulation', (done) => {
            formulatorService.createFormulation(feedstuffs, 'CB0360F3-4617-4922-B20D-C3F223BBBCEB').then((formulation: Formulation) => {

                let result = formulatorService.formulate(formulation)
                expect(result.feasible).to.be.true;
                
                done();

            }).catch((err: Error) => {
                done(err);
            });
        });

    });


});