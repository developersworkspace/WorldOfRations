import { Formulation } from './../../models/formulation';
import { Feedstuff } from './../../models/feedstuff';
import { Formula } from './../../models/formula';
import { Element } from './../../models/element';
import { Base } from './base';
import * as util from 'util';

export class FeedstuffRepository extends Base {

    constructor(config: any) {
        super(config);
    }

    public listFeedstuffs() {
        return this.query(null, 'Call listFeedstuffs();');
    }

    public listExampleFeedstuffs() {
        return this.query(null, 'Call listExampleFeedstuffs();');
    }

    public getSuggestedValues(formulaId: string, feedstuffId: string) {
        return this.query(null, util.format('Call getSuggestedValues(%s, %s);', this.escapeAndFormat(formulaId), this.escapeAndFormat(feedstuffId)));
    }

    public loadElementsForFeedstuffs(feedstuffs: Feedstuff[]) {
        let parent = this;
        return new Promise((resolve: Function, reject: Function) => {
            let connection = this.getConnection();
            let listOfPromise = [];
            for (let i = 0; i < feedstuffs.length; i++) {
                listOfPromise.push(parent.loadElementsForFeedstuff(connection, feedstuffs[i]));
            }
            Promise.all(listOfPromise).then((feedstuffsResult: Feedstuff[]) => {
                resolve(feedstuffsResult);
                connection.close();
            });

        });
    }

    public loadSupplementFeedstuffsForFormulation(formulation: Formulation) {
        let parent = this;
        return new Promise((resolve: Function, reject: Function) => {
            let connection = this.getConnection();

            let supplementElements: Element[] = formulation.composition.filter((x) => x.value < x.minimum);
            formulation.supplementComposition = [];

            let listOfPromise = [];

            for (let i = 0; i < supplementElements.length; i++) {
                listOfPromise.push(parent.loadSupplementFeedstuffForElement(connection, supplementElements[i]));
            }

            Promise.all(listOfPromise).then((elementsResult: Element[]) => {
                formulation.supplementComposition = elementsResult;
                resolve(formulation);
                connection.close();
            }).catch((err: Error) => {
                reject(err);
                connection.close();
            });

        });
    }

    private loadSupplementFeedstuffForElement(connection: any, element: Element) {
        return new Promise((resolve: Function, reject: Function) => {
            this.query(connection, util.format('Call getSupplementValues(%s, %s);', this.escapeAndFormat(element.id), (element.minimum * 1000) - (element.value * 1000)))
                .then((getSupplementValuesRecordSet: any[]) => {
                    element.supplementFeedstuffs = getSupplementValuesRecordSet.length == 0 ? [] : getSupplementValuesRecordSet;
                    element.selectedSupplementFeedstuff = element.supplementFeedstuffs.length == 0 ? [] : [element.supplementFeedstuffs[0]];
                    resolve(element);
                }).catch((err: Error) => {
                    reject(err);
                });
        });
    }


    private loadElementsForFeedstuff(connection: any, feedstuff: Feedstuff) {
        return new Promise((resolve: Function, reject: Function) => {
            let connection = this.getConnection();
        this.query(connection, util.format('CALL listElementsForFeedstuff(%s)', this.escapeAndFormat(feedstuff.id)))
                .then((listElementsForFeedstuffRecordSet: any[]) => {
                    feedstuff.elements = listElementsForFeedstuffRecordSet;
                    this.query(connection, util.format('CALL getFeedstuff(%s)', this.escapeAndFormat(feedstuff.id)))
                        .then((getFeedstuffRecordSet: any[]) => {
                            feedstuff.name = getFeedstuffRecordSet[0].name;
                            resolve(feedstuff);
                        }).catch((err: Error) => {
                            reject(err);
                        });

                }).catch((err: Error) => {
                    reject(err);
                });
        });
    }
}