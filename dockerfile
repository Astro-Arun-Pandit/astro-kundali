# Use a lightweight Node.js image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy only package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install app dependencies
RUN npm install --ignore-scripts

# rebuilding bcrypt package due to --ignore-scripts above which do not rebuilt.
RUN npm rebuild bcrypt
# RUN npm install --production 

ENV PORT=5600

# Copy the rest of the application files
COPY . .

# Expose the port the app runs on
EXPOSE 5600

# Run migration command
RUN npm run migrate:latest

# Run All The Seeds
RUN npx knex seed:run


# Start the Node.js application
CMD ["npm", "run", "start"]
