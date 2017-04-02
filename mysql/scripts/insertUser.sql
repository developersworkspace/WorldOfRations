DELIMITER //

CREATE PROCEDURE insertUser ( 
p_username CHAR(128),
p_lastLoginTimestamp  BIGINT
)
BEGIN
INSERT INTO worldofrations.users (`id`, `username`, `lastLoginTimestamp`) 
SELECT uuid(), p_username, p_lastLoginTimestamp FROM worldofrations.users  
WHERE NOT EXISTS ( SELECT * FROM worldofrations.users 
                   WHERE `username` != p_username);
END;
//

DELIMITER ;