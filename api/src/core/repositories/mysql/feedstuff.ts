// Imports
import { Base } from './base';
import * as util from 'util';
import { winston } from './../../logger';

// Imports domain models
import { Formulation } from './../../models/formulation';
import { Feedstuff } from './../../models/feedstuff';
import { Formula } from './../../models/formula';
import { Element } from './../../models/element';

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


    public loadSupplementFeedstuffsForFormulation(formulation: Formulation) {
        let parent = this;
        return new Promise((resolve: Function, reject: Function) => {
            let supplementElements: Element[] = formulation.composition.filter((x) => x.value < x.minimum);
            formulation.supplementComposition = [];

            let listOfPromise = [];

            for (let i = 0; i < supplementElements.length; i++) {
                listOfPromise.push(parent.loadSupplementFeedstuffForElement(supplementElements[i]));
            }

            Promise.all(listOfPromise).then((elementsResult: Element[]) => {
                formulation.supplementComposition = elementsResult;
                resolve(formulation);
            });
        });
    }

    public listElementsForFeedstuff(feedstuffId: string): Promise<Element[]> {
        return this.query(util.format('CALL listElementsForFeedstuff(%s)', this.escapeAndFormat(feedstuffId)))
            .then((listElementsForFeedstuffRecordSet: DataFeedstuffMeasurement[]) => {
                return listElementsForFeedstuffRecordSet.map(x => new DataFeedstuffMeasurement(x.id, x.name, x.unit, x.sortOrder, x.value).toDomainModel());
            });
    }

    private loadSupplementFeedstuffForElement(element: Element) {
        return this.query(util.format('CALL getSupplementValues(%s, %s);', this.escapeAndFormat(element.id), (element.minimum * 1000) - (element.value * 1000)))
            .then((getSupplementValuesRecordSet: any[]) => {
                element.supplementFeedstuffs = getSupplementValuesRecordSet.length == 0 ? [] : getSupplementValuesRecordSet;
                element.selectedSupplementFeedstuff = element.supplementFeedstuffs.length == 0 ? [] : [element.supplementFeedstuffs[0]];
                return element;
            });
    }

    
}