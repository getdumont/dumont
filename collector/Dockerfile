FROM mhart/alpine-node:latest

ADD . /collector
WORKDIR /collector

RUN cd /collector \
    && npm install

CMD ["node", "index.js"]
