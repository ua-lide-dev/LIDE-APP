#!/bin/sh

if [ "$1" = "-f" ]
then 
    echo " >using force"
    docker-compose down --remove-orphans -v 
    docker image rm lide-web lide-back
    docker-compose up -d --force-recreate -V && 
    docker-compose logs lide-back-service >> ./lide-back/back_logs.log 

else
    docker-compose up -d && 
    docker-compose logs lide-back-service >> ./lide-back/back_logs.log 
fi



