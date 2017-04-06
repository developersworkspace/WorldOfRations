DELIMITER //

CREATE PROCEDURE listFormulationFeedstuffByFormulationId ( 
p_formulationId CHAR(36))
BEGIN
SELECT 
p_formulationId AS `formulationId`,
`feedstuffId` AS `feedstuffId`,
`feedstuffs`.`name` AS `name`,
`minimum` AS `minimum`,
`maximum` AS `maximum`,
`cost` AS `cost`,
`weight` AS `weight`
FROM worldofrations.formulationFeedstuffs AS `formulationFeedstuffs`
INNER JOIN worldofrations.feedstuffs AS `feedstuffs`
ON `formulationFeedstuffs`.`feedstuffId` = `feedstuffs`.`id`
AND `formulationFeedstuffs`.`formulationId` = p_formulationId;
END;
//

DELIMITER ;