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
import { Feedstuff } from './../../../../api/src/core/data-models/feedstuff';

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

    // describe('createFormulation', () => {
    //     it('should return formulation with feedstuff element populated', (done) => {
    //         formulatorService.createFormulation(feedstuffs, '').then((result: any[]) => {
    //             expect(result).to.be.not.null;
    //             expect(result.length).to.be.greaterThan(0);
    //             done();
    //         }).catch((err: Error) => {
    //             done(err);
    //         });
    //     });
    // });

});