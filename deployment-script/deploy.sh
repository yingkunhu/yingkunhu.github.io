#!/bin/bash

echo "Checking OS type ..."
if [[ ! -f /etc/centos-release ]]; then
  1>&2 echo Not CentOS Linux
  exit 1
fi

echo "Checking OS Version ..."
if ! grep -lq "CentOS Linux release 7\\.[0-9]" /etc/centos-release; then
  1>&2 echo Only CentOS Linux 7.x is supported.
  exit 1
fi

echo "Checking current user ..."
if [[ ! $(id -u) == 0 ]]; then
  1>&2 echo only root user can deploy.
  exit 1
fi

if ! which git; then 
  yum install -y git
fi 