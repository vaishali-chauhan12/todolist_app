FROM node:20.15-alpine

COPY package.json /web-app-be/
COPY src /web-app-be/

WORKDIR /web-app-be

RUN npm install

CMD ["node", "index.js"]