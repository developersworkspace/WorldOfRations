// Imports
import { Base } from './base';
import * as util from 'util';
import { winston } from './../../logger';

// Imports models
import { Formulation } from './../../models/formulation';
import { Feedstuff } from './../../models/feedstuff';
import { Formula } from './../../models/formula';
import { Element } from './../../models/element';

// Imports domain models
import { FeedstuffMeasurement as DomainFeedstuffMeasurement } from './../../models/feedstuff-measurement';
import { CompositionElement as DomainCompositionElement } from './../../models/composition-element';
import { SupplementElement as DomainSupplementElement } from './../../models/supplement-element';

// Imports data models
import { FeedstuffMeasurement as DataFeedstuffMeasurement } from './../../data-models/feedstuff-measurement';

export class FeedstuffRepository extends Base {

    constructor(config: any) {
        super(config);
    }

    public listFeedstuffs(): Promise<Feedstuff[]> {
        return this.query('CALL listFeedstuffs();');
    }

    public listExampleFeedstuffs(): Promise<Feedstuff[]> {
        return this.query('CALL listExampleFeedstuffs();');
    }

    public getSuggestedValues(formulaId: string, feedstuffId: string) {
        return this.query(util.format('CALL getSuggestedValues(%s, %s);', this.escapeAndFormat(formulaId), this.escapeAndFormat(feedstuffId)));
    }

    public listElementsForFeedstuff(feedstuffId: string): Promise<DomainFeedstuffMeasurement[]> {
        return this.query(util.format('CALL listElementsForFeedstuff(%s)', this.escapeAndFormat(feedstuffId)))
            .then((listElementsForFeedstuffRecordSet: DataFeedstuffMeasurement[]) => {
                return listElementsForFeedstuffRecordSet.map(x => new DataFeedstuffMeasurement(x.id, x.name, x.unit, x.sortOrder, x.value).toDomainModel());
            });
    }

    public listSupplementFeedstuffForElement(element: DomainCompositionElement): Promise<DomainSupplementElement[]> {
        return this.query(util.format('CALL getSupplementValues(%s, %s);', this.escapeAndFormat(element.id), (element.minimum * 1000) - (element.value * 1000)))
            .then((getSupplementValuesRecordSet: any[]) => {
                let supplementElement = new DomainSupplementElement(element.id, element.name, element.unit, element.sortOrder);

                supplementElement.supplementFeedstuffs = getSupplementValuesRecordSet.length == 0 ? [] : getSupplementValuesRecordSet;
                supplementElement.selectedSupplementFeedstuff = supplementElement.supplementFeedstuffs.length == 0 ? [] : [supplementElement.supplementFeedstuffs[0]];
                return supplementElement;
            });
    }    
}