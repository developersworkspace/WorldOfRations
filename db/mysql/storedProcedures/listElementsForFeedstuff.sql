DELIMITER //

CREATE PROCEDURE listElementsForFeedstuff (
feedstuffId CHAR(36))
Begin
SELECT 
`measurement`.`ElementId` AS `id`,
`element`.`name` AS `name`,
`element`.`unit` AS `unit`,
`measurement`.`value` AS `value`
FROM sadfmcoz_dwtest.feedstuffMeasurements AS `measurement`
INNER JOIN sadfmcoz_dwtest.elements AS `element`
ON `element`.`id` = `measurement`.`elementId`
AND
`feedstuffId` = feedstuffId;
END;
//

DELIMITER ;

