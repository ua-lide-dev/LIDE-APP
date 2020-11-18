#!/bin/sh

if [ "$1" = "-f" ]
then 
    echo " >using force"
    docker-compose down --remove-orphans -v 
    docker image rm lide-web lide-back
    docker-compose up -d --force-recreate -V 
else
    docker-compose up -d && 
    chmod "+x" ./lide-back/images/build_images.sh
    ./lide-back/images/build_images.sh
fi

docker-compose logs lide-back-service >> ./lide-back/back_logs.log
