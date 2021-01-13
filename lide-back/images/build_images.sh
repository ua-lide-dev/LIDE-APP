#!/bin/sh

docker build  --no-cache --tag  py_lide ./python/
docker build  --no-cache --tag  cpp_lide ./cpp/
docker build  --no-cache --tag  java_lide ./java/
docker build  --no-cache --tag  php_lide ./php/
