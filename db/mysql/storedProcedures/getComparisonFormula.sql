DELIMITER //

CREATE PROCEDURE getComparisonFormula (
formulaId CHAR(36))
BEGIN
SELECT `formulaId` AS `formulaId`
FROM sadfmcoz_dwtest.comparisonFormulas
WHERE `id` = formulaId;
END;
//

DELIMITER ;