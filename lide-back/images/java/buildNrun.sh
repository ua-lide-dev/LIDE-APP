#!/bin/sh

read socket

classname="$(echo $1 | cut -d'.' -f 1)" &&

javac $1 && 
timeout -s SIGKILL $TIMEOUT_VALUE $classname
