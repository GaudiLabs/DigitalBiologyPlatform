FROM node:alpine
WORKDIR ./
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
#ENV NODE_PATH=./src
RUN npm install
CMD ["npm", "run", "start"]