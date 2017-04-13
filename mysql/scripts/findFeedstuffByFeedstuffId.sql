DELIMITER //

CREATE PROCEDURE findFeedstuffByFeedstuffId ( 
p_feedstuffId CHAR(36),
p_username CHAR(128))
BEGIN

SELECT 
`feedstuffs`.`name`
FROM worldofrations.feedstuffs AS `feedstuffs`
WHERE 
`feedstuffs`.`id` = p_feedstuffId
AND p_username  IS NULL
UNION
SELECT 
`userFeedstuffs`.`name`
FROM worldofrations.userFeedstuffs AS `userFeedstuffs`
INNER JOIN worldofrations.users as `users`
ON `userFeedstuffs`.`userId` = `users`.`id` 
AND `users`.`username` = p_username
WHERE `userFeedstuffs`.`id` = p_feedstuffId;
END;
//

DELIMITER ;