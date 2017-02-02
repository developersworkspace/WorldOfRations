FROM node:6.9.4

WORKDIR ./WorldOfRations/api

COPY ./dist ./
RUN npm install

CMD ["node", "./app.js"]