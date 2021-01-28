#!/bin/bash

read socket

TIMEOUT_VALUE=10

timeout -s SIGKILL $TIMEOUT_VALUE php $1
