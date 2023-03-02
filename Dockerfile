# Stage 1: Use yarn to build the app
FROM node:14 as builder
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . ./
RUN npm build

# Stage 2: Copy the JS React SPA into the Nginx HTML directory
FROM bitnami/nginx:latest
COPY --from=build /usr/src/app/build .
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
