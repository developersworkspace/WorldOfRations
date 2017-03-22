DELIMITER //

CREATE PROCEDURE listFormulationFeedstuffByFormulationId ( 
p_formulationId CHAR(36))
BEGIN
SELECT 
`feedstuffId` AS `id`,
`minimum` AS `minimum`,
`maximum` AS `maximum`,
`cost` AS `cost`,
`weight` AS `weight`
FROM worldofrations.formulationFeedstuffs
WHERE `formulationId` = p_formulationId;
END;
//

DELIMITER ;