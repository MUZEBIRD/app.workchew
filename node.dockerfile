FROM node:latest

MAINTAINER Seth Terry

ENV NODE_ENV=development 

ENV NODE_HTTP_PORT=8080

ENV SSL_START=ON

ENV MONGO_IP=mongodb

RUN npm install forever -g

COPY package.json /demo-work-chew/package.json

RUN cd demo-work-chew; npm install

ADD server.js /demo-work-chew/server.js

ADD View/build /demo-work-chew/View/build

ADD routes /demo-work-chew/routes

ADD middleWare /demo-work-chew/middleWare

ADD rxFormidable /demo-work-chew/rxFormidable

ADD Services /demo-work-chew/Services

WORKDIR   /demo-work-chew

EXPOSE $NODE_HTTP_PORT

ENTRYPOINT ["forever", "server.js"]