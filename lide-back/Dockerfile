FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./

#ligne qui permet de metre des dockers dans des dockers
RUN apk add --update docker openrc
RUN rc-update add docker boot
VOLUME /var/run/docker.sock:/var/run/docker.sock

#script qui build toutes nos images de compilation
#-------------------------------
COPY images/build_images.sh build_images.sh
COPY images/cpp /cpp
COPY images/java /java
COPY images/php /php
COPY images/python /python
RUN chmod "+x" build_images.sh
RUN ./build_images.sh
#-------------------------------

RUN npm install