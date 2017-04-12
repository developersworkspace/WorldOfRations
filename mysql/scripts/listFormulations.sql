DELIMITER //

CREATE PROCEDURE listFormulations()
BEGIN
SELECT 
`formulations`.`id` AS `id`,
`formulations`.`formulaId` AS `formulaId`,
`formulas`.`name` AS `name`,
`formulations`.`feasible` AS `feasible`,
`formulations`.`cost` AS `cost`,
`formulations`.`currencyCode` AS `currencyCode`,
`formulations`.`timestamp` AS `timestamp`
FROM worldofrations.formulations AS `formulations`
INNER JOIN worldofrations.formulas AS `formulas`
ON `formulations`.`formulaId` = `formulas`.`id`
WHERE `feasible` = 1
ORDER BY `timestamp` DESC
LIMIT 5;
END;
//

DELIMITER ;