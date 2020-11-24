#!/bin/sh

if [ "$1" = "-f" ]
then 
    echo " >using force"
    docker-compose down --remove-orphans -v
    docker volume prune -f
    docker image rm lide-web lide-back lide-wss
    docker-compose up -d --force-recreate -V 
else
    docker-compose down --remove-orphans
    docker-compose up -d
    chmod "+x" ./lide-back/images/build_images.sh
    ./lide-back/images/build_images.sh
fi