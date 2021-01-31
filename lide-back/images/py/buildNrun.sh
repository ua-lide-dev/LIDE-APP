#!/bin/sh

read socket

TIMEOUT_VALUE=10

timeout -s SIGKILL $TIMEOUT_VALUE python $1