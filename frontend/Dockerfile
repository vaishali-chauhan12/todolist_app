FROM node:20.15-alpine

COPY package.json /web-app-fe/
COPY src /web-app-fe/src
COPY public /web-app-fe/public


# set default dir so that next commands executes in /web-app-fe dir
WORKDIR /web-app-fe

# will execute npm install in /web-app-fe
RUN npm install

CMD ["npm", "run", "start"]