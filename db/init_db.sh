#!/bin/bash

echo "Attente de PostgreSQL avant de procéder à l'importation..."
until pg_isready -U postgres; do
    echo "Attente de PostgreSQL..."
    sleep 2
done

psql -U postgres -d postgres -c "DROP DATABASE IF EXISTS 'wild-transfer';"
psql -U postgres -d postgres -c "CREATE DATABASE 'wild-transfer';"

LATEST_DUMP=$(ls -t '/dumps' | head -n 1)
if [ -z "$LATEST_DUMP" ]; then
    echo "Aucun fichier dump trouvé dans '/dumps'"
    exit 1
else
    echo "Restaurer le fichier dump $LATEST_DUMP dans la base de données 'wild-transfer'"
    psql -U postgres -d "wild-transfer" < "/dumps/$LATEST_DUMP"
fi
