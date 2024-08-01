FROM node:20.15-alpine

COPY package.json /web-app-be/
COPY src /web-app-be/

# set default dir so that next commands executes in /web-app-be dir
WORKDIR /web-app-be

# will execute npm install in /web-app-be because of WORKDIR
RUN npm install

CMD ["node", "index.js"]