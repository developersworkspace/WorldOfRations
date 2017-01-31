CREATE PROCEDURE [dbo].[listFormulas]
AS
SELECT
[formula].[Id] AS [id],
CASE
	WHEN [formulaGroup3].[Name] IS NULL
	THEN
	[formulaGroup2].[Name] + ' - ' + [formula].[Name]
	WHEN [formulaGroup4].[Name] IS NULL
	THEN
	[formulaGroup3].[Name] + ' - ' + [formulaGroup2].[Name] + ' - ' + [formula].[Name]
	ELSE
	[formulaGroup4].[Name] + ' - ' + [formulaGroup3].[Name] + ' - ' + [formulaGroup2].[Name] + ' - ' + [formula].[Name]
END AS [name],
CASE
	WHEN [formulaGroup3].[Name] IS NULL
	THEN
	[formulaGroup2].[Name] + ' - ' + [formula].[Name]
	WHEN [formulaGroup4].[Name] IS NULL
	THEN
	[formulaGroup3].[Name] + ' - ' + [formulaGroup2].[Name] + ' - ' + [formula].[Name]
	ELSE
	[formulaGroup4].[Name] + ' - ' + [formulaGroup3].[Name] + ' - ' + [formulaGroup2].[Name] + ' - ' + [formula].[Name]
END AS [searchText]
FROM [dbo].[Formula] AS [formula]
INNER JOIN [dbo].[FormulaGroup] AS [formulaGroup1]
ON [formula].[FormulaGroupId] = [formulaGroup1].[Id]
LEFT JOIN [dbo].[FormulaGroup] AS [formulaGroup2]
ON [formulaGroup2].[Id] = [formulaGroup1].[FormulaGroupParentId]
LEFT JOIN [dbo].[FormulaGroup] AS [formulaGroup3]
ON [formulaGroup3].[Id] = [formulaGroup2].[FormulaGroupParentId]
LEFT JOIN [dbo].[FormulaGroup] AS [formulaGroup4]
ON [formulaGroup4].[Id] = [formulaGroup3].[FormulaGroupParentId]
LEFT JOIN [dbo].[FormulaGroup] AS [formulaGroup5]
ON [formulaGroup5].[Id] = [formulaGroup4].[FormulaGroupParentId]
WHERE [formulaGroup1].[Name] = 'MNE'
ORDER BY [formula].[SortOrder] ASC