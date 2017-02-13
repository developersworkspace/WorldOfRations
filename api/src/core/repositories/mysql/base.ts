// Imports
import * as mysql from 'mysql';
import { winston } from './../../logger';

let pool = null;

export class Base {

    constructor(private config: any) {
        if (pool == null) {
            pool = mysql.createPool({
                connectionLimit: 50,
                host: this.config.server,
                user: this.config.user,
                password: this.config.password,
                database: this.config.database
            });
        }
    }

    protected query(query: string) {
        return new Promise((resolve: Function, reject: Function) => {
            winston.profile('Base.query ' + query);
            pool.getConnection((err: Error, connection: any) => {
                if (err) {
                    reject(err);
                } else {
                    connection.query(query, (err: Error, results: any[], fields) => {
                        connection.release();
                        connection.destroy();
                        if (err) {
                            reject(err);
                            winston.profile('Base.query ' + query);
                        } else {
                            resolve(results[0]);
                            winston.debug(results[0].length + ' results returned');
                            winston.profile('Base.query ' + query);
                        }
                    });
                }
            });
        });
    }

    protected roundToTwoDecimal(value: number) {
        return Math.round(value * 100) / 100;
    }


    protected escapeAndFormat(str: string) {

        if (str == null || str == 'null') {
            return 'null';
        }

        str = str.replace('\'', '\\\'');

        return '\'' + str + '\'';
    }
}