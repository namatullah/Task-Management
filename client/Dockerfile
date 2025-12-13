# DEVELOPMENT-ONLY DOCKERFILE (no production stage)
# Save as Dockerfile.dev or use target development

FROM node:20.11-alpine

WORKDIR /app

# Set npm configs
RUN npm config set fetch-retry-mintimeout 120000 && \
    npm config set fetch-retry-maxtimeout 300000 && \
    npm config set fetch-retries 10 && \
    npm config set maxsockets 1
# 1. Copy ONLY package files first (for caching)
COPY package*.json ./

# 2. Install dependencies (cached unless package.json changes)
RUN npm install --legacy-peer-deps --no-audit --no-fund --prefer-offline

# 3. Copy source code AFTER (changes don't trigger npm install)
COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]
