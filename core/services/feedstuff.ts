/// <reference path="./../typings/index.d.ts"/>

import * as sql from 'mssql';

export class FeedstuffService {

    constructor() { }

    public listFeedstuff() {
        return new Promise((resolve: Function, reject: Function) => {
            sql.connect("mssql://sa:Galjoen501@epons.dedicated.co.za/wor").then(function () {
                new sql.Request()
                    .execute('[dbo].[listFeedstuff]').then(function (recordsets: any[]) {
                        resolve(recordsets[0]);
                    }).catch(function (err: Error) {
                        reject(err);
                    });
            });
        });
    }
}

