#!/bin/sh

read socket

TIMEOUT_VALUE=10

classname="$(echo $1 | cut -d'.' -f 1)" &&

javac $1 && timeout -s SIGKILL $TIMEOUT_VALUE $classname
