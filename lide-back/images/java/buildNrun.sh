#!/bin/sh

read socket

cd /workdir/ &&
classname="$(echo $1 | cut -d'.' -f 1)" &&
javac $1


echo "sleep $TIMEOUT_VALUE && pkill -u root " > ./timeout && chmod +x ./timeout &&
./timeout & 

java $classname
