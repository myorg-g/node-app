# Use the official Node.js 16 Alpine image as a base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code to the container
COPY . .

# Expose the port that the app runs on
EXPOSE 8000

# Command to run the application
CMD ["node", "server.js"]
