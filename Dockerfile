# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./projects/quotapp/.next/static
COPY --from=builder /app/public ./projects/quotapp/public

WORKDIR /app/projects/quotapp

EXPOSE 3000

CMD ["node", "server.js"]
