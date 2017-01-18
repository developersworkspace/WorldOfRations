/// <reference path="./../typings/index.d.ts"/>

import * as sql from 'mssql';

export class FormulaService {

    constructor() { }

    config = {
        user: 'sa',
        password: 'Galjoen501',
        server: 'epons.dedicated.co.za',
        database: 'WoR'
    }

    public listFormula() {
        return new Promise((resolve: Function, reject: Function) => {
            new sql.Connection(this.config)
                .connect().then(function (connection: any) {
                    new sql.Request(connection)
                        .execute('[dbo].[listFormula]').then(function (recordsets: any[]) {
                            resolve(recordsets[0]);
                        }).catch(function (err: Error) {
                            reject(err);
                        });
                });
        });
    }
}

