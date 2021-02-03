#!/bin/sh

read socket

cd /workdir/ 

echo "sleep $TIMEOUT_VALUE && pkill -SIGKILL -u root " > ./timeout && chmod +x ./timeout &&
./timeout & 

python $1
