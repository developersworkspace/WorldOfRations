DELIMITER //

CREATE PROCEDURE getSupplementValues (
elementId CHAR(36),
supplementValueRequired DOUBLE)
BEGIN

DECLARE elementCode VARCHAR(255);

SELECT `Code` INTO elementCode
FROM Element
WHERE `Id` = elementId;

SELECT 
`feedstuff`.`id` AS `id`,
`feedstuff`.`name` AS `text`,
supplementValueRequired / `measurement`.`Value` AS `weight`
  FROM sadfmcoz_dwtest.feedstuffMeasurements AS `measurement`
  INNER JOIN sadfmcoz_dwtest.feedstuffs AS `feedstuff`
  ON `feedstuff`.`id` = `measurement`.`FeedstuffId`
  AND `measurement`.`Value` != 0
  INNER JOIN sadfmcoz_dwtest.elements AS `element`
  ON `element`.`id` = `measurement`.`elementId`
  AND `element`.`Code` = elementCode
  INNER JOIN sadfmcoz_dwtest.feedstuffGroups AS `feedstuffGroup`
  ON `feedstuffGroup`.`id` = `feedstuff`.`groupId`
  WHERE 
  (
  `feedstuffGroup`.`name` = 'Micro Mineral Sources'
  OR
  `feedstuffGroup`.`name` = 'Amino Acids'
  OR
  `feedstuffGroup`.`name` = 'Vitamins'
  )
  AND `feedstuff`.`name` LIKE CONCAT(elementCode ,'%');
END;
//

DELIMITER ;