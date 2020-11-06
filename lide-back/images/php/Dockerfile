FROM alpine:latest
USER root

# Install phh 

RUN apk add --update php php-curl php-gd php-intl php-json php-mbstring php-xml php-zip

COPY fichier.php /fichier.php
COPY buildNrun.sh /buildNrun.sh
RUN chmod "+x" buildNrun.sh

ENTRYPOINT ["./buildNrun.sh"]



