# Dockerfile in /client
FROM node:20.17.0

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port Vite runs on
EXPOSE 3015

# Start the Vite development server
CMD ["npm", "run", "dev"]
