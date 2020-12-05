#!/bin/sh

docker build --no-cache --tag  cpp_lide lide-back/images/cpp/.
docker build --no-cache --tag  java_lide lide-back/images/java/.
docker build --no-cache --tag  php_lide lide-back/images/php/.
docker build --no-cache --tag  py_lide lide-back/images/python/.