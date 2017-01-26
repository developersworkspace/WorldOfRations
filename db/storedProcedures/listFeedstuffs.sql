CREATE PROCEDURE [dbo].[listFeedstuffs]
AS
SELECT 
[Id] AS [id],
[Name] AS [name],
LOWER([Name]) AS [searchText]
FROM [dbo].[Feedstuff]
ORDER BY [Name] ASC