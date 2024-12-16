# Use Node.js official image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json /app
RUN npm install

# Copy project files and build
COPY . /app
RUN npm run build

# Expose port and start the app
EXPOSE 3000
CMD ["npm", "start"]

