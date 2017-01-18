CREATE PROCEDURE [dbo].[listFormula]
AS
SELECT
[Id] AS [id],
[Name] AS [name],
[Name] AS [searchText]
FROM [dbo].[Formula]
ORDER BY [SortOrder] ASC