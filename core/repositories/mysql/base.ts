// Imports
import * as mysql from 'mysql';
import { winston } from './../../logger';

export class Base {

    constructor(private config: any) {

    }

    protected query(query: string) {
        return new Promise((resolve: Function, reject: Function) => {
            winston.profile('Base.query ' + query);
            let connection = this.getConnection();

            connection.query(query, (err: Error, results: any[], fields) => {
                if (err) {
                    reject(err);
                    winston.profile('Base.query ' + query);
                } else {
                    resolve(results[0]);
                    winston.debug(results[0].length + ' results returned');
                    winston.profile('Base.query ' + query);
                }

                connection.end();
            });
        });
    }

    protected getConnection() {
        let connection = mysql.createConnection({
            host: this.config.server,
            user: this.config.user,
            password: this.config.password,
            database: this.config.database
        });
        connection.connect();

        return connection;
    }

    protected escapeAndFormat(str: string) {

        if (str == null || str == 'null') {
            return 'null';
        }

        str = str.replace('\'', '\\\'');

        return '\'' + str + '\'';
    }
}