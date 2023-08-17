FROM node:lts-alpine

ENV ENV=test

WORKDIR /api

COPY package*.json .

RUN npm install

COPY . .