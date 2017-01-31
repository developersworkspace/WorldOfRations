import * as sql from 'mssql';
import { Formulation } from './../../models/formulation';
import { Feedstuff } from './../../models/feedstuff';
import { Formula } from './../../models/formula';
import { Element } from './../../models/element';
import * as winston from 'winston';

export class FeedstuffRepository {

    constructor(private config: any) {
    }

    public listFeedstuffs() {
        return new Promise((resolve: Function, reject: Function) => {
            winston.profile('FeedstuffRepository.listFeedstuffs');
            new sql.Connection(this.config)
                .connect().then((connection: sql.Connection) => {
                    new sql.Request(connection)
                        .execute('[dbo].[listFeedstuffs]').then((listFeedstuffRecordSet: any[]) => {
                            resolve(listFeedstuffRecordSet[0]);
                            winston.profile('FeedstuffRepository.listFeedstuffs');
                        }).catch(function (err: Error) {
                            reject(err);
                            winston.profile('FeedstuffRepository.listFeedstuffs');
                        });
                });
        });
    }

    public listExampleFeedstuffs() {
        return new Promise((resolve: Function, reject: Function) => {
            winston.profile('FeedstuffRepository.listExampleFeedstuffs');
            new sql.Connection(this.config)
                .connect().then((connection: sql.Connection) => {
                    new sql.Request(connection)
                        .execute('[dbo].[listExampleFeedstuffs]').then((listExampleFeedstuffsRecordSet: any[]) => {
                            resolve(listExampleFeedstuffsRecordSet[0]);
                            winston.profile('FeedstuffRepository.listExampleFeedstuffs');
                        }).catch(function (err: Error) {
                            reject(err);
                            winston.profile('FeedstuffRepository.listExampleFeedstuffs');
                        });
                });
        });
    }

    public getSuggestedValues(formulaId: string, feedstuffId: string) {
        return new Promise((resolve: Function, reject: Function) => {
            winston.profile('FeedstuffRepository.getSuggestedValues');
            new sql.Connection(this.config)
                .connect().then((connection: sql.Connection) => {
                    new sql.Request(connection)
                        .input('formulaId', sql.UNIQUEIDENTIFIER, formulaId)
                        .input('feedstuffId', sql.UNIQUEIDENTIFIER, feedstuffId)
                        .execute('[dbo].[getSuggestedValues]').then((getSuggestedValuesRecordSet: any[]) => {
                            resolve(getSuggestedValuesRecordSet[0]);
                            winston.profile('FeedstuffRepository.getSuggestedValues');
                        }).catch(function (err: Error) {
                            reject(err);
                            winston.profile('FeedstuffRepository.getSuggestedValues');
                        });
                });
        });
    }

    public loadElementsForFeedstuffs(feedstuffs: Feedstuff[]) {
        let parent = this;
        return new Promise((resolve: Function, reject: Function) => {
            winston.profile('FeedstuffRepository.loadElementsForFeedstuffs');
            new sql.Connection(this.config)
                .connect().then((connection: sql.Connection) => {
                    let listOfPromise = [];
                    for (let i = 0; i < feedstuffs.length; i++) {
                        listOfPromise.push(parent.loadElementsForFeedstuff(connection, feedstuffs[i]));
                    }
                    Promise.all(listOfPromise).then((feedstuffsResult: Feedstuff[]) => {
                        resolve(feedstuffsResult);
                        winston.profile('FeedstuffRepository.loadElementsForFeedstuffs');
                    });
                });
        });
    }

    public loadSupplementFeedstuffsForFormulation(formulation: Formulation) {
        let parent = this;
        return new Promise((resolve: Function, reject: Function) => {
            winston.profile('FeedstuffRepository.loadSupplementFeedstuffsForFormulation');
            new sql.Connection(this.config)
                .connect().then((connection: sql.Connection) => {

                    let supplementElements: Element[] = formulation.composition.filter((x) => x.value < x.minimum);
                    formulation.supplementComposition = [];

                    let listOfPromise = [];

                    for (let i = 0; i < supplementElements.length; i++) {
                        listOfPromise.push(parent.loadSupplementFeedstuffForElement(connection, supplementElements[i]));
                    }

                    Promise.all(listOfPromise).then((elementsResult: Element[]) => {
                        formulation.supplementComposition = elementsResult;
                        resolve(formulation);
                        winston.profile('FeedstuffRepository.loadSupplementFeedstuffsForFormulation');
                    }).catch((err: Error) => {
                        reject(err);
                        winston.profile('FeedstuffRepository.loadSupplementFeedstuffsForFormulation');
                    });
                });
        });
    }

    private loadSupplementFeedstuffForElement(connection: sql.Connection, element: Element) {
        return new Promise((resolve: Function, reject: Function) => {
            winston.profile('FeedstuffRepository.loadSupplementFeedstuffForElement');
            new sql.Request(connection)
                .input('elementId', element.id)
                .input('supplementValueRequired', (element.minimum * 1000) - (element.value * 1000))
                .execute('[dbo].[getSupplementValues]').then((getSupplementValuesRecordSet: any[]) => {
                    element.supplementFeedstuffs = getSupplementValuesRecordSet[0].length == 0 ? [] : getSupplementValuesRecordSet[0];
                    element.selectedSupplementFeedstuff = element.supplementFeedstuffs.length == 0 ? [] : [element.supplementFeedstuffs[0]];
                    resolve(element);
                    winston.profile('FeedstuffRepository.loadSupplementFeedstuffForElement');
                }).catch((err: Error) => {
                    reject(err);
                    winston.profile('FeedstuffRepository.loadSupplementFeedstuffForElement');
                });
        });
    }


    private loadElementsForFeedstuff(connection: sql.Connection, feedstuff: Feedstuff) {
        return new Promise((resolve: Function, reject: Function) => {
            winston.profile('FeedstuffRepository.loadElementsForFeedstuff');
            new sql.Request(connection)
                .input('feedstuffId', feedstuff.id)
                .execute('[dbo].[listElementsForFeedstuff]').then((listElementsForFeedstuffRecordSet: any[]) => {
                    feedstuff.elements = listElementsForFeedstuffRecordSet[0];
                    new sql.Request(connection)
                        .input('feedstuffId', feedstuff.id)
                        .execute('[dbo].[getFeedstuff]').then((getFeedstuffRecordSet: any[]) => {
                            feedstuff.name = getFeedstuffRecordSet[0][0].name;
                            resolve(feedstuff);
                            winston.profile('FeedstuffRepository.loadElementsForFeedstuff');
                        }).catch((err: Error) => {
                            reject(err);
                            winston.profile('FeedstuffRepository.loadElementsForFeedstuff');
                        });

                }).catch((err: Error) => {
                    reject(err);
                    winston.profile('FeedstuffRepository.loadElementsForFeedstuff');
                });
        });
    }

}