FROM node:23.2-alpine3.20 AS builder
RUN rm -rf /app
RUN mkdir -p /app
WORKDIR /app
COPY package*.json /app
RUN npm install
COPY . /app
ARG API_URL_
ARG API_KEY_

# Reemplaza las variables en el archivo environment.staging.ts
RUN sed -i "s|\$ENV.API_URL|${API_URL_}|g" /app/src/environments/environment.staging.ts
RUN sed -i "s|\$ENV.API_KEY|${API_KEY_}|g" /app/src/environments/environment.staging.ts
RUN cat /app/src/environments/environment.staging.ts
RUN npm run build:staging
#second step
FROM nginx:1.26-alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist/dsw-project/*  /usr/share/nginx/html


