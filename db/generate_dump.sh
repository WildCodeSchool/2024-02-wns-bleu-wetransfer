set -a
source ../.env
set +a

docker exec $CONTAINER_NAME pg_dumpall -c -U $DB_USERNAME > $DUMPS_FOLDER/pg_`date +%Y-%m-%d"_"%H-%M-%S`.sql
python3 check_dumps.py
rclone sync $DUMPS_FOLDER  $RCLONE_REMOTE_NAME:$RCLONE_REMOTE_FOLDER