FROM node:20-alpine

WORKDIR /

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]
