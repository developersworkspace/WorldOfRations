CREATE PROCEDURE [dbo].[listFormula]
AS
SELECT
[Id] AS [id],
[Name] AS [name],
[Name] AS [searchText]
FROM [dbo].[Formula]
ORDER BY [SortOrder] ASC


CREATE PROCEDURE [dbo].[listFormula]
AS
SELECT
[formula].[Id] AS [id],
[formulaGroup3].[Name] + ' - ' + [formula].[Name] AS [name],
[formula].[Name] AS [searchText]
FROM [dbo].[Formula] AS [formula]
INNER JOIN [dbo].[FormulaGroup] AS [formulaGroup1]
ON [formula].[FormulaGroupId] = [formulaGroup1].[Id]
INNER JOIN [dbo].[FormulaGroup] AS [formulaGroup2]
ON [formulaGroup2].[Id] = [formulaGroup1].[FormulaGroupParentId]
INNER JOIN [dbo].[FormulaGroup] AS [formulaGroup3]
ON [formulaGroup3].[Id] = [formulaGroup2].[FormulaGroupParentId]
ORDER BY [formula].[SortOrder] ASC