FROM node:alpine
WORKDIR ./
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
#ENV NODE_PATH=./src
RUN npm install
RUN npm run build
RUN npm install -g serve
CMD ["serve", "-s", "build"]