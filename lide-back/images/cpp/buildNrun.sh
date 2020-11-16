#!/bin/sh
#c'est pas bin/bash avec alpine ! c'est bin/sh

########################################################################
#								      								   #
#         SCRIPT BASH QUI COMPILE ET EXECUTE UN FIHICER CPP            #
#								        							   #
########################################################################


#si la compile est sans erreurs alors on exec a.out et on le rm
read tmp
if g++ -std=c++11 -Wpedantic $1 -o a.out
then ./a.out; rm a.out
fi
