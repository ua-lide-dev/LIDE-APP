#!/bin/bash

# Export env variables
set -o allexport
source .env

# Save home
LIDE_HOME=$(pwd)

build_images() {
    cd ./lide-back/images
    for dir in $(find . -type d); do
        dir="${dir:2}"
        if [ "$dir" != "" ]; then
            cd $dir
            echo "$dir"_lide
            docker build . --no-cache -t "$dir"_lide
            cd ..
        fi
    done
    cd $LIDE_HOME
}

if [ "$1" = "-f" ]; then
    echo " >using force"
    docker-compose down --remove-orphans -v
    docker volume prune -f
    docker image rm lide-web lide-back lide-wss
    docker-compose up -d --force-recreate -V
    echo " >building images"
    build_images
elif [ "$1" = "-fl" ]; then
    echo " >using force (save db)"
    docker-compose down --remove-orphans
    docker image rm lide-web lide-back lide-wss
    docker-compose up -d --force-recreate
    echo " >building images"
    build_images
elif [ "$1" = "-i" ]; then
    echo " >building images"
    build_images
else
    docker-compose down --remove-orphans
    docker-compose up -d
fi
