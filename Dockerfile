## Multi-stage Dockerfile for building and running the Next.js app
# Uses Node 20 (recommended for Next.js v15+)

### Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Install deps (using npm). Copy package files first for caching.
COPY package.json package-lock.json* ./
RUN npm ci

# Copy app sources and build
COPY . .
RUN npm run build

### Runner stage
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy only what we need to run
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
ENV PORT=3000

# Start the Next.js production server
CMD ["npm", "run", "start"]
