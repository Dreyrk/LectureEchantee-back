FROM node:lts-alpine

ENV ENV=production

WORKDIR /api

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]