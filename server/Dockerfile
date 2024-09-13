# Use the official Node.js image.
# https://hub.docker.com/_/node
FROM node:19.9

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3016

# Start the app
CMD ["npm", "run" , "dev"]
