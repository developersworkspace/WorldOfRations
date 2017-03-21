`docker build --no-cache -t worldofrations_mysql ./`

`docker run -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=worldofrations -e MYSQL_USER=worldofrations_user -e MYSQL_PASSWORD=worldofrations_password -t worldofrations_mysql`