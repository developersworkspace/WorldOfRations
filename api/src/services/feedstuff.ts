// Imports
import * as uuid from 'uuid';
import * as co from 'co';
import { IFeedstuffRepository } from './../repositories/feedstuff';

// Imports repositories
import { FeedstuffRepository } from './../repositories/mysql/feedstuff';

// Imports domain models
import { FeedstuffMeasurement as DomainFeedstuffMeasurement } from './../models/feedstuff-measurement';
import { Feedstuff as DomainFeedstuff } from './../models/feedstuff';
import { SuggestedValue as DomainSuggestedValue } from './../models/suggested-value';

export class FeedstuffService {

    constructor(private feedstuffRepository: IFeedstuffRepository) {
    }

    public listFeedstuffs(username: string): Promise<DomainFeedstuff[]> {
        return this.feedstuffRepository.listFeedstuffs(username);
    }

    public listExampleFeedstuffs(): Promise<DomainFeedstuff[]> {
        return this.feedstuffRepository.listExampleFeedstuffs();
    }

    public findSuggestedValues(formulaId: string, feedstuffId: string): Promise<DomainSuggestedValue> {
        return this.feedstuffRepository.findSuggestedValuesByFormulaIdAndFeedstuffId(formulaId, feedstuffId);
    }

    public populateElementsOfFeedstuffs(feedstuffs: DomainFeedstuff[]): Promise<DomainFeedstuff[]> {
        let self = this;

        return co(function* () {

            let listOfPromise = [];
            for (let i = 0; i < feedstuffs.length; i++) {
                listOfPromise.push(self.populateElementsOfFeedstuff(feedstuffs[i]));
            }

            let feedstuffsResult: DomainFeedstuff[] = yield listOfPromise;

            return feedstuffsResult;
        });
    }

    public populateNamesOfFeedstuffs(feedstuffs: DomainFeedstuff[], username: string): Promise<DomainFeedstuff[]> {
        let self = this;

        return co(function* () {

            let listOfPromise = [];
            for (let i = 0; i < feedstuffs.length; i++) {
                listOfPromise.push(self.populateNameOfFeedstuff(feedstuffs[i], username));
            }

            let feedstuffsResult: DomainFeedstuff[] = yield listOfPromise;

            return feedstuffsResult;
        });
    }

    public listUserFeedstuffs(username: string): Promise<DomainFeedstuff[]> {
        return this.feedstuffRepository.listFeedstuffsByUsername(username);
    }

    public createUserFeedstuff(username: string, name: string, description: string): Promise<DomainFeedstuff> {
        let self = this;

        return co(function* () {
            let id = uuid.v4();

            let insertUserFeedstuff: any[] = yield self.feedstuffRepository.insertUserFeedstuff(username, id, name, description);

            return new DomainFeedstuff(id, name, null, null, null)
        });
    }

    // TODO: Return user feedstuff only
    public findUserFeedstuff(feedstuffId: string, username: string): Promise<DomainFeedstuff> {
        return this.feedstuffRepository.findFeedstuffByFeedstuffId(feedstuffId, username);
    }

    public saveUserFeedstuffMeasurements(feedstuffId: string, measurements: DomainFeedstuffMeasurement[]): Promise<Boolean> {
        let self = this;

        return co(function* () {
            let tasks = measurements.map(x => self.feedstuffRepository.insertUserFeedstuffMeasurement(feedstuffId, x.id, x.value));

            let results: any[] = yield tasks;

            return true;
        });
    }

    public listUserFeedstuffMeasurements(feedstuffId: string): Promise<DomainFeedstuffMeasurement[]> {
        return this.feedstuffRepository.listElementsByUserFeedstuffId(feedstuffId);
    }

    private populateElementsOfFeedstuff(feedstuff: DomainFeedstuff): Promise<DomainFeedstuff> {
        let self = this;

        return co(function* () {
            let listElementsByFeedstuffIdResult: DomainFeedstuffMeasurement[] = yield self.feedstuffRepository.listElementsByFeedstuffId(feedstuff.id);

            feedstuff.elements = listElementsByFeedstuffIdResult;
            return feedstuff;
        });
    }

    private populateNameOfFeedstuff(feedstuff: DomainFeedstuff, username: string): Promise<DomainFeedstuff> {
        let self = this;

        return co(function* () {
            let findFeedstuffByFeedstuffIdResult: DomainFeedstuff = yield self.feedstuffRepository.findFeedstuffByFeedstuffId(feedstuff.id, username);

           feedstuff.name = findFeedstuffByFeedstuffIdResult.name;
            return feedstuff;
        });
    }
}

