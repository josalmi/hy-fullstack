FROM node:9-alpine

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV:-production}

WORKDIR /app
COPY package.json ./
RUN npm install && npm cache clean --force

COPY . ./

CMD npm start
