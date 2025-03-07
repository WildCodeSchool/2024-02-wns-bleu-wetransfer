FROM postgres:17

WORKDIR /app

RUN chmod +x /docker-entrypoint-initdb.d/init_db.sh

CMD ["postgres"]
