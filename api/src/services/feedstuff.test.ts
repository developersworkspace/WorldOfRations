import 'mocha';
import { expect } from 'chai';

// Imports services
import { FeedstuffService } from './feedstuff';

// Imports repositories
import { MockFeedstuffRepository } from './../repositories/mock/feedstuff';

// Imports domain models
import { Feedstuff as DomainFeedstuff } from './../models/feedstuff';
import { FeedstuffMeasurement as DomainFeedstuffMeasurement } from './../models/feedstuff-measurement';
import { SuggestedValue as DomainSuggestedValue } from './../models/suggested-value';

describe('FeedstuffService', () => {

    let feedstuffService: FeedstuffService = null;

    let validUsername = 'ValidUsername';

    beforeEach(() => {
        let feedstuffRepository = new MockFeedstuffRepository(null);

        feedstuffService = new FeedstuffService(feedstuffRepository);
    });

    describe('populateElementsOfFeedstuffs', () => {
        it('should return list of feedstuffs where elements are populated', () => {
            return feedstuffService.populateElementsOfFeedstuffs(
                [
                    new DomainFeedstuff('1', null, 10, 100, 5000),
                    new DomainFeedstuff('2', null, 10, 100, 5000)
                ]
            ).then((result: DomainFeedstuff[]) => {
                expect(result).to.be.not.null;
                expect(result.length).to.be.eq(2);

                expect(result[0].elements).to.be.not.null;
                expect(result[1].elements).to.be.not.null;

                expect(result[0].elements.length).to.be.eq(1);
                expect(result[1].elements.length).to.be.eq(1);
            });
        });
    });

    describe('populateNamesOfFeedstuffs', () => {
        it('should return list of feedstuffs where names are populated', () => {
            return feedstuffService.populateNamesOfFeedstuffs(
                [
                    new DomainFeedstuff('1', null, 10, 100, 5000),
                    new DomainFeedstuff('2', null, 10, 100, 5000)
                ],
                null
            ).then((result: DomainFeedstuff[]) => {
                expect(result).to.be.not.null;
                expect(result.length).to.be.eq(2);

                expect(result[0].name).to.be.not.null;
                expect(result[1].name).to.be.not.null;
            });
        });
    });


    describe('listFeedstuffs', () => {
        it('should return list of feedstuffs given null username', () => {
            return feedstuffService.listFeedstuffs(null).then((listFeedstuffsResult: DomainFeedstuff[]) => {
                expect(listFeedstuffsResult.length).to.be.eq(4);
            });
        });

        it('should return list of feedstuffs given valid username', () => {
            return feedstuffService.listFeedstuffs(validUsername).then((listFeedstuffsResult: DomainFeedstuff[]) => {
                expect(listFeedstuffsResult.length).to.be.eq(7);
            });
        });
    });

});


function randomNumber(low: number, high: number) {
    return Math.random() * (high - low) + low;
}