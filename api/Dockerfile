FROM node:6.9.4

RUN npm install -g gulp
ADD . .
RUN npm install

ADD . .
RUN gulp ts

EXPOSE 9001 

CMD ["node", "app.js"]