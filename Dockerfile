FROM node:16.3.0-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install package.json

COPY . .

CMD ["npm", "start"]