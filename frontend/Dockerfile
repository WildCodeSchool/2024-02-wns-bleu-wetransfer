FROM node:lts-alpine

RUN apk --no-cache add curl

WORKDIR /app

COPY . /app/

RUN npm install

COPY src src

CMD npm run dev