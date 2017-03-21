DELIMITER //

CREATE PROCEDURE insertFormulation ( 
p_id CHAR(36),
p_formulaId CHAR(36),
p_feasible BOOLEAN,
p_cost NUMERIC(10,3),
p_currencyCode CHAR(6),
p_timestamp INT
)
BEGIN
INSERT INTO worldofrations.formulations (`id`,`formulaId`, `feasible`, `cost`, `currencyCode`, `timestamp`)
VALUES (p_id, p_formulaId, p_feasible, p_cost, p_currencyCode, p_timestamp);
END;
//

DELIMITER ;



