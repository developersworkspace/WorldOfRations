sudo apt-get update
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y npm
npm install -g typescript
npm install -g gulp
git clone https://github.com/developersworkspace/WorldOfRations.git

cd ./WorldOfRations/api
npm install
npm run build

cd ./../web
npm install
npm run build

cd ./../
docker-compose up