"use strict";
var sql = require("mssql");
var util = require("util");
var fs = require("fs");
function query(query, filename, map) {
    return new Promise(function (resolve, reject) {
        new sql.Connection({
            user: 'worldofrations',
            password: 'worldofrations_reader',
            server: 'epons.dedicated.co.za',
            database: 'WoR'
        }).connect().then(function (connection) {
            new sql.Request(connection).query(query).then(function (resultSet) {
                var contents = '';
                console.log(resultSet.length + ' results - ' + filename);
                try {
                    for (var i = 0; i < resultSet.length; i++) {
                        contents += map(resultSet[i]);
                    }
                    console.log('Completes mapping - ' + filename);
                    fs.writeFile(filename, contents, function (err) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log("Saved - " + filename);
                        }
                    });
                }
                catch (err) {
                    console.log(err);
                    console.log('Failed mapping - ' + filename);
                }
                connection.close();
            });
        })["catch"](function (err) {
            console.log(err);
        });
    });
}
function feedstuffs() {
    query('SELECT * FROM [dbo].[Feedstuff]', './dist/feedstuffs.sql', function (item) {
        return util.format("INSERT INTO sadfmcoz_dwtest.feedstuffs\n(\n`id`,\n`groupId`,\n`name`,\n`description`,\n`sortOrder`\n)\nVALUES\n(\n%s,\n%s,\n%s,\n%s,\n%s\n); \r\n", escapeAndFormat(item.Id), escapeAndFormat(item.FeedstuffGroupId), escapeAndFormat(item.Name), escapeAndFormat(item.Description), item.SortOrder);
    });
}
function feedstuffGroups() {
    query('SELECT * FROM [dbo].[FeedstuffGroup]', './dist/feedstuffGroups.sql', function (item) {
        return util.format("INSERT INTO sadfmcoz_dwtest.feedstuffGroups\n(\n`id`,\n`parentGroupId`,\n`name`,\n`description`,\n`sortOrder`\n)\nVALUES\n(\n%s,\n%s,\n%s,\n%s,\n%s\n); \r\n", escapeAndFormat(item.Id), escapeAndFormat(item.FeedstuffGroupParentId), escapeAndFormat(item.Name), escapeAndFormat(item.Description), item.SortOrder);
    });
}
function feedstuffMeasurements() {
    query('SELECT * FROM [dbo].[FeedstuffMeasurement]', './dist/feedstuffMeasurements.sql', function (item) {
        return util.format("INSERT INTO sadfmcoz_dwtest.feedstuffMeasurements\n(\n`feedstuffId`,\n`elementId`,\n`value`\n)\nVALUES\n(\n'%s',\n'%s',\n%s\n); \r\n", item.FeedstuffId, item.ElementId, item.Value);
    });
}
function formulaGroups() {
    query('SELECT * FROM [dbo].[FormulaGroup]', './dist/formulaGroups.sql', function (item) {
        return util.format("INSERT INTO sadfmcoz_dwtest.formulaGroups\n(\n`id`,\n`parentGroupId`,\n`name`,\n`description`,\n`sortOrder`\n)\nVALUES\n(\n%s,\n%s,\n%s,\n%s,\n%s\n); \r\n", escapeAndFormat(item.Id), escapeAndFormat(item.FormulaGroupParentId), escapeAndFormat(item.Name), escapeAndFormat(item.Description), item.SortOrder);
    });
}
function formulas() {
    query('SELECT * FROM [dbo].[Formula]', './dist/formulas.sql', function (item) {
        return util.format("INSERT INTO sadfmcoz_dwtest.formulas\n(\n`id`,\n`groupId`,\n`name`,\n`description`,\n`sortOrder`\n)\nVALUES\n(\n%s,\n%s,\n%s,\n%s,\n%s\n); \r\n", escapeAndFormat(item.Id), escapeAndFormat(item.FormulaGroupId), escapeAndFormat(item.Name), escapeAndFormat(item.Description), item.SortOrder);
    });
}
function formulaMeasurements() {
    query('SELECT * FROM [dbo].[FormulaMeasurement]', './dist/formulaMeasurements.sql', function (item) {
        return util.format("INSERT INTO sadfmcoz_dwtest.formulaMeasurements\n(\n`formulaId`,\n`elementId`,\n`minimum`,\n`maximum`\n)\nVALUES\n(\n%s,\n%s,\n%s,\n%s\n); \r\n", escapeAndFormat(item.FormulaId), escapeAndFormat(item.ElementId), item.MinValue, item.MaxValue);
    });
}
function comparisonFormulas() {
    query('SELECT * FROM [dbo].[ComparisonFormula]', './dist/comparisonFormulas.sql', function (item) {
        return util.format("INSERT INTO sadfmcoz_dwtest.comparisonFormulas\n(\n`id`,\n`formulaId`\n)\nVALUES\n(\n%s,\n%s\n        ); \r\n", escapeAndFormat(item.Id), escapeAndFormat(item.FormulaId));
    });
}
function elements() {
    query('SELECT * FROM [dbo].[Element]', './dist/elements.sql', function (item) {
        return util.format("INSERT INTO sadfmcoz_dwtest.elements\n(\n`id`,\n`unit`,\n`abbreviation`,\n`code`,\n`name`,\n`sortOrder`\n)\nVALUES\n(\n%s,\n%s,\n%s,\n%s,\n%s,\n%s\n); \r\n", escapeAndFormat(item.Id), escapeAndFormat(item.Unit), escapeAndFormat(item.Abbreviation), escapeAndFormat(item.Code), escapeAndFormat(item.Name), item.SortOrder);
    });
}
function suggestedValues() {
    query('SELECT * FROM [dbo].[SugggestedValue]', './dist/suggestedValues.sql', function (item) {
        return util.format("INSERT INTO sadfmcoz_dwtest.suggestedValues\n(\n`feedstuffId`,\n`formulaGroupId`,\n`minimum`,\n`maximum`\n)\nVALUES\n(\n%s,\n%s,\n%s,\n%s\n); \r\n", escapeAndFormat(item.FeedstuffId), escapeAndFormat(item.FormulaGroupId), item.Minimum, item.Maximum);
    });
}
function escapeAndFormat(str) {
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
setTimeout(function () {
    console.log('Done');
}, 15000);
