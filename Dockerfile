FROM alpine:latest

ADD . /dumont
WORKDIR /dumont

RUN apk add --no-cache python3 \
    && python3 -m ensurepip \
    && rm -r /usr/lib/python*/ensurepip \
    && pip3 install --upgrade pip setuptools \
    && if [ ! -e /usr/bin/pip ]; then ln -s pip3 /usr/bin/pip ; fi \
    && if [[ ! -e /usr/bin/python ]]; then ln -sf /usr/bin/python3 /usr/bin/python; fi \
    && rm -r /root/.cache \
    && apk add nodejs=8.11.1 \
    && cd /dumont \
    && curl https://github.com/getappa/appa/releases/download/v0.0.2-razor/appa \
    && npm install


CMD ["./appa", "appa.config.yml"]
