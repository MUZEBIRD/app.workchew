FROM mongo-express:latest

MAINTAINER Seth Terry

ENV ME_CONFIG_OPTIONS_EDITORTHEME="ambiance" 
ENV ME_CONFIG_BASICAUTH_USERNAME="waterpolo" 
ENV ME_CONFIG_BASICAUTH_PASSWORD="Shea3sh" 
ENV ME_CONFIG_MONGODB_SERVER="mongodb"