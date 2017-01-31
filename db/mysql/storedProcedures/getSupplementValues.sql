DELIMITER //

CREATE PROCEDURE getSupplementValues (
p_elementId CHAR(36),
p_supplementValueRequired DOUBLE)
BEGIN

DECLARE v_elementCode VARCHAR(255);

SELECT `code` INTO v_elementCode
FROM sadfmcoz_dwtest.elements
WHERE `id` = p_elementId;

SELECT 
`feedstuff`.`id` AS `id`,
`feedstuff`.`name` AS `text`,
p_supplementValueRequired / `measurement`.`value` AS `weight`
  FROM sadfmcoz_dwtest.feedstuffMeasurements AS `measurement`
  INNER JOIN sadfmcoz_dwtest.feedstuffs AS `feedstuff`
  ON `feedstuff`.`id` = `measurement`.`FeedstuffId`
  AND `measurement`.`value` != 0
  INNER JOIN sadfmcoz_dwtest.elements AS `element`
  ON `element`.`id` = `measurement`.`elementId`
  AND `element`.`Code` = v_elementCode
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
  AND `feedstuff`.`name` LIKE CONCAT(v_elementCode ,'%');
END;
//

DELIMITER ;