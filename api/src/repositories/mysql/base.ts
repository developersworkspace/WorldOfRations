// Imports
import * as mysql from 'mysql';

// Imports logger
import { getLogger } from './../../logger';

let pool = null;

export class Base {

    constructor(private config: any) {
        if (pool == null && config != null) {
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
        getLogger('mysql').debug(query);

        return new Promise((resolve: Function, reject: Function) => {
            pool.getConnection((err: Error, connection: any) => {
                if (err) {
                    reject(err);
                } else {
                    connection.query(query, (err: Error, results: any[], fields) => {
                        connection.release();
                        if (err) {
                            reject(err);
                        } else {
                            resolve(results[0]);
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