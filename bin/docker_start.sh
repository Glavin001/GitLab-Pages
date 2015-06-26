#!/bin/bash

set -x

if [[ ! -f /app/keys/id_rsa.pub ]]; then
	cd /app/keys &&  ssh-keygen -t rsa -f "id_rsa"
fi

cat /app/keys/id_rsa.pub
cd /app && npm start
