# grab from hub.docker.com our base image
FROM node:lts-alpine

# Create app directory
WORKDIR /var/www/student-time-management

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install

# bundle app source
COPY . .

# build the app
RUN npm run build

# keep the container running
CMD [ "npm", "run", "start" ]
