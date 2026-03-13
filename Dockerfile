# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy all files
COPY . .

# Install all dependencies
RUN npm ci

# Generate Prisma client
RUN npx prisma generate

# Build the Next.js app
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Copy necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

# Start with migrations
CMD ["sh", "-c", "echo 'Running migrations...' && ./node_modules/.bin/prisma migrate deploy && echo 'Starting app...' && node server.js"]
