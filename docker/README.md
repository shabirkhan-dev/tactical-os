# Docker layout

Compose is split into **fragments** under `compose/` so each stack concern stays in one file. The root `docker-compose.yml` uses [`include`](https://docs.docker.com/compose/reference/include/) (Compose v2.20+) to merge them.

| File | Role |
|------|------|
| `compose/postgres.yml` | Postgres 16, volume, healthcheck |
| `compose/rust-api.yml` | Optional Rust API image (demo) |

The production Nest API (`apps/nest-api`) runs on the host during early phases. A compose fragment for it will be added when the database foundation lands.

**Env:** copy `env.docker.example` from the repo root to `.env` (Compose reads it from the project directory). See the docs app `/docs/docker`.

**Manual merge (no `include`):**

```bash
docker compose -f docker/compose/postgres.yml --project-name school-os up -d
```
