CREATE PROCEDURE [dbo].[getComparisonFormula]
@formulaId UNIQUEIDENTIFIER
AS
SELECT TOP 1
[FormulaId] AS [formulaId]
FROM [dbo].[ComparisonFormula] 
WHERE [Id] = @formulaId