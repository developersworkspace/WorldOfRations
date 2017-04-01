// Imports repositories
import { FeedstuffRepository } from './../repositories/mysql/feedstuff';

// Imports domain models
import { FeedstuffMeasurement as DomainFeedstuffMeasurement } from './../models/feedstuff-measurement';
import { Feedstuff as DomainFeedstuff } from './../models/feedstuff';
import { SuggestedValue as DomainSuggestedValue } from './../models/suggested-value';

export class FeedstuffService {

    constructor(private feedstuffRepository: FeedstuffRepository) {
    }

    public listFeedstuffs(): Promise<DomainFeedstuff[]> {
        return this.feedstuffRepository.listFeedstuffs();
    }

    public listExampleFeedstuffs(): Promise<DomainFeedstuff[]> {
        return this.feedstuffRepository.listExampleFeedstuffs();
    }

    public findSuggestedValues(formulaId: string, feedstuffId: string): Promise<DomainSuggestedValue> {
        return this.feedstuffRepository.findSuggestedValuesByFormulaIdAndFeedstuffId(formulaId, feedstuffId);
    }

    public populateElementsOfFeedstuffs(feedstuffs: DomainFeedstuff[]): Promise<DomainFeedstuff[]> {

        let listOfPromise = [];
        for (let i = 0; i < feedstuffs.length; i++) {
            listOfPromise.push(this.populateElementsOfFeedstuff(feedstuffs[i]));
        }
        return Promise.all(listOfPromise).then((feedstuffsResult: DomainFeedstuff[]) => {
            return feedstuffsResult;
        });
    }

    public populateNamesOfFeedstuffs(feedstuffs: DomainFeedstuff[]): Promise<DomainFeedstuff[]> {

        let listOfPromise = [];
        for (let i = 0; i < feedstuffs.length; i++) {
            listOfPromise.push(this.populateNameOfFeedstuff(feedstuffs[i]));
        }
        return Promise.all(listOfPromise).then((feedstuffsResult: DomainFeedstuff[]) => {
            return feedstuffsResult;
        });
    }

    public listFeedstuffForUser(username: string): Promise<DomainFeedstuff[]> {
        return this.feedstuffRepository.listFeedstuffsByUsername(username);
    }

    private populateElementsOfFeedstuff(feedstuff: DomainFeedstuff): Promise<DomainFeedstuff> {
        return this.feedstuffRepository.listElementsByFeedstuffId(feedstuff.id).then((elements: DomainFeedstuffMeasurement[]) => {
            feedstuff.elements = elements;
            return feedstuff;
        });
    }

    private populateNameOfFeedstuff(feedstuff: DomainFeedstuff): Promise<DomainFeedstuff> {
        return this.feedstuffRepository.findFeedstuffByFeedstuffId(feedstuff.id).then((result: DomainFeedstuff) => {
            feedstuff.name = result.name;
            return feedstuff;
        });
    }
}

