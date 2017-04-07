// Imports
import { IFeedstuffRepository } from './../feedstuff';

// Imports domain models
import { CompositionElement as DomainCompositionElement } from './../../models/composition-element';
import { Feedstuff as DomainFeedstuff } from './../../models/feedstuff';
import { FeedstuffMeasurement as DomainFeedstuffMeasurement } from './../../models/feedstuff-measurement';
import { SuggestedValue as DomainSuggestedValue } from './../../models/suggested-value';
import { SupplementElement as DomainSupplementElement } from './../../models/supplement-element';
import { SupplementFeedstuff as DomainSupplementFeedstuff } from './../../models/supplement-feedstuff';

// Imports data models
import { ExampleFeedstuff as DataExampleFeedstuff } from './../../data-models/example-feedstuff';
import { Feedstuff as DataFeedstuff } from './../../data-models/feedstuff';
import { FeedstuffMeasurement as DataFeedstuffMeasurement } from './../../data-models/feedstuff-measurement';
import { SuggestedValue as DataSuggestedValue } from './../../data-models/suggested-value';
import { SupplementFeedstuff as DataSupplementFeedstuff } from './../../data-models/supplement-feedstuff';

export class MockFeedstuffRepository implements IFeedstuffRepository {

    private exampleFeedstuffs = [
        new DomainFeedstuff('1', 'Feedstuff1', 50, 1000, 600),
        new DomainFeedstuff('2', 'Feedstuff2', 200, 800, 300),
        new DomainFeedstuff('3', 'Feedstuff3', 100, 700, 400),
    ];

    private userFeedstuffs = {
        ValidUsername: [
            new DomainFeedstuff('5', 'Feedstuff5', null, null, null),
            new DomainFeedstuff('6', 'Feedstuff6', null, null, null),
            new DomainFeedstuff('7', 'Feedstuff7', null, null, null),
            new DomainFeedstuff('8', 'Feedstuff8', null, null, null),
        ],
    };

    private feedstuffMeasurements = {
        1: [
            new DomainFeedstuffMeasurement('1', 'Element1', 5, '%', 1),
        ],
        2: [
            new DomainFeedstuffMeasurement('1', 'Element1', 5, '%', 1),
        ],
        3: [
            new DomainFeedstuffMeasurement('1', 'Element1', 5, '%', 1),
        ],
        4: [
            new DomainFeedstuffMeasurement('1', 'Element1', 5, '%', 1),
        ],
        5: [
            new DomainFeedstuffMeasurement('1', 'Element1', 5, '%', 1),
        ],
        6: [
            new DomainFeedstuffMeasurement('1', 'Element1', 5, '%', 1),
        ],
        7: [
            new DomainFeedstuffMeasurement('1', 'Element1', 5, '%', 1),
        ],
        8: [],
    };

    constructor(private config: any) {

    }

    public listFeedstuffs(username: string): Promise<DomainFeedstuff[]> {
        return Promise.resolve([]);
    }

    public listExampleFeedstuffs(): Promise<DomainFeedstuff[]> {
        return Promise.resolve([]);
    }

    public findFeedstuffByFeedstuffId(feedstuffId: string): Promise<DomainFeedstuff> {
        return Promise.resolve(null);
    }

    public findUserFeedstuffByFeedstuffId(feedstuffId: string, username: string): Promise<DomainFeedstuff> {
         return Promise.resolve(null);
    }

    public findSuggestedValuesByFormulaIdAndFeedstuffId(formulaId: string, feedstuffId: string): Promise<DomainSuggestedValue> {
        return Promise.resolve(null);
    }

    public listElementsByFeedstuffId(feedstuffId: string): Promise<DomainFeedstuffMeasurement[]> {
         return Promise.resolve([]);
    }

    public listSupplementFeedstuffByElementId(element: DomainCompositionElement): Promise<DomainSupplementElement> {
         return Promise.resolve(null);
    }

    public listElementsByUserFeedstuffId(feedstuffId: string): Promise<DomainFeedstuffMeasurement[]> {
         return Promise.resolve([]);
    }

    public listFeedstuffsByUsername(username: string): Promise<DomainFeedstuff[]> {
         return Promise.resolve([]);
    }

    public insertUserFeedstuff(username: string, id: string, name: string, description: string): Promise<boolean> {
        return Promise.resolve(true);
    }

    public insertUserFeedstuffMeasurement(feedstuffId: string, elementId: string, value: number): Promise<boolean> {
        return Promise.resolve(true);
    }

    public updateUserFeedstuffMeasurement(feedstuffId: string, elementId: string, value: number): Promise<boolean> {
        return Promise.resolve(true);
    }
}
