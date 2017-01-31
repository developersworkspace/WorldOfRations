DELIMITER //

CREATE PROCEDURE getSuggestedValues (
formulaId CHAR(36),
feedstuffId CHAR(36))
BEGIN 
SELECT
`suggestedValue`.`Minimum` AS `minimum`,
`suggestedValue`.`Maximum` AS `maximum`
FROM sadfmcoz_dwtest.formulas AS `formula`
INNER JOIN sadfmcoz_dwtest.suggestedValues AS `suggestedValue`
ON `formula`.`id` = formulaId
AND `suggestedValue`.`feedstuffId` = feedstuffId
LEFT JOIN sadfmcoz_dwtest.formulaGroups AS `formulaGroup1`
ON `formulaGroup1`.`id` = `suggestedValue`.`formulaGroupId` 
LEFT JOIN sadfmcoz_dwtest.formulaGroups AS `formulaGroup2`
ON `formulaGroup2`.`parentGroupId` = `formulaGroup1`.`id` 
LEFT JOIN sadfmcoz_dwtest.formulaGroups AS `formulaGroup3`
ON `formulaGroup3`.`parentGroupId` = `formulaGroup2`.`id`
WHERE
`formulaGroup1`.`Id` = `formula`.`groupId`
OR
`formulaGroup2`.`Id` = `formula`.`groupId`
OR
`formulaGroup3`.`Id` = `formula`.`groupId`;
END;
//

DELIMITER ;

