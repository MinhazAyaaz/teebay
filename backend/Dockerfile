# Backend Dockerfile (NestJS + Prisma)
FROM node:22-alpine AS base
WORKDIR /app

# Enable corepack for pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Build application
FROM deps AS build
WORKDIR /app
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY prisma ./prisma
COPY src ./src
RUN pnpm prisma generate
RUN pnpm build

# Runtime image
FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files
COPY package.json pnpm-lock.yaml ./
COPY --from=build /app/prisma ./prisma

# Install production deps + prisma CLI (needed for generation)
RUN pnpm install --prod --frozen-lockfile && \
    pnpm add -D prisma && \
    pnpm prisma generate && \
    pnpm remove -D prisma

# Copy built artifacts
COPY --from=build /app/dist ./dist

# Copy entrypoint
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 3000

ENV PORT=3000
CMD ["/usr/local/bin/docker-entrypoint.sh"]