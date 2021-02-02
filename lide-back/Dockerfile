FROM docker:latest
RUN apk add nodejs
RUN apk add npm
RUN apk add zip
WORKDIR /app
COPY package.json ./
RUN npm install