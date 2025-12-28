# Build stage
FROM node:20-slim AS builder

WORKDIR /app

# Install all dependencies by only copying package.json (not package-lock.json)
# This avoids the circular dependency issue in package-lock.json
COPY package.json ./
RUN npm pkg delete dependencies.backend 2>/dev/null || true && \
    npm install --legacy-peer-deps

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-slim

WORKDIR /app

# Create a non-root user
RUN groupadd -g 1001 nodejs && \
    useradd -r -u 1001 -g nodejs nestjs

# Install only production dependencies
COPY package.json ./
RUN npm pkg delete dependencies.backend 2>/dev/null || true && \
    npm install --omit=dev --legacy-peer-deps

# Copy built application from builder stage
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist

# Switch to non-root user
USER nestjs

# Expose the application port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})" || exit 1

# Start the application
CMD ["node", "dist/main"]

