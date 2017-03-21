DELIMITER //

CREATE PROCEDURE insertFormulationFeedstuff ( 
p_formulationId CHAR(36),
p_feedstuffId CHAR(36),
p_minimum NUMERIC(10,3),
p_maximum NUMERIC(10,3),
p_cost NUMERIC(10,3),
p_weight NUMERIC(10,3)
)
BEGIN
INSERT INTO worldofrations.formulationFeedstuffs (`formulationId`,`feedstuffId`, `minimum`, `maximum`, `cost`, `weight`)
VALUES (p_formulationId, p_feedstuffId, p_minimum, p_maximum, p_cost, p_weight);
END;
//

DELIMITER ;