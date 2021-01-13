#!/bin/bash

read socket
g++ -std=c++11 -Wpedantic ./file.cpp -o ./file.out && ./file.out

