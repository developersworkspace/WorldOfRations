DELIMITER //

CREATE PROCEDURE updateLastLoginTimestamp ( 
p_username CHAR(128),
p_lastLoginTimestamp  BIGINT
)
BEGIN
UPDATE worldofrations.users SET `lastLoginTimestamp` = lastLoginTimestamp
WHERE `username` = p_username;
END;
//

DELIMITER ;