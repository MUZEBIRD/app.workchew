FROM node:latest

MAINTAINER Seth Terry

ENV NODE_ENV=development 

ENV NODE_HTTP_PORT=8080

ENV SSL_START=ON

ENV MONGO_IP=mongodb

RUN npm install forever -g

COPY package.json /datrythur/package.json

RUN cd datrythur; npm install

ADD server.js /datrythur/server.js

ADD View/build /datrythur/View/build

ADD routes /datrythur/routes

ADD middleWare /datrythur/middleWare

ADD rxFormidable /datrythur/rxFormidable

ADD Services /datrythur/Services

WORKDIR   /datrythur

EXPOSE $NODE_HTTP_PORT

ENTRYPOINT ["forever", "server.js"]