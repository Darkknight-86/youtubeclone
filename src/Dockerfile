# Use Node.js base image
FROM node:18

# set the working directory in the container to /app
WORKDIR /app

# copy package.json and package-lock.json to the container
COPY package*.json ./

# install any needed packges specified in package.json
RUN npm install

# copy app source to the container
COPY . .

# Install dependencies ( update catalog, install ffmpeg CLI, clean up catalog, remove unused pckgs & files)
RUN apt-get update && \
    apt-get install -y ffmpeg && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Make port 3000 available outside of this container
EXPOSE 3000
