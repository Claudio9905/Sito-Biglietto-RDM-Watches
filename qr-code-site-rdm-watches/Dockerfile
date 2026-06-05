# 1️⃣ STAGE DI BUILD
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2️⃣ STAGE DI PRODUZIONE
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80