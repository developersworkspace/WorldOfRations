DELIMITER //

CREATE PROCEDURE listElementsByFeedstuffId (
p_feedstuffId CHAR(36))
Begin
SELECT 
`measurement`.`elementId` AS `id`,
`element`.`name` AS `name`,
`element`.`unit` AS `unit`,
`measurement`.`value` AS `value`
FROM worldofrations.feedstuffMeasurements AS `measurement`
INNER JOIN worldofrations.elements AS `element`
ON `element`.`id` = `measurement`.`elementId`
AND
`feedstuffId` = p_feedstuffId;
END;
//

DELIMITER ;

