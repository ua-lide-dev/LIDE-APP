#!/bin/sh

read socket

TIMEOUT_VALUE=300

cd /workdir/ &&
classname="$(echo $1 | cut -d'.' -f 1)" &&
javac $1


echo "sleep 10 && pkill $TIMEOUT_VALUE -u root " > ./timeout && chmod +x ./timeout &&
./timeout & 

java $classname
