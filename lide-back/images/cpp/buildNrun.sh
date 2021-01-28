#!/bin/bash

read socket

TIMEOUT_VALUE=10

g++ -std=c++11 -Wpedantic $1 -o program.out && timeout -s SIGKILL $TIMEOUT_VALUE ./program.out
