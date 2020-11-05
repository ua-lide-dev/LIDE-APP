#image de depart
FROM alpine:latest

#variables env
ENV VERSION = 1 \
    UBUNTU_FRONTEND=noninteractive

# metadonnées de l'image
LABEL maintainer="Quentin Maignan for LIDE" \
	version="${VERSION}"

#install gcc

RUN apk add --update gcc
RUN apk add build-base

#CMD de base
#execution du script (buildNrun.sh) avec en entry point le fichier ?
