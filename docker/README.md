# Docker layout

Compose is split into **fragments** under `compose/` so each stack concern stays in one file. The root `docker-compose.yml` uses [`include`](https://docs.docker.com/compose/reference/include/) (Compose v2.20+) to merge them.

| File | Role |
|------|------|
| `compose/postgres.yml` | Postgres 16, volume, healthcheck |
| `compose/hono-api.yml` | API image build + `depends_on` Postgres |

**Build context** for the API remains the **repository root** (required for Bun workspaces and `apps/hono-api/Dockerfile`). The `.dockerignore` at the repo root applies to that build.

**Env:** copy `env.docker.example` from the repo root to `.env` (Compose reads it from the project directory). See `docs/docker.md`.

**Manual merge (no `include`):** you can still run:

```bash
docker compose -f docker/compose/postgres.yml -f docker/compose/hono-api.yml --project-name starter up --build -d
```
