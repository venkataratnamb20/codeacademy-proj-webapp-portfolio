#!/usr/bin/env bash
set -exuo
# variables with default values
# DIR=$1
# SERVER=$2
# PORT=$3
DIR=${1:-$(pwd)}
SERVER=${2:-"localhost"}
PORT=${3:-8080}

echo "Starting server on $SERVER:$PORT from the directory $DIR"

# Run the server
python -m http.server --bind $SERVER $PORT --directory $DIR

exit 0