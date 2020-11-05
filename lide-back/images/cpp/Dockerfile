#docker build --tag alpinecpp .
#docker run -it --rm alpinecpp

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
COPY buildNrun.sh /buildNrun.sh
COPY fichier.cpp /fichier.cpp

#on donne des droits pour exec le script
RUN chmod "+x" buildNrun.sh

#CMD de base
#execution du script (buildNrun.sh) avec en entrypoint le fichier ?
ENTRYPOINT ["./buildNrun.sh","fichier.cpp"]


