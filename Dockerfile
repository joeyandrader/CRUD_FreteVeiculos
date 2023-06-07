FROM node:alpine3.18

ENV NODE_VERSION 20.2.0

WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3580

CMD ["npm", "start"]
