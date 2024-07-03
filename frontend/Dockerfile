FROM node:lts-alpine

RUN apk --no-cache add curl

WORKDIR /app

COPY public public
COPY codegen.ts codegen.ts
COPY next-env.d.ts next-env.d.ts
COPY next.config.js next.config.js
COPY package.json package.json
COPY tsconfig.json tsconfig.json

RUN npm install

COPY src src

CMD npm run dev