#!/bin/sh

set -a
source .env
set +a

echo "Restoring app from last dump found in ./db/dumps starting.."

docker-compose -f docker-compose.yml up -d --remove-orphans

echo "Waiting for db to be ready before importing last dump..."

until docker exec $CONTAINER_NAME pg_isready -U postgres; do
    echo "Waiting for PostgreSQL..."
    sleep 2
done

docker exec $CONTAINER_NAME psql -U postgres -d postgres -c "DROP DATABASE IF EXISTS \"wild-transfer\";"
docker exec $CONTAINER_NAME psql -U postgres -d postgres -c "CREATE DATABASE \"wild-transfer\";"

if [ ! -d "db/dumps" ]; then
    echo "Error: Directory db/dumps does not exist."
    exit 1
fi

LATEST_DUMP=$(ls -t "db/dumps" | head -n 1)
if [ -z "$LATEST_DUMP" ]; then
    echo "No dump found in 'db/dumps'"
    exit 1
else
    echo "Restoring data from $LATEST_DUMP into database -> '$DB_NAME'"
    docker exec -i $CONTAINER_NAME psql -U postgres -d "$DB_NAME" < "db/dumps/$LATEST_DUMP"
fi

echo "App restored!"