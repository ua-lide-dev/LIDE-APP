#!/bin/sh

build_images() {
    cd ./lide-back/images
    for dir in $(find . -type d); do
        dir="${dir:2}"
        if [ "$dir" != "" ]; then
            cd $dir
            docker build . -t "$dir"
            cd ..
        fi
    done
}

if [ "$1" = "-f" ]; then
    echo " >using force"
    docker-compose down --remove-orphans -v
    docker volume prune -f
    docker image rm lide-web lide-back lide-wss
    docker-compose up -d --force-recreate -V
elif [ "$1" = "-i" ]; then
    build_images
else
    docker-compose down --remove-orphans
    docker-compose up -d
fi
