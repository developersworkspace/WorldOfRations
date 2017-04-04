DELIMITER //

CREATE PROCEDURE listElementsByUserFeedstuffId (
p_feedstuffId CHAR(36))
Begin
SELECT 
`measurement`.`elementId` AS `id`,
`element`.`name` AS `name`,
`element`.`unit` AS `unit`,
`measurement`.`value` AS `value`
FROM worldofrations.userFeedstuffMeasurements AS `measurement`
INNER JOIN worldofrations.elements AS `element`
ON `element`.`id` = `measurement`.`elementId`
AND
`feedstuffId` = p_feedstuffId
ORDER BY `element`.`sortOrder`;
END;
//

DELIMITER ;