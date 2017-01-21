CREATE PROCEDURE [dbo].[getFeedstuff] 
@feedstuffId UNIQUEIDENTIFIER
AS
SELECT 
[Name] AS [name]
FROM [dbo].[Feedstuff]
WHERE [Id] = @feedstuffId