FROM docker:latest
RUN apk add nodejs
RUN apk add npm
WORKDIR /app
COPY package.json ./
RUN npm install