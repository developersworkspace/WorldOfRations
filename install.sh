# -- BUILD AND INSTALL WORLD OF RATIONS --

# Update machine package indexes
sudo apt-get update

# Download and run script to install node 7
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -

# Install node 7
sudo apt-get install -y nodejs

# Install 'typescript' node package
sudo npm install -g typescript

# Install 'gulp' node package
sudo npm install -g gulp

# Install 'angular-cli' node package
sudo npm install -g @angular/cli

# Clone 'WorldOfRations' repository
sudo git clone https://github.com/developersworkspace/WorldOfRations.git

# Change directory to 'api'
sudo cd ./WorldOfRations/api

# Install node packages for 'api'
sudo npm install

# Build 'api'
sudo npm run build

# Change directory to 'web'
sudo cd ./../web

# Install node packages for 'web'
sudo npm install

# Build 'web'
sudo npm run build

# Change to root of repository
sudo cd ./../

# Build and run docker compose as deamon
sudo docker-compose up -d

# -- INSTALL NGINX --

# Update machine package indexes
sudo apt-get update

# Install NGINX
sudo apt-get install -y nginx

# Add rule to firewall
sudo ufw allow 'Nginx HTTP'

# Download nginx.conf to NGINX directory
sudo curl -o /etc/nginx/nginx.conf https://raw.githubusercontent.com/developersworkspace/WorldOfRations/master/nginx.conf

# Restart NGINX
sudo systemctl restart nginx
