#!/bin/sh

read socket

TIMEOUT_VALUE=300

cd /workdir/ &&
g++ -std=c++11 -Wpedantic -c *.cpp &&
g++ -o program.out *.o &&
chmod +x program.out &&
timeout -s SIGKILL $TIMEOUT_VALUE ./program.out