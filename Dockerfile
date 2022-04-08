FROM golang:1.16-buster

RUN go version
ENV GOPATH=/

COPY ./ ./

RUN apt-get update
RUN apt-get -y install postgresql-client

RUN chmod +x wait-for-postgres.sh

RUN go mod download
RUN go build -o english_learning_webapp ./cmd/main.go

EXPOSE 8000

CMD ["./english_learning_webapp"]