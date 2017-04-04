DELIMITER //

CREATE PROCEDURE findUserByUsername ( 
p_username CHAR(128)
)
BEGIN
SELECT 
`id`,
`username`,
`lastLoginTimestamp` FROM worldofrations.users 
WHERE `username` = p_username;
END;
//

DELIMITER ;