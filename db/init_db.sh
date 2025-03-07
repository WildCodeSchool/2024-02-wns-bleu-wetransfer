#!/bin/bash

# Démarre PostgreSQL si ce n'est pas déjà fait
echo "Starting PostgreSQL..."
pg_ctl -D /var/lib/postgresql/data -l /var/log/postgresql.log start &

# Attend que PostgreSQL soit prêt
echo "Waiting for PostgreSQL before proceeding with the import..."
until pg_isready -U postgres; do
    echo "Waiting for PostgreSQL..."
    sleep 2
done

# Check if the database already exists
DB_EXIST=$(psql -U postgres -tAc "SELECT 1 FROM pg_database WHERE datname='wild-transfer'")

if [ "$DB_EXIST" != "1" ]; then
    echo "The database 'wild-transfer' does not exist, creating it..."
    psql -U postgres -d postgres -c "CREATE DATABASE \"wild-transfer\";"

    # Restore the dump only if the database has just been created
    LATEST_DUMP=$(ls -t '/dumps' | head -n 1)
    if [ -z "$LATEST_DUMP" ]; then
        echo "No dump file found in '/dumps'. The database remains empty."
    else
        echo "Restoring dump file $LATEST_DUMP into the 'wild-transfer' database..."
        psql -U postgres -d "wild-transfer" < "/dumps/$LATEST_DUMP"
    fi
else
    echo "The database 'wild-transfer' already exists. No changes made."
fi
