# Set the base image
FROM node:18.3.0-alpine3.14 as builder

# Set the working directory
WORKDIR /app

# Set args to receive from docker-compose.yml
ARG VITE_API_URL

ARG DOCK_EXPOSED_PORT

#set args as env vars
ENV VITE_API_URL=$VITE_API_URL


# Copy the package.json and yarn.lock files to the container
COPY ./package.json /app/

# Install dependencies
RUN yarn install --no-cache

# Copy the rest of the app files to the container
COPY . /app/

# Build the app
RUN yarn build

# Set the base image for the production build
FROM nginx:alpine

# Copy the build files to the container
COPY --from=builder /app/build /usr/share/nginx/html

# Copy the nginx configuration file to the container
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 3000
EXPOSE $DOCK_EXPOSED_PORT

# Start the nginx server
CMD ["nginx", "-g", "daemon off;"]

