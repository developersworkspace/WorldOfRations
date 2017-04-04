DELIMITER //

CREATE PROCEDURE listFeedstuffs(
    p_username CHAR(128)
)
BEGIN
SELECT 
`id` AS `id`,
`name` AS `name`
FROM worldofrations.feedstuffs
UNION
SELECT 
`userFeedstuffs`.`id` AS `id`,
`userFeedstuffs`.`name` AS `name`
FROM worldofrations.userFeedstuffs as `userFeedstuffs`
INNER JOIN worldofrations.users as `users`
ON `userFeedstuffs`.`userId` = `users`.`id` 
AND `users`.`username` = p_username
ORDER BY `name` ASC;
END;
//

DELIMITER ;

