DELIMITER //

CREATE PROCEDURE findComparisonFormulaByFormulaId (
p_formulaId CHAR(36))
BEGIN
SELECT `formulaId` AS `formulaId`
FROM worldofrations.comparisonFormulas
WHERE `id` = p_formulaId;
END;
//

DELIMITER ;