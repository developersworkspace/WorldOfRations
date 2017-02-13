// Imports
import { Base } from './base';
import * as util from 'util';
import { winston } from './../../logger';

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

export class FeedstuffRepository extends Base {

    constructor(config: any) {
        super(config);
    }

    public listFeedstuffs(): Promise<DomainFeedstuff[]> {
        return this.query('CALL listFeedstuffs();').then((result: DataFeedstuff[]) => {
            return result.map(x => new DomainFeedstuff(x.id, x.name, null, null, null));
        });
    }

    public listExampleFeedstuffs(): Promise<DomainFeedstuff[]> {
        return this.query('CALL listExampleFeedstuffs();').then((result: DataExampleFeedstuff[]) => {
            return result.map(x => new DomainFeedstuff(x.id, x.name, x.minimum, x.maximum, x.cost));
        });
    }

    public getSuggestedValues(formulaId: string, feedstuffId: string): Promise<DomainSuggestedValue[]> {
        return this.query(util.format('CALL getSuggestedValues(%s, %s);', this.escapeAndFormat(formulaId), this.escapeAndFormat(feedstuffId))).then((result: DataSuggestedValue[]) => {
            return result.map(x => new DomainSuggestedValue(x.minimum, x.maximum));
        });
    }

    public listElementsForFeedstuff(feedstuffId: string): Promise<DomainFeedstuffMeasurement[]> {
        return this.query(util.format('CALL listElementsForFeedstuff(%s)', this.escapeAndFormat(feedstuffId)))
            .then((listElementsForFeedstuffRecordSet: DataFeedstuffMeasurement[]) => {
                return listElementsForFeedstuffRecordSet.map(x => new DomainFeedstuffMeasurement(x.id, x.name, x.value, x.unit, x.sortOrder));
            });
    }

    public listSupplementFeedstuffForElement(element: DomainCompositionElement): Promise<DomainSupplementElement[]> {
        return this.query(util.format('CALL getSupplementValues(%s, %s);', this.escapeAndFormat(element.id), (element.minimum * 1000) - (element.value * 1000)))
            .then((getSupplementValuesRecordSet: DataSupplementFeedstuff[]) => {
                let supplementElement = new DomainSupplementElement(element.id, element.name, element.unit, element.sortOrder);
                
                supplementElement.supplementFeedstuffs = getSupplementValuesRecordSet.map(x => new DomainSupplementFeedstuff(x.id, x.name, x.weight));
                supplementElement.selectedSupplementFeedstuff = supplementElement.supplementFeedstuffs.length == 0 ? [] : [supplementElement.supplementFeedstuffs[0]];
                return supplementElement;
            });
    }    
}