DELIMITER //

CREATE PROCEDURE listFeedstuffs()
BEGIN
SELECT 
`id` AS `id`,
`name` AS `name`,
LOWER(`name`) AS `searchText`
FROM sadfmcoz_dwtest.feedstuffs
ORDER BY `name` ASC;
END;
//

DELIMITER ;

