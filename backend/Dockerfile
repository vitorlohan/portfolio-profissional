# ============================================
# Dockerfile - Portfolio Backend
# ============================================

# --- Build stage ---
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# --- Production stage ---
FROM node:20-alpine

RUN apk add --no-cache wget

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY package.json ./
COPY src ./src

USER node

EXPOSE 5000

CMD ["node", "src/server.js"]
