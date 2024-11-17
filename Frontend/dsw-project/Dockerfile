FROM node:20.11.1-alpine3.19 AS builder
RUN rm -rf /app
RUN mkdir -p /app
WORKDIR /app
COPY package*.json /app
RUN npm install
COPY . /app 
RUN npm run build
#second step
FROM nginx:1.26-alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist/dsw-project/*  /usr/share/nginx/html


