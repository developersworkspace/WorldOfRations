DELIMITER //

CREATE PROCEDURE getFeedstuffById ( 
p_feedstuffId CHAR(36))
BEGIN
SELECT 
`name` AS `name`
FROM worldofrations.feedstuffs
WHERE `id` = p_feedstuffId;
END;
//

DELIMITER ;