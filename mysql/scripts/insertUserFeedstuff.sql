DELIMITER //

CREATE PROCEDURE insertUserFeedstuff ( 
p_username CHAR(128),
p_id CHAR(36),
p_name  VARCHAR(255),
p_description  VARCHAR(255)
)
BEGIN
INSERT INTO worldofrations.userFeedstuffs (`id`, `userId`, `name`, `description`) 
SELECT p_id, `id` , p_name, p_description FROM users WHERE `username` = p_username LIMIT 1;
END;
//

DELIMITER ;