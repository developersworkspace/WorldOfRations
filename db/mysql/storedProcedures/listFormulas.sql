DELIMITER //

CREATE PROCEDURE listFormulas()
BEGIN
SELECT
`formula`.`id` AS `id`,
CASE
	WHEN `formulaGroup3`.`name` IS NULL
	THEN
	CONCAT(`formulaGroup2`.`name` , ' - ' , `formula`.`name`)
	WHEN `formulaGroup4`.`name` IS NULL
	THEN
	CONCAT(`formulaGroup3`.`name` , ' - ' , `formulaGroup2`.`name` , ' - ' , `formula`.`name`)
	ELSE
	CONCAT(`formulaGroup4`.`name` , ' - ' , `formulaGroup3`.`name` , ' - ' , `formulaGroup2`.`name` , ' - ' , `formula`.`name`)
END AS `name`,
CASE
	WHEN `formulaGroup3`.`name` IS NULL
	THEN
	CONCAT(`formulaGroup2`.`name` , ' - ' , `formula`.`name`)
	WHEN `formulaGroup4`.`name` IS NULL
	THEN
	CONCAT(`formulaGroup3`.`name` , ' - ' , `formulaGroup2`.`name` , ' - ' , `formula`.`name`)
	ELSE
	CONCAT(`formulaGroup4`.`name` , ' - ' , `formulaGroup3`.`name` , ' - ' , `formulaGroup2`.`name` , ' - ' , `formula`.`name`)
END AS `searchText`
FROM sadfmcoz_dwtest.formulas AS `formula`
INNER JOIN sadfmcoz_dwtest.formulaGroups AS `formulaGroup1`
ON `formula`.`groupId` = `formulaGroup1`.`id`
LEFT JOIN sadfmcoz_dwtest.formulaGroups AS `formulaGroup2`
ON `formulaGroup2`.`id` = `formulaGroup1`.`parentGroupId`
LEFT JOIN sadfmcoz_dwtest.formulaGroups AS `formulaGroup3`
ON `formulaGroup3`.`id` = `formulaGroup2`.`parentGroupId`
LEFT JOIN sadfmcoz_dwtest.formulaGroups AS `formulaGroup4`
ON `formulaGroup4`.`id` = `formulaGroup3`.`parentGroupId`
LEFT JOIN sadfmcoz_dwtest.formulaGroups AS `formulaGroup5`
ON `formulaGroup5`.`id` = `formulaGroup4`.`parentGroupId`
WHERE `formulaGroup1`.`name` = 'MNE'
ORDER BY `formula`.`sortOrder` ASC;
END;
//

DELIMITER ;
