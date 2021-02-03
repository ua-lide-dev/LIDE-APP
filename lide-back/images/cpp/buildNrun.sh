#!/bin/sh

read socket

cd /workdir/
g++ -std=c++11 -Wpedantic -c *.cpp 
g++ -o program.out *.o

echo "sleep $TIMEOUT_VALUE && pkill -SIGKILL -u root " > ./timeout && chmod +x ./timeout &&
./timeout & 

./program.out 