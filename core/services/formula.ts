/// <reference path="./../typings/index.d.ts"/>

import * as sql from 'mssql';

export class FormulaService {

    constructor() { }

    public listFormula() {
        return new Promise((resolve: Function, reject: Function) => {
            sql.connect("mssql://sa:Galjoen501@epons.dedicated.co.za/wor").then(function () {
                new sql.Request()
                    .execute('[dbo].[listFormula]').then(function (recordsets: any[]) {
                        resolve(recordsets[0]);
                    }).catch(function (err: Error) {
                        reject(err);
                    });
            });
        });
    }
}

