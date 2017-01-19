CREATE PROCEDURE [dbo].[listElementsForFeedstuff]
@feedstuffId UNIQUEIDENTIFIER
As
SELECT 
[measurement].[ElementId] AS [id],
[element].[Name] AS [name],
[element].[Unit] AS [unit],
[measurement].[Value] AS [value]
FROM [dbo].[FeedstuffMeasurement] AS [measurement]
INNER JOIN [dbo].[Element] AS [element]
ON [element].[Id] = [measurement].[ElementId]
AND
[FeedstuffId] = @feedstuffId