FROM node:16
WORKDIR /usr/src/server
COPY package.json .
RUN npm install
COPY . .

RUN npm run --script build
CMD node dist/main.js