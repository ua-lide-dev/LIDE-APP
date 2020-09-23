#!/bin/sh

docker-compose stop
docker-compose up -d --remove-orphans && 
docker-compose logs lide-back-service >> ./lide-back/back_logs.log 