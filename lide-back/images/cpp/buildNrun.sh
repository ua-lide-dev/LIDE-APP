#!/bin/bash

########################################################################
#								       #
#         SCRIPT BASH QUI COMPILE ET EXECUTE UN FIHICER CPP            #
#								       #
########################################################################



g++ -std=c++11 -Wpedantic $1 -o a.out
./a.out
rm a.out
