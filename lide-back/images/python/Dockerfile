FROM python:3

# Install python/pip
RUN pip3 install --no-cache --upgrade pip setuptools

COPY buildNrun.sh /buildNrun.sh
RUN chmod "+x" buildNrun.sh

ENTRYPOINT ["./buildNrun.sh"]