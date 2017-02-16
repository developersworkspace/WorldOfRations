// Imports
import proxyquire = require('proxyquire');
import 'mocha';
import { expect } from 'chai';

// Imports services
import { FeedstuffService } from './../../../../api/src/core/services/feedstuff';

// Imports domain models
import { Feedstuff as DomainFeedstuff } from './../../../../api/src/core/models/feedstuff';
import { FeedstuffMeasurement as DomainFeedstuffMeasurement } from './../../../../api/src/core/models/feedstuff-measurement';
import { SuggestedValue as DomainSuggestedValue } from './../../../../api/src/core/models/suggested-value';
import { CompositionElement as DomainCompositionElement } from './../../../../api/src/core/models/composition-element';
import { SupplementElement as DomainSupplementElement } from './../../../../api/src/core/models/supplement-element';

describe('FeedstuffService', () => {

    let feedstuffService: FeedstuffService = null;

    let existingFeedstuffId = '36995DEF-9B6B-49CD-9AA6-0165478BA4CD';
    let nonExistingFeedstuffId = '078567E3-A67E-4737-B273-4AE381FDBACD';
    let existingFormulaIdWithSuggestedValue = 'CB0360F3-4617-4922-B20D-C3F223BBBCEB';
    let existingFeedstuffIdWithSuggestedValue = 'B3EDBFD3-CB3C-4427-A6FB-B20EBF4FC831';
    let nonExistingFormulaId = '3DE8F48A-CC7A-4217-B317-979866B42BB6';

    beforeEach(() => {

        feedstuffService = new FeedstuffService({
            db: {
                server: '127.0.0.1',
                user: 'worldofrations_user',
                password: 'worldofrations_password',
                database: 'worldofrations'
            }
        });
    });

    describe('listFeedstuffs', () => {
        it('should return list of 264 feedstuffs', () => {
            return feedstuffService.listFeedstuffs().then((result: DomainFeedstuff[]) => {
                expect(result).to.be.not.null;
                expect(result.length).to.be.eq(264);
            });
        });
    });

    describe('listExampleFeedstuffs', () => {
        it('should return list of feedstuffs', () => {
            return feedstuffService.listExampleFeedstuffs().then((result: DomainFeedstuff[]) => {
                expect(result).to.be.not.null;
                expect(result.length).to.be.eq(13);
            });
        });
    });

    describe('getSuggestedValues', () => {
        it('should return suggested value given existing formula id and existing feedstuff id', () => {
            return feedstuffService.getSuggestedValues(existingFormulaIdWithSuggestedValue, existingFeedstuffIdWithSuggestedValue).then((result: DomainSuggestedValue) => {
                expect(result).to.be.not.null;
            });
        });
        it('should return null given non-existing formula id and existing feedstuff id', () => {
            return feedstuffService.getSuggestedValues(nonExistingFormulaId, nonExistingFeedstuffId).then((result: DomainSuggestedValue) => {
                expect(result).to.be.null;
            });
        });
    });

    describe('loadElementsForFeedstuffs', () => {
        it('hould return list of feedstuffs with elements populated', () => {
            return feedstuffService.loadElementsForFeedstuffs([new DomainFeedstuff(existingFeedstuffId, null, 0, 1000, 2000)]).then((result: DomainFeedstuff[]) => {
                expect(result).to.be.not.null;
                expect(result[0].elements.length).to.be.greaterThan(0);
            });
        });
    });


    describe('loadNamesForFeedstuffs', () => {
        it('hould return list of feedstuffs with names populated', () => {
            return feedstuffService.loadNamesForFeedstuffs([new DomainFeedstuff(existingFeedstuffId, null, 0, 1000, 2000)]).then((result: DomainFeedstuff[]) => {
                expect(result).to.be.not.null;
                expect(result[0].name).to.be.not.null;
            });
        });
    });

});