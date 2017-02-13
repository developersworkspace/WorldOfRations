// Imports
import { Base } from './base';
import * as util from 'util';
import { winston } from './../../logger';

// Import models
import { Formulation } from './../../models/formulation';
import { Feedstuff } from './../../models/feedstuff';
import { Formula } from './../../models/formula';
import { Element } from './../../models/element';

export class FeedstuffRepository extends Base {

    constructor(config: any) {
        super(config);
    }

    public listFeedstuffs() {
        return this.query('CALL listFeedstuffs();');
    }

    public listExampleFeedstuffs() {
        return this.query('CALL listExampleFeedstuffs();');
    }

    public getSuggestedValues(formulaId: string, feedstuffId: string) {
        return this.query(util.format('CALL getSuggestedValues(%s, %s);', this.escapeAndFormat(formulaId), this.escapeAndFormat(feedstuffId)));
    }

    public loadElementsForFeedstuffs(feedstuffs: Feedstuff[]) {
        let parent = this;
        return new Promise((resolve: Function, reject: Function) => {
            let listOfPromise = [];
            for (let i = 0; i < feedstuffs.length; i++) {
                listOfPromise.push(parent.loadElementsForFeedstuff(feedstuffs[i]));
            }
            Promise.all(listOfPromise).then((feedstuffsResult: Feedstuff[]) => {
                resolve(feedstuffsResult);
            });
        });
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

    private loadSupplementFeedstuffForElement(element: Element) {
        return this.query(util.format('CALL getSupplementValues(%s, %s);', this.escapeAndFormat(element.id), (element.minimum * 1000) - (element.value * 1000)))
            .then((getSupplementValuesRecordSet: any[]) => {
                element.supplementFeedstuffs = getSupplementValuesRecordSet.length == 0 ? [] : getSupplementValuesRecordSet;
                element.selectedSupplementFeedstuff = element.supplementFeedstuffs.length == 0 ? [] : [element.supplementFeedstuffs[0]];
                return element;
            });
    }

    private loadElementsForFeedstuff(feedstuff: Feedstuff) {
        return this.query(util.format('CALL listElementsForFeedstuff(%s)', this.escapeAndFormat(feedstuff.id)))
            .then((listElementsForFeedstuffRecordSet: any[]) => {
                feedstuff.elements = listElementsForFeedstuffRecordSet;
                return this.query(util.format('CALL getFeedstuff(%s)', this.escapeAndFormat(feedstuff.id)))
                    .then((getFeedstuffRecordSet: any[]) => {
                        feedstuff.name = getFeedstuffRecordSet[0].name;
                        return feedstuff;
                    });
            });
    }

    public listElementsForFeedstuff(feedstuffId: string) {
        return this.query(util.format('CALL listElementsForFeedstuff(%s)', this.escapeAndFormat(feedstuffId)))
            .then((listElementsForFeedstuffRecordSet: any[]) => {
                return listElementsForFeedstuffRecordSet;
            });
    }
}