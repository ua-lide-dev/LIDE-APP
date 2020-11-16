FROM alpine:latest
USER root

#variables env
ENV VERSION = 1 \
    UBUNTU_FRONTEND=noninteractive

# metadonnées de l'image
LABEL maintainer="Quentin Maignan for LIDE" \
        version="${VERSION}"


RUN apk update
RUN apk fetch openjdk8
RUN apk add openjdk8
ENV JAVA_HOME=/usr/lib/jvm/java-1.8-openjdk
ENV PATH="$JAVA_HOME/bin:${PATH}"

COPY fichier.java /fichier.java
COPY buildNrun.sh /buildNrun.sh
RUN chmod "+x" buildNrun.sh

ENTRYPOINT ["./buildNrun.sh"]

