set -a
source ../.env
set +a

DUMP_FILE="$DUMPS_FOLDER/pg_$(date +%Y-%m-%d_%H-%M-%S).sql"

# Create the dump file
docker exec $CONTAINER_NAME pg_dumpall -c -U $DB_USERNAME > "$DUMP_FILE"

# Create a testing database
docker exec $CONTAINER_NAME psql -U $DB_USERNAME -c "CREATE DATABASE test_dump_db;"

# Restore the dump in the testing database
if docker exec -i $CONTAINER_NAME psql -U $DB_USERNAME -d test_dump_db < "$DUMP_FILE"; then
    echo "Dump is valid, deleting testing database.."
    docker exec $CONTAINER_NAME psql -U $DB_USERNAME -c "DROP DATABASE test_dump_db;"
else
    echo "Error on dump validity checking!" >&2
    exit 1
fi

# Check dumps dates and delete older than 7d ones
python3 check_dumps.py

# Sync with rclone on distant server (gdrive)
rclone sync "$DUMPS_FOLDER" "$RCLONE_REMOTE_NAME:$RCLONE_REMOTE_FOLDER"

echo "Dump created and exported on distant server with success!"