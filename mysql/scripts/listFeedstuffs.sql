DELIMITER //

CREATE PROCEDURE listFeedstuffs()
BEGIN
SELECT 
`id` AS `id`,
`name` AS `name`
FROM worldofrations.feedstuffs
ORDER BY `name` ASC;
END;
//

DELIMITER ;

