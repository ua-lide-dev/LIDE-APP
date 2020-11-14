FROM alpine:latest
USER root

# Install python/pip
ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools

COPY fichier.py /fichier.py
COPY buildNrun.sh /buildNrun.sh
RUN chmod "+x" buildNrun.sh

ENTRYPOINT ["./buildNrun.sh","fichier.py"]

