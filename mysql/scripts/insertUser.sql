DELIMITER //

CREATE PROCEDURE insertUser ( 
p_username CHAR(128),
p_lastLoginTimestamp  BIGINT
)
BEGIN
INSERT INTO worldofrations.users (`userId`, `username`, `lastLoginTimestamp`) 
SELECT uuid(), p_username, p_lastLoginTimestamp FROM users WHERE `username` != p_username LIMIT 1;
END;
//

DELIMITER ;