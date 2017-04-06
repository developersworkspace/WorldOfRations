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

    private feedstuffs = [
        new DomainFeedstuff('1', 'Feedstuff1', null, null, null),
        new DomainFeedstuff('2', 'Feedstuff2', null, null, null),
        new DomainFeedstuff('3', 'Feedstuff3', null, null, null),
        new DomainFeedstuff('4', 'Feedstuff4', null, null, null),
    ];

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
        if (username == null) {
            return Promise.resolve(this.feedstuffs);
        } else {
            return Promise.resolve(this.feedstuffs.concat(this.userFeedstuffs[username]));
        }
    }

    public listExampleFeedstuffs(): Promise<DomainFeedstuff[]> {
        return Promise.resolve(this.exampleFeedstuffs);
    }

    public findFeedstuffByFeedstuffId(feedstuffId: string): Promise<DomainFeedstuff> {

        const result = this.feedstuffs.find((x) => x.id === feedstuffId);
        return Promise.resolve(result === undefined ? null : result);
    }

    public findUserFeedstuffByFeedstuffId(feedstuffId: string, username: string): Promise<DomainFeedstuff> {
        if (username == null) {
            return Promise.resolve(null);
        }

        const result = this.userFeedstuffs[username].find((x) => x.id === feedstuffId);
        return Promise.resolve(result === undefined ? null : result);
    }

    public findSuggestedValuesByFormulaIdAndFeedstuffId(formulaId: string, feedstuffId: string): Promise<DomainSuggestedValue> {
        return Promise.resolve(new DomainSuggestedValue(0, 1000));
    }

    public listElementsByFeedstuffId(feedstuffId: string): Promise<DomainFeedstuffMeasurement[]> {
        return Promise.resolve(this.feedstuffMeasurements[feedstuffId]);
    }

    public listSupplementFeedstuffByElementId(element: DomainCompositionElement): Promise<DomainSupplementElement> {
        const supplementElement = new DomainSupplementElement(element.id, element.name, element.unit, element.sortOrder);

        supplementElement.supplementFeedstuffs = [
            new DomainSupplementFeedstuff('1', 'Feedstuff1', 10),
        ];

        supplementElement.selectedSupplementFeedstuffs = supplementElement.supplementFeedstuffs.length === 0 ? [] : [supplementElement.supplementFeedstuffs[0]];
        return Promise.resolve(supplementElement);
    }

    public listElementsByUserFeedstuffId(feedstuffId: string): Promise<DomainFeedstuffMeasurement[]> {
        return Promise.resolve(this.feedstuffMeasurements[feedstuffId]);
    }

    public listFeedstuffsByUsername(username: string): Promise<DomainFeedstuff[]> {
        if (username === null) {
            return Promise.resolve([]);
        } else {
            return Promise.resolve(this.userFeedstuffs[username]);
        }
    }

    public insertUserFeedstuff(username: string, id: string, name: string, description: string): Promise<boolean> {
        this.userFeedstuffs[username].push(new DomainFeedstuff(id, name, null, null, null));
        return Promise.resolve(true);
    }

    public insertUserFeedstuffMeasurement(feedstuffId: string, elementId: string, value: number): Promise<boolean> {
        this.feedstuffMeasurements[feedstuffId].push(new DomainFeedstuffMeasurement(elementId, 'Element' + elementId, value, '%', 1));
        return Promise.resolve(true);
    }

    public updateUserFeedstuffMeasurement(feedstuffId: string, elementId: string, value: number): Promise<boolean> {
        this.feedstuffMeasurements[feedstuffId].find((x) => x.id === elementId).value = value;
        return Promise.resolve(true);
    }
}
