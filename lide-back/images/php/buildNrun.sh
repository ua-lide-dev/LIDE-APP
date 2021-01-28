#!/bin/bash

read socket
timeout -s SIGKILL $TIMEOUT_VALUE php $1
