#!/bin/sh

read socket
timeout -s SIGKILL $TIMEOUT_VALUE python $1
