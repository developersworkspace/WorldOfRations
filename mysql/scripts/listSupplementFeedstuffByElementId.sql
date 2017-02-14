DELIMITER //

CREATE PROCEDURE listSupplementFeedstuffByElementId (
p_elementId CHAR(36),
p_supplementValueRequired DOUBLE)
BEGIN

DECLARE v_elementCode VARCHAR(255);

SELECT `code` INTO v_elementCode
FROM worldofrations.elements
WHERE `id` = p_elementId;

SELECT 
`feedstuff`.`id` AS `id`,
`feedstuff`.`name` AS `name`,
p_supplementValueRequired / `measurement`.`value` AS `weight`
  FROM worldofrations.feedstuffMeasurements AS `measurement`
  INNER JOIN worldofrations.feedstuffs AS `feedstuff`
  ON `feedstuff`.`id` = `measurement`.`FeedstuffId`
  AND `measurement`.`value` != 0
  INNER JOIN worldofrations.elements AS `element`
  ON `element`.`id` = `measurement`.`elementId`
  AND `element`.`Code` = v_elementCode
  INNER JOIN worldofrations.feedstuffGroups AS `feedstuffGroup`
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