FROM postgres:16

WORKDIR /app

COPY dumps /dumps

RUN echo "Attente de PostgreSQL avant de procéder à l'importation..." && \
    until pg_isready -U postgres; do \
        echo "Attente de PostgreSQL..."; \
        sleep 2; \
    done && \
    psql -U postgres -c "SELECT 'CREATE DATABASE \"wild-transfer\"' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'wild-transfer') \gexec" && \
    LATEST_DUMP=$(ls -t '/dumps' | head -n 1) && \
    if [ -z "$LATEST_DUMP" ]; then \
        echo "Aucun fichier dump trouvé dans '/db/dumps'"; \
        exit 1; \
    else \
        echo "Restaurer le fichier dump $LATEST_DUMP dans la base de données 'wild-transfer"; \
        psql -U postgres -d "wild-transfer" < "db/dumps/$LATEST_DUMP"; \
    fi && \
    pkill postgres

# Démarrer PostgreSQL
CMD ["postgres"]
