# Use the official Node.js 18 Alpine image as a base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the backend's package.json and package-lock.json files from Node-backend
COPY Node-backend/package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the backend code from Node-backend
COPY Node-backend/ ./

# Expose the port that the app runs on (adjust as needed)
EXPOSE 3000

# Command to run the application
CMD ["node", "index.js"]
