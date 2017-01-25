CREATE PROCEDURE [getSupplementValues]
@elementCode VARCHAR(255),
@supplementValueRequired FLOAT
AS
SELECT 
[feedstuff].[Name] AS [name],
@supplementValueRequired / [measurement].[Value] AS [value]
  FROM [dbo].[FeedstuffMeasurement] AS [measurement]
  INNER JOIN [dbo].[Feedstuff] AS [feedstuff]
  ON [feedstuff].[Id] = [measurement].[FeedstuffId]
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