#!/bin/sh

docker build --tag cpp lide-back/images/cpp/.
docker build --tag java lide-back/images/java/.
docker build --tag php lide-back/images/php/.
docker build --tag py lide-back/images/python/.