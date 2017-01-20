/// <reference path="./../typings/index.d.ts"/>

import * as sql from 'mssql';
import { config } from './../config';

export class FormulaService {

    constructor() {
     }

    public listFormula() {
        return new Promise((resolve: Function, reject: Function) => {
            new sql.Connection(config.db)
                .connect().then((connection: any) => {
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

