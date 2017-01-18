/// <reference path="./../typings/index.d.ts"/>

import * as sql from 'mssql';

export class FeedstuffService {

    constructor() { }

    config = {
        user: 'sa',
        password: 'Galjoen501',
        server: 'epons.dedicated.co.za',
        database: 'WoR'
    }

    public listFeedstuff() {
        return new Promise((resolve: Function, reject: Function) => {
            new sql.Connection(this.config)
                .connect().then(function (connection: any) {
                    new sql.Request(connection)
                        .execute('[dbo].[listFeedstuff]').then(function (recordsets: any[]) {
                            resolve(recordsets[0]);
                        }).catch(function (err: Error) {
                            reject(err);
                        });
                });
        });
    }

    public getSuggestedValues(formulaId: string, feedstuffId: string) {

        return new Promise((resolve: Function, reject: Function) => {
            new sql.Connection(this.config)
                .connect().then(function (connection: any) {
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

