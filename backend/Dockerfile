FROM node:slim AS builder

# Docker working directory
WORKDIR /app

# Copying file into APP directory of docker
COPY ./package.json /app/

# Then install the NPM module
RUN yarn

# Copy current directory to APP folder
COPY . /app/

# Then build
RUN yarn build 

EXPOSE 3001
CMD [ "yarn", "start:prod" ]