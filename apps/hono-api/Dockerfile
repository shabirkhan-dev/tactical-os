# Hono API + Prisma. Build from repo root: docker compose build hono-api
# Context must be repo root so workspace deps (@starter/logger) resolve.

FROM oven/bun:1-alpine

WORKDIR /app

# Monorepo: root package.json + lockfile + workspaces needed for hono-api
COPY package.json bun.lock ./
COPY packages ./packages
COPY patches ./patches
COPY apps/hono-api ./apps/hono-api

# Install workspace deps; skip lifecycle scripts (prepare/postinstall need git/lefthook)
RUN bun install --ignore-scripts

# Generate Prisma client and set app dir
WORKDIR /app/apps/hono-api
RUN bun run db:generate

EXPOSE 3000

ENV NODE_ENV=production
CMD ["bun", "run", "start"]
