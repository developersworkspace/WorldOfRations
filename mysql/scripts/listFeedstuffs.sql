DELIMITER //

CREATE PROCEDURE listFeedstuffs(
    p_username CHAR(128)
)
BEGIN
SELECT 
`id` AS `id`,
`name` AS `name`
FROM worldofrations.feedstuffs
ORDER BY `name` ASC;
UNION
SELECT 
`id` AS `id`,
`name` AS `name`
INNER JOIN worldofrations.users as `users`
ON `userFeedstuffs`.`userId` = `users`.`id` 
AND `users`.`username` = p_username
ORDER BY `name` ASC;
END;
//

DELIMITER ;

