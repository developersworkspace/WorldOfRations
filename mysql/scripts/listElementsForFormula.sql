DELIMITER //

CREATE PROCEDURE listElementsForFormula (
p_formulaId CHAR(36))
Begin
SELECT 
`measurement`.`elementId` AS `id`,
`element`.`name` AS `name`,
`element`.`unit` AS `unit`,
`measurement`.`minimum` AS `minimum`,
`measurement`.`maximum` AS `maximum`,
`element`.`sortOrder` AS `sortOrder`
FROM worldofrations.formulaMeasurements AS `measurement`
INNER JOIN worldofrations.elements AS `element`
ON `element`.`id` = `measurement`.`elementId`
AND
`measurement`.`formulaId` = p_formulaId;
END;
//

DELIMITER ;

