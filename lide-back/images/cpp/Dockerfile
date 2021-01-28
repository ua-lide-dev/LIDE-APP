#image de depart
FROM gcc:latest

# metadonnées de l'image
LABEL maintainer="Quentin Maignan for LIDE" \
        version="${VERSION}"

#copie du script 
COPY buildNrun.sh buildNrun.sh

#on donne des droits pour exec le script
RUN chmod +x /buildNrun.sh

#Entrypoint
ENTRYPOINT ["/buildNrun.sh"]
