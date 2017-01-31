DELIMITER //

CREATE PROCEDURE getFeedstuff ( 
feedstuffId CHAR(36))
BEGIN
SELECT 
`name` AS `name`
FROM sadfmcoz_dwtest.feedstuffs
WHERE `id` = feedstuffId;
END;
//

DELIMITER ;