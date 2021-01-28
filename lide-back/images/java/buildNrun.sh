#!/bin/sh

read socket

classname="$(echo $1 | cut -d'.' -f 1)" &&

javac $1 && timeout -s SIGKILL 10 $classname
