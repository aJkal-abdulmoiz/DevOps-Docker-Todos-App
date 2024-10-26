# Use Node.js image
FROM node:16

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy app files
COPY . .

# Build the React app
RUN npm run build

# Serve the built app
RUN npm install -g serve
CMD ["serve", "-s", "build"]
