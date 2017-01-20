/// <reference path="./../typings/index.d.ts"/>

import * as sql from 'mssql';
import { config } from './../config';

export class FeedstuffService {

    constructor() { }

    public listFeedstuff() {
        return new Promise((resolve: Function, reject: Function) => {
            new sql.Connection(config.db)
                .connect().then((connection: any) => {
                    new sql.Request(connection)
                        .execute('[dbo].[listFeedstuff]').then(function (recordsets: any[]) {
                            resolve(recordsets[0]);
                        }).catch(function (err: Error) {
                            reject(err);
                        });
                });
        });
    }

    public listExampleFeedstuff() {
        return new Promise((resolve: Function, reject: Function) => {
            new sql.Connection(config.db)
                .connect().then((connection: any) => {
                    new sql.Request(connection)
                        .execute('[dbo].[listExampleFeedstuff]').then(function (recordsets: any[]) {
                            resolve(recordsets[0]);
                        }).catch(function (err: Error) {
                            reject(err);
                        });
                });
        });
    }

    public getSuggestedValues(formulaId: string, feedstuffId: string) {
        return new Promise((resolve: Function, reject: Function) => {
            new sql.Connection(config.db)
                .connect().then((connection: any) => {
                    new sql.Request(connection)
                        .input('formulaId', sql.UNIQUEIDENTIFIER, formulaId)
                        .input('feedstuffId', sql.UNIQUEIDENTIFIER, feedstuffId)
                        .execute('[dbo].[getSuggestedValues]').then(function (recordsets: any[]) {
                            resolve(recordsets[0]);
                        }).catch(function (err: Error) {
                            reject(err);
                        });
                });
        });
    }
}

