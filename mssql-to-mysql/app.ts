import * as sql from 'mssql';
import * as util from 'util';
import * as fs from 'fs';

function query(query: string, filename: string, map: Function) {
    return new Promise((resolve: Function, reject: Function) => {
        new sql.Connection({
            user: 'worldofrations',
            password: 'worldofrations_reader',
            server: 'epons.dedicated.co.za',
            database: 'WoR'
        }).connect().then((connection: sql.Connection) => {
            new sql.Request(connection).query(query).then((resultSet: any[]) => {
                let contents = '';
                console.log(resultSet.length + ' results - ' + filename);
                try {
                    for (let i = 0; i < resultSet.length; i++) {
                        contents += map(resultSet[i]);
                    }
                    console.log('Completes mapping - ' + filename);

                    fs.writeFile(filename, contents, function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("Saved - " + filename);
                        }
                    });

                } catch (err) {
                    console.log('Failed mapping - ' + filename);
                }
                connection.close();
            });
        }).catch((err: Error) => {
            console.log(err);
        });
    });
}

function feedstuffs() {
    query('SELECT * FROM [dbo].[Feedstuff]', './dist/feedstuffs.sql', (item) => {
        return util.format(`INSERT INTO sadfmcoz_dwtest.feedstuffs
(
\`id\`,
\`groupId\`,
\`name\`,
\`description\`,
\`sortOrder\`
)
VALUES
(
%s,
%s,
%s,
%s,
%s
); \r\n`, escapeAndFormat(item.Id), escapeAndFormat(item.FeedstuffGroupId), escapeAndFormat(item.Name), escapeAndFormat(item.Description), item.SortOrder);
    });
}

function feedstuffGroups() {
    query('SELECT * FROM [dbo].[FeedstuffGroup]', './dist/feedstuffGroups.sql', (item) => {
        return util.format(`INSERT INTO sadfmcoz_dwtest.feedstuffGroups
(
\`id\`,
\`parentGroupId\`,
\`name\`,
\`description\`,
\`sortOrder\`
)
VALUES
(
%s,
%s,
%s,
%s,
%s
); \r\n`, escapeAndFormat(item.Id), escapeAndFormat(item.FeedstuffGroupParentId), escapeAndFormat(item.Name), escapeAndFormat(item.Description), item.SortOrder);
    });
}

function feedstuffMeasurements() {
    query('SELECT * FROM [dbo].[FeedstuffMeasurement]', './dist/feedstuffMeasurements.sql', (item) => {
        return util.format(`INSERT INTO sadfmcoz_dwtest.feedstuffMeasurements
(
\`feedstuffId\`,
\`elementId\`,
\`value\`
)
VALUES
(
'%s',
'%s',
%s
); \r\n`, item.FeedstuffId, item.ElementId, item.Value);
    });
}

function formulaGroups() {
    query('SELECT * FROM [dbo].[FormulaGroup]', './dist/formulaGroups.sql', (item) => {
        return util.format(`INSERT INTO sadfmcoz_dwtest.formulaGroups
(
\`id\`,
\`parentGroupId\`,
\`name\`,
\`description\`,
\`sortOrder\`
)
VALUES
(
%s,
%s,
%s,
%s,
%s
); \r\n`, escapeAndFormat(item.Id), escapeAndFormat(item.FormulaGroupParentId), escapeAndFormat(item.Name), escapeAndFormat(item.Description), item.SortOrder);
    });
}


function formulas() {
    query('SELECT * FROM [dbo].[Formula]', './dist/formulas.sql', (item) => {
        return util.format(`INSERT INTO sadfmcoz_dwtest.formulas
(
\`id\`,
\`groupId\`,
\`name\`,
\`description\`,
\`sortOrder\`
)
VALUES
(
%s,
%s,
%s,
%s,
%s
); \r\n`, escapeAndFormat(item.Id), escapeAndFormat(item.FormulaGroupId), escapeAndFormat(item.Name), escapeAndFormat(item.Description), item.SortOrder);
    });
}

function formulaMeasurements() {
    query('SELECT * FROM [dbo].[FormulaMeasurement]', './dist/formulaMeasurements.sql', (item) => {
        return util.format(`INSERT INTO sadfmcoz_dwtest.formulaMeasurements
(
\`formulaId\`,
\`elementId\`,
\`minimum\`,
\`maximum\`
)
VALUES
(
%s,
%s,
%s,
%s
); \r\n`, escapeAndFormat(item.FormulaId), escapeAndFormat(item.ElementId), item.MinValue, item.MaxValue);
    });
}

function comparisonFormulas() {
    query('SELECT * FROM [dbo].[ComparisonFormula]', './dist/comparisonFormulas.sql', (item) => {
        return util.format(`INSERT INTO sadfmcoz_dwtest.comparisonFormulas
(
\`id\`,
\`formulaId\`
)
VALUES
(
%s,
%s
        ); \r\n`, escapeAndFormat(item.Id), escapeAndFormat(item.FormulaId));
    });
}

function elements() {
    query('SELECT * FROM [dbo].[Element]', './dist/elements.sql', (item) => {
        return util.format(`INSERT INTO sadfmcoz_dwtest.elements
(
\`id\`,
\`unit\`,
\`abbreviation\`,
\`code\`,
\`name\`,
\`sortOrder\`
)
VALUES
(
%s,
%s,
%s,
%s,
%s,
%s
); \r\n`, escapeAndFormat(item.Id), escapeAndFormat(item.Unit), escapeAndFormat(item.Abbreviation), escapeAndFormat(item.Code), escapeAndFormat(item.Name), item.SortOrder);
    });
}

function suggestedValues() {
    query('SELECT * FROM [dbo].[SugggestedValue]', './dist/suggestedValues.sql', (item) => {
        return util.format(`INSERT INTO sadfmcoz_dwtest.suggestedValues
(
\`feedstuffId\`,
\`formulaGroupId\`,
\`minimum\`,
\`maximum\`
)
VALUES
(
%s,
%s,
%s,
%s
); \r\n`, escapeAndFormat(item.FeedstuffId), escapeAndFormat(item.FormulaGroupId), item.Minimum, item.Maximum);
    });
}

function escapeAndFormat(str: string) {

    if (str == null || str == 'null') {
        return 'null';
    }

    str = str.replace('\'', '\\\'');

    return '\'' + str + '\'';
}


formulas();
formulaGroups();
formulaMeasurements();
feedstuffs();
feedstuffGroups();
feedstuffMeasurements();
comparisonFormulas();
elements();
suggestedValues();

setTimeout(() => {
    console.log('Done');
}, 15000);