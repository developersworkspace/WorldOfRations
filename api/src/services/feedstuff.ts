// Imports
import * as uuid from 'uuid';

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

    public populateNamesOfFeedstuffs(feedstuffs: DomainFeedstuff[], username: string): Promise<DomainFeedstuff[]> {

        let listOfPromise = [];
        for (let i = 0; i < feedstuffs.length; i++) {
            listOfPromise.push(this.populateNameOfFeedstuff(feedstuffs[i], username));
        }
        return Promise.all(listOfPromise).then((feedstuffsResult: DomainFeedstuff[]) => {
            return feedstuffsResult;
        });
    }

    public listFeedstuffForUser(username: string): Promise<DomainFeedstuff[]> {
        return this.feedstuffRepository.listFeedstuffsByUsername(username);
    }

    public createUserFeedstuff(username: string, name: string, description: string): Promise<DomainFeedstuff> {
        let id = uuid.v4();
        return this.feedstuffRepository.insertUserFeedstuff(username, id, name, description).then((insertUserFeedstuff: Boolean) => {
            return Promise.resolve(new DomainFeedstuff(id, name, null, null, null));
        });
    }

    public findFeedstuff(feedstuffId: string, username: string): Promise<DomainFeedstuff> {
        return this.feedstuffRepository.findFeedstuffByFeedstuffId(feedstuffId, username);
    }

    private populateElementsOfFeedstuff(feedstuff: DomainFeedstuff): Promise<DomainFeedstuff> {
        return this.feedstuffRepository.listElementsByFeedstuffId(feedstuff.id).then((elements: DomainFeedstuffMeasurement[]) => {
            feedstuff.elements = elements;
            return feedstuff;
        });
    }

    private populateNameOfFeedstuff(feedstuff: DomainFeedstuff, username: string): Promise<DomainFeedstuff> {
        return this.feedstuffRepository.findFeedstuffByFeedstuffId(feedstuff.id, username).then((result: DomainFeedstuff) => {
            feedstuff.name = result.name;
            return feedstuff;
        });
    }
}

