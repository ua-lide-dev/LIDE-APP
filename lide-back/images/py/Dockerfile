FROM alpine:latest

RUN apk add python3 

WORKDIR /exec

COPY exec.sh /exec

RUN chmod +x exec.sh

ENTRYPOINT [ "./exec.sh" ]