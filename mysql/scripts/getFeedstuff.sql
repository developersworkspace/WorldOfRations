DELIMITER //

CREATE PROCEDURE getFeedstuff ( 
p_feedstuffId CHAR(36))
BEGIN
SELECT 
`name` AS `name`
FROM sadfmcoz_dwtest.feedstuffs
WHERE `id` = p_feedstuffId;
END;
//

DELIMITER ;