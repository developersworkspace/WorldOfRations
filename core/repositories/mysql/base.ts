import * as mysql from 'mysql';

export class Base {

    constructor(private config: any) {

    }

    protected query(connection: any, query: string) {
        return new Promise((resolve: Function, reject: Function) => {

            console.log('Executing - ' + query);
            
            let closeConnection = connection == null;

            if (connection == null) {
                connection = this.getConnection();
            }

            connection.query(query, (err: Error, results: any[], fields) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }

                if (closeConnection) {
                    connection.end();
                }
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