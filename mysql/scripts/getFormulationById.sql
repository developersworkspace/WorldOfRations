DELIMITER //

CREATE PROCEDURE getFormulationById ( 
p_formulationId CHAR(36))
BEGIN
SELECT 
`id` AS `id`,
`formulaId` AS `formulaId`,
`feasible` AS `feasible`,
`cost` AS `cost`,
`currencyCode` AS `currencyCode`,
`timestamp` AS `timestamp`,
FROM worldofrations.formulations
WHERE `id` = p_formulationId;
END;
//

DELIMITER ;