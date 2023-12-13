# Use the official Node.js LTS (Long Term Support) image as the base image
FROM node:18.17-alpine AS build
LABEL authors="vathmos"

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# udpdate npm
RUN npm install -g npm@10.2.4

# Install dependencies
RUN npm install

# Install git just for the workspace
RUN apk add --no-cache git

# Copy the rest of the application code to the container
COPY . .

# Expose the port on which the NestJS application will run
EXPOSE 3000