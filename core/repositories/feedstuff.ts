import * as sql from 'mssql';
import { Formulation } from './../models/formulation';
import { Feedstuff } from './../models/feedstuff';
import { Formula } from './../models/formula';
import { Element } from './../models/element';

export class FeedstuffRepository {

    constructor(private config: any) {

    }

    public listFeedstuffs() {
        return new Promise((resolve: Function, reject: Function) => {
            new sql.Connection(this.config)
                .connect().then((connection: sql.Connection) => {
                    new sql.Request(connection)
                        .execute('[dbo].[listFeedstuffs]').then((listFeedstuffRecordSet: any[]) => {
                            resolve(listFeedstuffRecordSet[0]);
                        }).catch(function (err: Error) {
                            reject(err);
                        });
                });
        });
    }

    public listExampleFeedstuffs() {
        return new Promise((resolve: Function, reject: Function) => {
            new sql.Connection(this.config)
                .connect().then((connection: sql.Connection) => {
                    new sql.Request(connection)
                        .execute('[dbo].[listExampleFeedstuffs]').then((listExampleFeedstuffsRecordSet: any[]) => {
                            resolve(listExampleFeedstuffsRecordSet[0]);
                        }).catch(function (err: Error) {
                            reject(err);
                        });
                });
        });
    }

    public getSuggestedValues(formulaId: string, feedstuffId: string) {
        return new Promise((resolve: Function, reject: Function) => {
            new sql.Connection(this.config)
                .connect().then((connection: sql.Connection) => {
                    new sql.Request(connection)
                        .input('formulaId', sql.UNIQUEIDENTIFIER, formulaId)
                        .input('feedstuffId', sql.UNIQUEIDENTIFIER, feedstuffId)
                        .execute('[dbo].[getSuggestedValues]').then((getSuggestedValuesRecordSet: any[]) => {
                            resolve(getSuggestedValuesRecordSet[0]);
                        }).catch(function (err: Error) {
                            reject(err);
                        });
                });
        });
    }

    public loadElementsForFeedstuffs(feedstuffs: Feedstuff[]) {
        let parent = this;
        return new Promise((resolve: Function, reject: Function) => {
            new sql.Connection(this.config)
                .connect().then((connection: sql.Connection) => {
                    let listOfPromise = [];
                    for (let i = 0; i < feedstuffs.length; i++) {
                        listOfPromise.push(parent.loadElementsForFeedstuff(connection, feedstuffs[i]));
                    }
                    Promise.all(listOfPromise).then((feedstuffsResult: Feedstuff[]) => {
                        resolve(feedstuffsResult);
                    });
                });
        });
    }

    public loadSupplementFeedstuffsForFormulation(formulation: Formulation) {
        let parent = this;
        return new Promise((resolve: Function, reject: Function) => {
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
                    }).catch((err: Error) => {
                        reject(err);
                    });
                });
        });
    }

    private loadSupplementFeedstuffForElement(connection: sql.Connection, element: Element) {
        return new Promise((resolve: Function, reject: Function) => {
            new sql.Request(connection)
                .input('elementId', element.id)
                .input('supplementValueRequired', (element.minimum * 1000) - (element.value * 1000))
                .execute('[dbo].[getSupplementValues]').then((getSupplementValuesRecordSet: any[]) => {
                    element.supplementFeedstuffs = getSupplementValuesRecordSet[0].length == 0 ? [] : getSupplementValuesRecordSet[0];
                    element.selectedSupplementFeedstuff = element.supplementFeedstuffs.length == 0 ? [] : [element.supplementFeedstuffs[0]];
                    resolve(element);
                }).catch((err: Error) => {
                    reject(err);
                });
        });
    }


    private loadElementsForFeedstuff(connection: sql.Connection, feedstuff: Feedstuff) {
        return new Promise((resolve: Function, reject: Function) => {
            new sql.Request(connection)
                .input('feedstuffId', feedstuff.id)
                .execute('[dbo].[listElementsForFeedstuff]').then((listElementsForFeedstuffRecordSet: any[]) => {
                    feedstuff.elements = listElementsForFeedstuffRecordSet[0];
                    new sql.Request(connection)
                        .input('feedstuffId', feedstuff.id)
                        .execute('[dbo].[getFeedstuff]').then((getFeedstuffRecordSet: any[]) => {
                            feedstuff.name = getFeedstuffRecordSet[0][0].name;
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