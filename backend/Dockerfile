FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# crear carpeta de sqlite dentro del contenedor
RUN mkdir -p /data/sqlite

# construir app
# RUN npm run build

CMD ["npm", "run", "start"]
