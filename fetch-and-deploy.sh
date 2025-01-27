#!/bin/sh
# fetch-and-deploy.sh
docker compose -f docker-compose.build.prod.yml down && \
    docker compose -f docker-compose.build.prod.yml pull && \
    GATEWAY_PORT=8001 docker compose -f docker-compose.build.prod.yml up -d;

