// Imports
import { IFeedstuffRepository } from './../feedstuff';

// Imports domain models
import { FeedstuffMeasurement as DomainFeedstuffMeasurement } from './../../models/feedstuff-measurement';
import { CompositionElement as DomainCompositionElement } from './../../models/composition-element';
import { SupplementElement as DomainSupplementElement } from './../../models/supplement-element';
import { Feedstuff as DomainFeedstuff } from './../../models/feedstuff';
import { SupplementFeedstuff as DomainSupplementFeedstuff } from './../../models/supplement-feedstuff';
import { SuggestedValue as DomainSuggestedValue } from './../../models/suggested-value';

// Imports data models
import { FeedstuffMeasurement as DataFeedstuffMeasurement } from './../../data-models/feedstuff-measurement';
import { Feedstuff as DataFeedstuff } from './../../data-models/feedstuff';
import { ExampleFeedstuff as DataExampleFeedstuff } from './../../data-models/example-feedstuff';
import { SupplementFeedstuff as DataSupplementFeedstuff } from './../../data-models/supplement-feedstuff';
import { SuggestedValue as DataSuggestedValue } from './../../data-models/suggested-value';

export class MockFeedstuffRepository implements IFeedstuffRepository {

    private feedstuffs = [
        new DomainFeedstuff('1', 'Feedstuff1', null, null, null),
        new DomainFeedstuff('2', 'Feedstuff2', null, null, null),
        new DomainFeedstuff('3', 'Feedstuff3', null, null, null),
        new DomainFeedstuff('4', 'Feedstuff4', null, null, null)
    ];

    private exampleFeedstuffs = [
        new DomainFeedstuff('1', 'Feedstuff1', 50, 1000, 600),
        new DomainFeedstuff('2', 'Feedstuff2', 200, 800, 300),
        new DomainFeedstuff('3', 'Feedstuff3', 100, 700, 400)
    ];

    private feedstuffMeasurements = {
        '1': [
            new DomainFeedstuffMeasurement('1', 'Element1', 5, '%', 1)
        ]
    }

    constructor(config: any) {

    }

    public listFeedstuffs(username: string): Promise<DomainFeedstuff[]> {
        return Promise.resolve(this.feedstuffs);
    }

    public listExampleFeedstuffs(): Promise<DomainFeedstuff[]> {
        return Promise.resolve(this.exampleFeedstuffs);
    }

    public findFeedstuffByFeedstuffId(feedstuffId: string, username: string): Promise<DomainFeedstuff> {
        return Promise.resolve(this.feedstuffs.find(x => x.id == feedstuffId));
    }

    public findSuggestedValuesByFormulaIdAndFeedstuffId(formulaId: string, feedstuffId: string): Promise<DomainSuggestedValue> {
        return Promise.resolve(new DomainSuggestedValue(0, 1000));
    }

    public listElementsByFeedstuffId(feedstuffId: string): Promise<DomainFeedstuffMeasurement[]> {
        return Promise.resolve(this.feedstuffMeasurements[feedstuffId]);
    }

    public listSupplementFeedstuffByElementId(element: DomainCompositionElement): Promise<DomainSupplementElement> {
        let supplementElement = new DomainSupplementElement(element.id, element.name, element.unit, element.sortOrder);

        supplementElement.supplementFeedstuffs = [
            new DomainSupplementFeedstuff('1', 'Feedstuff1', 10)
        ];

        supplementElement.selectedSupplementFeedstuffs = supplementElement.supplementFeedstuffs.length == 0 ? [] : [supplementElement.supplementFeedstuffs[0]];
        return Promise.resolve(supplementElement);
    }

    public listElementsByUserFeedstuffId(feedstuffId: string): Promise<DomainFeedstuffMeasurement[]> {
        return Promise.resolve(this.feedstuffMeasurements[feedstuffId]);
    }

    public listFeedstuffsByUsername(username: string): Promise<DomainFeedstuff[]> {
        return Promise.resolve(this.exampleFeedstuffs);
    }

    public insertUserFeedstuff(username: string, id: string, name: string, description: string): Promise<Boolean> {
        return Promise.resolve(true);
    }

    public insertUserFeedstuffMeasurement(feedstuffId: string, elementId: string, value: number): Promise<Boolean> {
        return Promise.resolve(true);
    }

    public updateUserFeedstuffMeasurement(feedstuffId: string, elementId: string, value: number): Promise<Boolean> {
        return Promise.resolve(true);
    }
}