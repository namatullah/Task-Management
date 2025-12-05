FROM node:20.11-alpine

WORKDIR /app

RUN npm config set registry https://registry.npmjs.org/ && \
    npm config set fetch-retry-mintimeout 120000 && \
    npm config set fetch-retry-maxtimeout 300000 && \
    npm config set fetch-retries 10 && \
    npm config set maxsockets 1 && \
    npm config set progress false

COPY package*.json ./

RUN npm install --no-audit --no-fund --prefer-offline

COPY . .

EXPOSE 3001
CMD ["npm", "run", "start:dev"]