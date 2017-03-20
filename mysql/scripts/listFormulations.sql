DELIMITER //

CREATE PROCEDURE listFormulations ()
BEGIN
SELECT 
`id` AS `id`,
`formulaId` AS `formulaId`,
`feasible` AS `feasible`,
`cost` AS `cost`,
`currencyCode` AS `currencyCode`,
`timestamp` AS `timestamp`,
FROM worldofrations.formulations
ORDER BY `timestamp` DESC
LIMIT 5
END;
//

DELIMITER ;