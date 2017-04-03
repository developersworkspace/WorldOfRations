DELIMITER //

CREATE PROCEDURE listElements()
BEGIN
SELECT 
`id` AS `id`,
CONCAT(`name`,'(', `code`, ')') AS `name`,
`unit` AS `unit`,
`sortOrder` AS `sortOrder`
FROM worldofrations.elements
ORDER BY `sortOrder` ASC;
END;
//

DELIMITER ;

