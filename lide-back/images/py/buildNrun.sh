#!/bin/sh

read socket

TIMEOUT_VALUE=300

cd /workdir/ &&
timeout -s SIGKILL $TIMEOUT_VALUE python $1