// Imports
import * as uuid from 'uuid';
import * as co from 'co';
import { IFeedstuffRepository } from './../repositories/feedstuff';
import { IElementRepository } from './../repositories/element';


// Imports domain models
import { FeedstuffMeasurement as DomainFeedstuffMeasurement } from './../models/feedstuff-measurement';
import { Element as DomainElement } from './../models/element';
import { Feedstuff as DomainFeedstuff } from './../models/feedstuff';
import { SuggestedValue as DomainSuggestedValue } from './../models/suggested-value';

export class FeedstuffService {

    constructor(private feedstuffRepository: IFeedstuffRepository, private elementRepository: IElementRepository) {
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

    public findUserFeedstuff(feedstuffId: string, username: string): Promise<DomainFeedstuff> {
        return this.feedstuffRepository.findUserFeedstuffByFeedstuffId(feedstuffId, username);
    }

    public saveUserFeedstuffMeasurements(feedstuffId: string, measurements: DomainFeedstuffMeasurement[]): Promise<Boolean> {
        let self = this;

        return co(function* () {

            let listElementsByUserFeedstuffIdResult: DomainFeedstuffMeasurement[] = yield self.feedstuffRepository.listElementsByUserFeedstuffId(feedstuffId);

            let tasksInsert = measurements.filter(x => listElementsByUserFeedstuffIdResult.find(y => y.id == x.id) == undefined).map(x => self.feedstuffRepository.insertUserFeedstuffMeasurement(feedstuffId, x.id, x.value));

            let tasksUpdate = measurements.filter(x => listElementsByUserFeedstuffIdResult.find(y => y.id == x.id) != undefined).map(x => self.feedstuffRepository.updateUserFeedstuffMeasurement(feedstuffId, x.id, x.value));

            let results: any[] = yield [tasksInsert, tasksUpdate];

            return true;
        });
    }

    public listUserFeedstuffMeasurements(feedstuffId: string): Promise<DomainFeedstuffMeasurement[]> {
        let self = this;

        return co(function* () {
            let listElementsByUserFeedstuffIdResult: DomainFeedstuffMeasurement[] = yield self.feedstuffRepository.listElementsByUserFeedstuffId(feedstuffId);

            if (listElementsByUserFeedstuffIdResult.length == 0) {
                let listElementsResult: DomainElement[] = yield self.elementRepository.listElements();
                return listElementsResult.map(x => new DomainFeedstuffMeasurement(x.id, x.name, x.value, x.unit, x.sortOrder));
            }

            return listElementsByUserFeedstuffIdResult;
        });

    }

    private populateElementsOfFeedstuff(feedstuff: DomainFeedstuff): Promise<DomainFeedstuff> {
        let self = this;

        return co(function* () {
            let listElementsByFeedstuffIdResult: DomainFeedstuffMeasurement[] = yield self.feedstuffRepository.listElementsByFeedstuffId(feedstuff.id);

            let listElementsByUserFeedstuffIdResult: DomainFeedstuffMeasurement[] = yield self.feedstuffRepository.listElementsByUserFeedstuffId(feedstuff.id);

      
            if (listElementsByFeedstuffIdResult != null && listElementsByFeedstuffIdResult.length != 0) {
                feedstuff.elements = listElementsByFeedstuffIdResult;
            }

            if (listElementsByUserFeedstuffIdResult != null && listElementsByUserFeedstuffIdResult.length != 0) {
                feedstuff.elements = listElementsByUserFeedstuffIdResult;
            }

            return feedstuff;
        });
    }

    private populateNameOfFeedstuff(feedstuff: DomainFeedstuff, username: string): Promise<DomainFeedstuff> {
        let self = this;

        return co(function* () {
            let findFeedstuffByFeedstuffIdResult: DomainFeedstuff = yield self.feedstuffRepository.findFeedstuffByFeedstuffId(feedstuff.id);

            let findUserFeedstuffByFeedstuffIdResult: DomainFeedstuff = yield self.feedstuffRepository.findUserFeedstuffByFeedstuffId(feedstuff.id, username);

            if (findFeedstuffByFeedstuffIdResult != null) {
                feedstuff.name = findFeedstuffByFeedstuffIdResult.name;
            }

            if (findUserFeedstuffByFeedstuffIdResult != null) {
                feedstuff.name = findUserFeedstuffByFeedstuffIdResult.name;
            }

            return feedstuff;
        });
    }
}

