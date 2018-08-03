FROM mhart/alpine-node:latest

ADD . /app
WORKDIR /app

RUN cd /app \
    && npm install \
    && npm run build \
    && npm install -g http-server

CMD ["http-server", "dist", "-p", "3000"]
