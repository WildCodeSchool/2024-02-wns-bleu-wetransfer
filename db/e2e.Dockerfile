FROM postgres:17

WORKDIR /app

COPY init_db.sh /docker-entrypoint-initdb.d/init_db.sh
RUN chmod +x /docker-entrypoint-initdb.d/init_db.sh

CMD ["postgres"]
