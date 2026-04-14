FROM node:20-slim
WORKDIR /app

# Build client
COPY client/package.json ./client/
RUN npm install --prefix client
COPY client/ ./client/
RUN npm run build --prefix client

# Setup server
COPY server/package.json ./server/
RUN npm install --prefix server --omit=dev
COPY server/ ./server/

EXPOSE 8080
ENV PORT=8080
CMD ["node", "server/index.js"]
