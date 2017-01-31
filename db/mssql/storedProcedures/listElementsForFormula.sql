CREATE PROCEDURE [dbo].[listElementsForFormula]
@formulaId UNIQUEIDENTIFIER
As
SELECT 
[measurement].[ElementId] AS [id],
[element].[Name] AS [name],
[element].[Unit] AS [unit],
[measurement].[MinValue] AS [minimum],
[measurement].[MaxValue] AS [maximum],
[element].[SortOrder] AS [sortOrder]
FROM [dbo].[FormulaMeasurement] AS [measurement]
INNER JOIN [dbo].[Element] AS [element]
ON [element].[Id] = [measurement].[ElementId]
AND
[FormulaId] = @formulaId