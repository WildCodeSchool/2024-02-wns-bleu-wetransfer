FROM node:lts-alpine3.18

RUN apk --no-cache add curl

WORKDIR /app

COPY . /app/

RUN npm install loglevel --verbose


COPY src src

CMD npm run dev