FROM node:16

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install package.json

COPY . .

CMD ["npm", "start"]