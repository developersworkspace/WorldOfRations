CREATE PROCEDURE [dbo].[listExampleFeedstuff]
AS
CREATE TABLE #temp
(
    [Id] UNIQUEIDENTIFIER, 
    [Name] VARCHAR(255), 
    [SearchText] VARCHAR(255), 
    [Cost] FLOAT,
	[Minimum] INT,
	[Maximum] INT
)


INSERT INTO #temp
(
[Id],
[Name],
[SearchText],
[Cost],
[Minimum],
[Maximum]
)
SELECT [Id], [Name], LOWER([Name]), 2300, 0, 1000
FROM [dbo].[Feedstuff] WHERE [Name] = 'Alfalfa hay, dehy 17% CP'


INSERT INTO #temp
(
[Id],
[Name],
[SearchText],
[Cost],
[Minimum],
[Maximum]
)
SELECT [Id], [Name], LOWER([Name]), 800, 0, 1000
FROM [dbo].[Feedstuff] WHERE [Name] = 'Sunflower seed hulls'

INSERT INTO #temp
(
[Id],
[Name],
[SearchText],
[Cost],
[Minimum],
[Maximum]
)
SELECT [Id], [Name], LOWER([Name]), 3800, 0, 1000
FROM [dbo].[Feedstuff] WHERE [Name] = 'Corn grain (maize),  yellow'

INSERT INTO #temp
(
[Id],
[Name],
[SearchText],
[Cost],
[Minimum],
[Maximum]
)
SELECT [Id], [Name], LOWER([Name]), 3000, 0, 1000
FROM [dbo].[Feedstuff] WHERE [Name] = 'Oats, grain'


INSERT INTO #temp
(
[Id],
[Name],
[SearchText],
[Cost],
[Minimum],
[Maximum]
)
SELECT [Id], [Name], LOWER([Name]), 4500, 0, 80
FROM [dbo].[Feedstuff] WHERE [Name] = 'Molasses, sugarcane (syrup)'

INSERT INTO #temp
(
[Id],
[Name],
[SearchText],
[Cost],
[Minimum],
[Maximum]
)
SELECT [Id], [Name], LOWER([Name]), 6000, 0, 1000
FROM [dbo].[Feedstuff] WHERE [Name] = 'Fish meal, herring'

INSERT INTO #temp
(
[Id],
[Name],
[SearchText],
[Cost],
[Minimum],
[Maximum]
)
SELECT [Id], [Name], LOWER([Name]), 7000, 0, 120
FROM [dbo].[Feedstuff] WHERE [Name] = 'Cottonseed o/c meal, mech extr'

INSERT INTO #temp
(
[Id],
[Name],
[SearchText],
[Cost],
[Minimum],
[Maximum]
)
SELECT [Id], [Name], LOWER([Name]), 6000, 0, 4
FROM [dbo].[Feedstuff] WHERE [Name] = 'Urea 46% Nitrogen'

INSERT INTO #temp
(
[Id],
[Name],
[SearchText],
[Cost],
[Minimum],
[Maximum]
)
SELECT [Id], [Name], LOWER([Name]), 7500, 0, 1000
FROM [dbo].[Feedstuff] WHERE [Name] = 'Canola (Rapeseed) oil'

INSERT INTO #temp
(
[Id],
[Name],
[SearchText],
[Cost],
[Minimum],
[Maximum]
)
SELECT [Id], [Name], LOWER([Name]), 1200, 0, 1000
FROM [dbo].[Feedstuff] WHERE [Name] = 'Ca, as ground Limestone'


INSERT INTO #temp
(
[Id],
[Name],
[SearchText],
[Cost],
[Minimum],
[Maximum]
)
SELECT [Id], [Name], LOWER([Name]), 900, 4, 4
FROM [dbo].[Feedstuff] WHERE [Name] = 'Na and Cl, as Salt'

INSERT INTO #temp
(
[Id],
[Name],
[SearchText],
[Cost],
[Minimum],
[Maximum]
)
SELECT [Id], [Name], LOWER([Name]), 2000, 0, 1000
FROM [dbo].[Feedstuff] WHERE [Name] = 'K, as Potassium Chloride (KCl)'

INSERT INTO #temp
(
[Id],
[Name],
[SearchText],
[Cost],
[Minimum],
[Maximum]
)
SELECT [Id], [Name], LOWER([Name]), 2500, 0, 1000
FROM [dbo].[Feedstuff] WHERE [Name] = 'Mg, as Magnesium oxide (MgO)'


SELECT 
[Id] AS [id],
[Name] AS [name],
[SearchText] AS [searchText],
[Cost] AS [cost],
[Minimum] AS [minimum],
[Maximum] AS [maximum]
FROM #temp


DROP TABLE #temp