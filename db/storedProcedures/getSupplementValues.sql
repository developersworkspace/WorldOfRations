CREATE PROCEDURE [getSupplementValues]
@elementId UNIQUEIDENTIFIER,
@supplementValueRequired FLOAT
AS

DECLARE @elementCode VARCHAR(255)

SELECT @elementCode = [Code]
FROM [dbo].[Element]
WHERE [Id] = @elementId

SELECT 
[feedstuff].[Id] AS [id],
[feedstuff].[Name] AS [text],
@supplementValueRequired / [measurement].[Value] AS [weight]
  FROM [dbo].[FeedstuffMeasurement] AS [measurement]
  INNER JOIN [dbo].[Feedstuff] AS [feedstuff]
  ON [feedstuff].[Id] = [measurement].[FeedstuffId]
  AND [measurement].[Value] != 0
  INNER JOIN [dbo].[Element] AS [element]
  ON [element].[Id] = [measurement].[ElementId]
  AND [element].[Code] = @elementCode
  INNER JOIN [dbo].[FeedstuffGroup] AS [feedstuffGroup]
  ON [feedstuffGroup].[Id] = [feedstuff].[FeedstuffGroupId]
  WHERE 
  (
  [feedstuffGroup].[Name] = 'Micro Mineral Sources'
  OR
  [feedstuffGroup].[Name] = 'Amino Acids'
  OR
  [feedstuffGroup].[Name] = 'Vitamins'
  )
  AND [feedstuff].[Name] LIKE @elementCode +'%'
 