#!/bin/bash

# Stop on any error
set -e

# Function to show usage instructions
usage() {
  echo "Usage: $0 [options]"
  echo "Options:"
  echo "  --help     Display this help message"
  exit 0
}

# Parse optional arguments
for arg in "$@"; do
  case $arg in
    --clean)
      echo "Cleaning up unused Docker resources..."
      docker system prune -af --volumes
      shift
      ;;
    --help)
      usage
      ;;
    *)
      echo "Invalid option: $arg"
      usage
      ;;
  esac
done

echo "Stopping and removing any existing development containers..."
docker-compose -f docker-compose.dev.yml down

echo "Building and starting the development container..."
docker-compose -f docker-compose.dev.yml up --build -d

echo "Development app running. Use 'docker ps' to check running containers."
