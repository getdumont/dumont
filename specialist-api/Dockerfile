FROM mhart/alpine-node:latest

ADD . /app
WORKDIR /app

RUN cd /app \
    && npm install

CMD ["node", "index.js"]
