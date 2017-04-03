DELIMITER //

CREATE PROCEDURE listElements()
BEGIN
SELECT 
`id` AS `id`,
`name` AS `name`,
`unit` AS `unit`,
`sortOrder` AS `sortOrder`
FROM worldofrations.elements
ORDER BY `sortOrder` ASC;
END;
//

DELIMITER ;

