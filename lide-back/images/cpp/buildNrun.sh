#!/bin/sh
#c'est pas bin/bash avec alpine ! c'est bin/sh

########################################################################
#								      								   #
#         SCRIPT BASH QUI COMPILE ET EXECUTE UN FIHICER CPP            #
#								        							   #
########################################################################

echo "#include<iostream> \nint main () {std::cout << 12 << std::endl; return 0;}" > fichier.cpp
#si la compile est sans erreurs alors on exec a.out et on le rm
if g++ -std=c++11 -Wpedantic fichier.cpp -o a.out
then ./a.out; rm a.out
fi