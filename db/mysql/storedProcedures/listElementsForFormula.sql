DELIMITER //

CREATE PROCEDURE listElementsForFormula (
formulaId CHAR(36))
Begin
SELECT 
`measurement`.`elementId` AS `id`,
`element`.`name` AS `name`,
`element`.`unit` AS `unit`,
`measurement`.`minimum` AS `minimum`,
`measurement`.`maximum` AS `maximum`,
`element`.`sortOrder` AS `sortOrder`
FROM sadfmcoz_dwtest.formulaMeasurements AS `measurement`
INNER JOIN sadfmcoz_dwtest.elements AS `element`
ON `element`.`id` = `measurement`.`elementId`
AND
`measurement`.`formulaId` = formulaId;
END;
//

DELIMITER ;

