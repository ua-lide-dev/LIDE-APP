#!/bin/sh

########################################################################
#								       #
#         SCRIPT BASH QUI COMPILE ET EXECUTE UN FIHICER java           #
#								       #
########################################################################
varsansjava="$(echo $1 | cut -d'.' -f 1)"
if javac $1
then java $varsansjava
fi