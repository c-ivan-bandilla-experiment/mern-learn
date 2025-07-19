# Use official Node.js LTS image
FROM node:20.19.0

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your app
COPY . .

# Expose your backend port (matches SERVER_PORT in .env)
EXPOSE 5001

# Start the server
CMD ["npm", "run", "dev"]