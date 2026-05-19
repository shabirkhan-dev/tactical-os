# Docker: Postgres + Hono API

Run PostgreSQL and Hono API with Docker Compose.

## Layout

Compose is split into modular files under **`docker/compose/`** and merged by the root **`docker-compose.yml`** via [`include`](https://docs.docker.com/compose/reference/include/) (requires **Docker Compose v2.20+**). This keeps Postgres and the API in separate files without changing how you run commands (still from the repo root).

| Fragment | Contents |
|----------|----------|
| `docker/compose/postgres.yml` | Postgres service, named volume, healthcheck |
| `docker/compose/hono-api.yml` | API build (context = repo root) and `depends_on` Postgres |

See **`docker/README.md`** for the manual `-f` fallback if your Compose build does not support `include`.

The API **`Dockerfile`** stays at **`apps/hono-api/Dockerfile`**; the build context remains the monorepo root so Bun workspaces resolve. **`.dockerignore`** stays at the repo root and applies to that context.

## Setup

1. **Copy env file** (from repo root):

   ```bash
   cp env.docker.example .env
   ```

   Edit `.env` if needed (e.g. `POSTGRES_PASSWORD`).

2. **Start all services**:

   ```bash
   docker compose up --build
   ```

   Or run in background:

   ```bash
   docker compose up -d --build
   ```

## Ports

| Service   | Host Port | Container Port |
|----------|-----------|----------------|
| Postgres | 5432      | 5432           |
| Hono API | 3001      | 3000           |

## Env file

`env.docker.example` lists:

- `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` — used by Postgres and by Hono API’s `DATABASE_URL`.
