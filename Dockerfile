# Build stage
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /build

# Install pnpm and basic security tools
RUN apk add --no-cache wget curl && \
    npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies with strict security
RUN pnpm install --frozen-lockfile --ignore-scripts

# Copy source code
COPY . .

# Build TypeScript
RUN pnpm build

# Production stage
FROM node:22-alpine AS runner

# Set working directory
WORKDIR /app

# Add non-root user for security
RUN addgroup -S mcp && \
    adduser -S mcpuser -G mcp && \
    apk add --no-cache wget curl

# Install pnpm (needed for production dependencies)
RUN npm install -g pnpm

# Copy package files
COPY --chown=mcpuser:mcp package.json pnpm-lock.yaml ./

# Install production dependencies only with strict security
RUN pnpm install --frozen-lockfile --prod --ignore-scripts

# Copy built files from builder
COPY --chown=mcpuser:mcp --from=builder /build/dist ./dist

# Copy and prepare configuration files
COPY --chown=mcpuser:mcp wp-sites.json.example /app/config/wp-sites.json.example
COPY --chown=mcpuser:mcp .env.example /app/.env.example
RUN cp /app/config/wp-sites.json.example /app/config/wp-sites.json && \
    cp /app/.env.example /app/.env

# Set environment variables
ENV NODE_ENV=production \
    DEBUG=claudeus:* \
    MCP_STDIO=true

# Create config directory with proper permissions
RUN mkdir -p /app/config && \
    chown mcpuser:mcp /app/config

# Create volume mount points for configs
VOLUME ["/app/config"]

# Switch to non-root user
USER mcpuser

# Use sh for Smithery compatibility
SHELL ["/bin/sh", "-c"]

# Add healthcheck (as non-root user)
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Set entrypoint for stdio MCP server
ENTRYPOINT ["node", "dist/index.js"] 