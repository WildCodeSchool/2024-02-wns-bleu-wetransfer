FROM node:lts-alpine

RUN apk --no-cache add curl

WORKDIR /app
RUN mkdir uploads

COPY tsconfig.json tsconfig.json

COPY package.json package.json
RUN npm i

COPY src src

CMD npm start