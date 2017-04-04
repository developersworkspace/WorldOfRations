DELIMITER //

CREATE PROCEDURE insertUserFeedstuffMeasurement ( 
p_feedstuffId CHAR(36),
p_elementId CHAR(36),
p_value  DECIMAL(20, 5)
)
BEGIN
INSERT INTO worldofrations.userFeedstuffMeasurements (`feedstuffId`, `elementId`, `value`) 
VALUES (p_feedstuffId, p_elementId, p_value);
END;
//

DELIMITER ;