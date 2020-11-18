FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./

#ligne qui permet de metre des dockers dans des dockers
RUN apk add --update docker openrc
RUN rc-update add docker boot

RUN npm install