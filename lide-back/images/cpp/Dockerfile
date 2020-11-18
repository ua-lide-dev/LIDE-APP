#image de depart
FROM gcc:latest

#variables env
ENV VERSION = 1 \
    UBUNTU_FRONTEND=noninteractive

# metadonnées de l'image
LABEL maintainer="Quentin Maignan for LIDE" \
        version="${VERSION}"

#copie du script 
COPY buildNrun.sh /buildNrun.sh

#on donne des droits pour exec le script
RUN chmod +x buildNrun.sh

#Entrypoint
ENTRYPOINT ["./buildNrun.sh"]