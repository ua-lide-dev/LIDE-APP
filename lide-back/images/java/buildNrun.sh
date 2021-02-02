#!/bin/sh

read socket

TIMEOUT_VALUE=300

cd /workdir/ &&
classname="$(echo $1 | cut -d'.' -f 1)" &&
javac $1 &&
timeout -s SIGKILL -t $TIMEOUT_VALUE java $classname
