DELIMITER //

CREATE PROCEDURE updateUserFeedstuffMeasurement ( 
p_feedstuffId CHAR(36),
p_elementId CHAR(36),
p_value  DECIMAL(20, 5)
)
BEGIN
UPDATE worldofrations.userFeedstuffMeasurements SET `value` = p_value
WHERE  `feedstuffId` = p_feedstuffId AND `elementId` = p_elementId;
END;
//

DELIMITER ;