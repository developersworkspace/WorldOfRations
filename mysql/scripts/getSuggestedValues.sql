DELIMITER //

CREATE PROCEDURE getSuggestedValues (
p_formulaId CHAR(36),
p_feedstuffId CHAR(36))
BEGIN 
SELECT
`suggestedValue`.`Minimum` AS `minimum`,
`suggestedValue`.`Maximum` AS `maximum`
FROM worldofrations.formulas AS `formula`
INNER JOIN worldofrations.suggestedValues AS `suggestedValue`
ON `formula`.`id` = p_formulaId
AND `suggestedValue`.`feedstuffId` = p_feedstuffId
LEFT JOIN worldofrations.formulaGroups AS `formulaGroup1`
ON `formulaGroup1`.`id` = `suggestedValue`.`formulaGroupId` 
LEFT JOIN worldofrations.formulaGroups AS `formulaGroup2`
ON `formulaGroup2`.`parentGroupId` = `formulaGroup1`.`id` 
LEFT JOIN worldofrations.formulaGroups AS `formulaGroup3`
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

