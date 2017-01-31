DELIMITER //

CREATE PROCEDURE listElementsForFeedstuff (
p_feedstuffId CHAR(36))
Begin
SELECT 
`measurement`.`elementId` AS `id`,
`element`.`name` AS `name`,
`element`.`unit` AS `unit`,
`measurement`.`value` AS `value`
FROM sadfmcoz_dwtest.feedstuffMeasurements AS `measurement`
INNER JOIN sadfmcoz_dwtest.elements AS `element`
ON `element`.`id` = `measurement`.`elementId`
AND
`feedstuffId` = p_feedstuffId;
END;
//

DELIMITER ;

