#!/bin/bash

set -e

# Trap to handle errors gracefully
trap 'echo "An error occurred. Please check the output above for details."; exit 1' ERR

# Function to show usage instructions
usage() {
  echo "Usage: $0 [start|stop|restart]"
  exit 1
}

# Check for command
if [[ $# -eq 0 ]]; then
  usage
fi

COMMAND=$1

case "$COMMAND" in
  start)
    echo "Starting the production container..."
    docker-compose up --build -d || { echo "Failed to start the container."; exit 1; }
    echo "Production app running at http://localhost"
    ;;
  stop)
    echo "Stopping the production container..."
    docker-compose down || { echo "Failed to stop the container."; exit 1; }
    echo "Production app stopped."
    ;;
  restart)
    echo "Restarting the production container..."
    docker-compose down || { echo "Failed to stop the container."; exit 1; }
    docker-compose up --build -d || { echo "Failed to restart the container."; exit 1; }
    echo "Production app restarted and running at http://localhost"
    ;;
  *)
    usage
    ;;
esac
