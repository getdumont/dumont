FROM golang:latest

ADD . /go/github.com/getdumont/dumont/specialist-api

WORKDIR /go/github.com/getdumont/dumont/specialist-api

RUN cd /go/github.com/getdumont/dumont/specialist-api \
    && go get \
    && go build

CMD []
ENTRYPOINT ["/go/bin/specialist-api"]