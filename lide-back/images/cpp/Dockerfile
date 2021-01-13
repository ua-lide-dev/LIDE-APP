#image de depart
FROM gcc:latest

# metadonnées de l'image
LABEL maintainer="Quentin Maignan for LIDE" \
        version="${VERSION}"

WORKDIR /exec

#copie du script 
COPY buildNrun.sh /exec/buildNrun.sh

#on donne des droits pour exec le script
RUN chmod +x /exec/buildNrun.sh

#Entrypoint
ENTRYPOINT ["/exec/buildNrun.sh"]
