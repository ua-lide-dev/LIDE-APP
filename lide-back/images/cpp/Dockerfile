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

#copie du script 
COPY buildNrun.sh

#on donne des droits pour exec le script
RUN chmod 777 buildNrun.sh

#CMD de base
#execution du script (buildNrun.sh) avec en entry point le fichier ?
