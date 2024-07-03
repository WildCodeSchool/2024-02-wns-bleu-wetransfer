FROM node:lts-alpine

WORKDIR /app

RUN apk --no-cache add curl

COPY package.json package.json
RUN npm install

COPY tsconfig.json tsconfig.json

COPY src src

CMD npm start