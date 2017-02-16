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
    beforeEach(function (done: Function) {

        feedstuffService = new FeedstuffService({
                db: {
                    server: '127.0.0.1',
                    user: 'worldofrations_user',
                    password: 'worldofrations_password',
                    database: 'worldofrations'
                }
            })
        done();
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

        it('should return list of suggested values', () => {
            return feedstuffService.getSuggestedValues('CB0360F3-4617-4922-B20D-C3F223BBBCEB', '0CA0953B-C75B-48A1-A31D-89FACC248E90').then((result: DomainSuggestedValue) => {
                expect(result).to.be.not.null;
            });
        });

        it('should return empty list given feedstuff id with no suggested values', () => {
            return feedstuffService.getSuggestedValues('CB0360F3-4617-4922-B20D-C3F223BBBCEB', '6B5F4F25-6661-4D4B-ABC7-D44AEFCDE955').then((result: any) => {
                expect(result).to.be.null;
            });
        });

    });
});