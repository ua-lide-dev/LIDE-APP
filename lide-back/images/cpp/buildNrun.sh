#!/bin/bash

read socket
g++ -std=c++11 -Wpedantic $1 -o program.out && ./program.out
