FROM node:lts-alpine3.18

WORKDIR /app

RUN apk --no-cache add curl
RUN apk add --no-cache rclone

COPY package.json package.json
RUN npm install loglevel --verbose

COPY tsconfig.json tsconfig.json

COPY src src
COPY migrations migrations

CMD npm start