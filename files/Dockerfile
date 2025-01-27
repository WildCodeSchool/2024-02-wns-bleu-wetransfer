FROM node:lts-alpine3.18

RUN apk --no-cache add curl

WORKDIR /app
RUN mkdir UPLOADS_DIR

COPY tsconfig.json tsconfig.json

COPY package.json package.json
RUN npm install loglevel --verbose

COPY src src

CMD npm start