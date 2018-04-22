FROM alpine:latest

ADD . /dumont
WORKDIR /dumont

# Install Stuff From APK
RUN apk update \
    && apk add bash \
    && apk --no-cache add curl \
    && apk add nodejs

# Install Python 3
RUN apk add --no-cache python3 \
    && python3 -m ensurepip \
    && rm -r /usr/lib/python*/ensurepip \
    && pip3 install --upgrade pip setuptools \
    && if [ ! -e /usr/bin/pip ]; then ln -s pip3 /usr/bin/pip ; fi \
    && if [[ ! -e /usr/bin/python ]]; then ln -sf /usr/bin/python3 /usr/bin/python; fi \
    && rm -r /root/.cache

# Install Dependencies (APPA, Node Packages, PIP Packages)
RUN cd /dumont \
    && curl -O https://github.com/getappa/appa/releases/download/v0.0.2-razor/appa \
    && chmod +x ./appa \
    && npm install


CMD ["./appa", "appa.config.yml"]
