#!/bin/sh

read socket

########################################################################
#								       #
#         SCRIPT BASH QUI COMPILE ET EXECUTE UN FIHICER java           #
#								       #
########################################################################
varsansjava="$(echo $1 | cut -d'.' -f 1)"
myString="${varsansjava:1}"
if javac $1
then java $myString
fi