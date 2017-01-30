import * as sql from 'mssql';
import * as util from 'util';
import * as fs from 'fs';

function feedstuff() {
    return new Promise((resolve: Function, reject: Function) => {
        new sql.Connection({
            user: 'worldofrations',
            password: 'worldofrations_reader',
            server: 'epons.dedicated.co.za',
            database: 'WoR'
        }).connect().then((connection: sql.Connection) => {
            new sql.Request(connection).query('SELECT * FROM [dbo].[Feedstuff]').then((resultSet: any[]) => {
                let contents = '';

                for (let i = 0; i < resultSet.length; i++) {
                    contents += util.format(`INSERT INTO dbo.feedstuff
(
[id],
[groupId],
[name],
[description],
[sortOrder]
)
VALUES
(
'%s',
'%s',
'%s',
'%s',
%s
) \r\n`, resultSet[i].Id, resultSet[i].FeedstuffGroupId, resultSet[i].Name, resultSet[i].Description, resultSet[i].SortOrder);

                }

                connection.close();
                resolve(contents);

            }).catch(function (err: Error) {
                reject(err);
            });
        });
    });
}


feedstuff().then((result: any) => {

    fs.writeFile("./feedstuff.sql", result, function (err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
}).catch((err: Error) => {
    //console.log(err);
});