FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

ENV SERVICE_URL_BACKEND=http://pwwsc0cccowg0g0wo8wg8gck.146.235.223.8.sslip.io

COPY . .
RUN npm run build

FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
