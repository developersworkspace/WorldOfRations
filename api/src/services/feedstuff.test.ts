import 'mocha';
import { expect } from 'chai';

// Imports services
import { FeedstuffService } from './feedstuff';

// Imports repositories
import { FeedstuffRepository } from './../repositories/mysql/feedstuff';

// Imports domain models
import { Feedstuff as DomainFeedstuff } from './../models/feedstuff';
import { FeedstuffMeasurement as DomainFeedstuffMeasurement } from './../models/feedstuff-measurement';
import { SuggestedValue as DomainSuggestedValue } from './../models/suggested-value';

describe('FeedstuffService', () => {

    let feedstuffService: FeedstuffService = null;
    

    beforeEach(() => {
        let feedstuffRepository = new FeedstuffRepository(null);
        
        feedstuffRepository.listElementsByFeedstuffId = () => {
            return Promise.resolve([
                new DomainFeedstuffMeasurement('', 'Element1', randomNumber(30, 400), '%', randomNumber(1,100))
            ]);
        };

        feedstuffRepository.findFeedstuffByFeedstuffId = () => {
            return Promise.resolve(new DomainFeedstuff('baada53b-3a22-43ac-9ae9-2853eb136ce2', 'Feedstuff1', null, null, null));
        };

        feedstuffService = new FeedstuffService(feedstuffRepository);
    });

    describe('populateElementsOfFeedstuffs', () => {
        it('should return list of feedstuffs where elements are populated', () => {
            return feedstuffService.populateElementsOfFeedstuffs(
                [
                    new DomainFeedstuff('baada53b-3a22-43ac-9ae9-2853eb136ce2', null, 10, 100, 5000),
                    new DomainFeedstuff('6d54758c-47d1-445e-b40d-4aba7d193b39', null, 10, 100, 5000)
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
                    new DomainFeedstuff('baada53b-3a22-43ac-9ae9-2853eb136ce2', null, 10, 100, 5000),
                    new DomainFeedstuff('6d54758c-47d1-445e-b40d-4aba7d193b39', null, 10, 100, 5000)
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

});


function randomNumber(low: number, high: number) {
    return Math.random() * (high - low) + low;
}