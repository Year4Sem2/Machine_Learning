# Base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy only package.json to install dependencies
COPY package.json ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the app code
COPY . .

# Build the Next.js app
RUN yarn build

# Expose the port the app runs on
EXPOSE 3000

# Start the app in production mode
CMD ["yarn", "start"]


# # Set the working directory in the container
# WORKDIR /app

# # Copy only package.json (no need for package-lock.json yet)
# COPY package.json /app
# RUN npm install

# # Copy the rest of the app code
# COPY . .

# # Expose the port the app runs on
# EXPOSE 3000

# # Start the Next.js app
# CMD ["npm", "run", "dev"]