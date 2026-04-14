FROM node:20-slim
WORKDIR /app

# Copy and install server deps
COPY server/package.json server/package-lock.json* ./server/
RUN cd server && npm install --production

# Copy and install client deps, then build
COPY client/package.json client/package-lock.json* ./client/
RUN cd client && npm install

COPY client/ ./client/
RUN cd client && npm run build

# Copy server source
COPY server/ ./server/

EXPOSE 8080
ENV PORT=8080

CMD ["node", "server/index.js"]
