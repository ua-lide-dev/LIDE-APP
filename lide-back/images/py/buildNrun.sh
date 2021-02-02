#!/bin/sh

read socket

TIMEOUT_VALUE=300

timeout -s SIGKILL $TIMEOUT_VALUE python $1