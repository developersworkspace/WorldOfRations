CREATE PROCEDURE [dbo].[getSuggestedValues]
@formulaId UNIQUEIDENTIFIER,
@feedstuffId UNIQUEIDENTIFIER
AS 
SELECT
[suggestedValue].[Minimum] AS [minimum],
[suggestedValue].[Maximum] AS [maximum]
FROM [dbo].[Formula] AS [formula]
INNER JOIN [dbo].[SugggestedValue] AS [suggestedValue]
ON [formula].[Id] = @formulaId
AND [suggestedValue].[FeedstuffId] = @feedstuffId
LEFT JOIN [dbo].[FormulaGroup] AS [formulaGroup1]
ON [formulaGroup1].[Id] = [suggestedValue].[FormulaGroupId] 
LEFT JOIN [dbo].[FormulaGroup] AS [formulaGroup2]
ON [formulaGroup2].[FormulaGroupParentId] = [formulaGroup1].[Id] 
LEFT JOIN [dbo].[FormulaGroup] AS [formulaGroup3]
ON [formulaGroup3].[FormulaGroupParentId] = [formulaGroup2].[Id]
WHERE
[formulaGroup1].[Id] = [formula].[FormulaGroupId]
OR
[formulaGroup2].[Id] = [formula].[FormulaGroupId]
OR
[formulaGroup3].[Id] = [formula].[FormulaGroupId]