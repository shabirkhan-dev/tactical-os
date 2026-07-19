# Starter

Production-ready monorepo starter built with **Bun + Turborepo**.

Apps: Next.js web, Expo mobile, NestJS API, Fumadocs docs, optional Rust demo. Shared UI,
hooks, CI, Docker Compose, and a slim Dev Container.

> Workspace packages use the `@school-os/*` npm scope (technical imports). Product naming
> in docs and UI is **Starter**.

## Quick start

**Prerequisites**

- [Bun](https://bun.sh) `1.3.13`
- Optional: Docker Compose `v2.20+`, Rust toolchain (for `apps/rust`)

```bash
git clone https://github.com/shabirkhan-dev/starter.git
cd starter
bun install
bun run prepare
bun run dev
```

| App | URL (dev) |
| --- | --- |
| Web | http://localhost:3000 |
| Nest API | http://localhost:4000 (`/api/v1/health`, `/api/docs`) |
| Docs | http://localhost:3002/docs |

## Monorepo layout

| Area | Purpose |
| --- | --- |
| `apps/web` | Next.js 16 admin + marketing + auth/billing |
| `apps/mobile` | Expo SDK 57 (auth, billing via hosted checkout) |
| `apps/nest-api` | NestJS API spine (Drizzle + Postgres/Neon) |
| `apps/docs` | Fumadocs documentation site |
| `apps/ai-api` | Optional FastAPI AI assist (Nest proxies; not public) |
| `apps/rust` | Optional Rust/Axum demo |
| `packages/*` | Shared `@school-os/ui`, logger, TypeScript configs |
| `docker/` | Compose fragments (Postgres, Nest, web, optional profiles) |
| `.github/workflows/` | CI, CD, Security |
| `.devcontainer/` | Bun + Rust + Python/Bash tooling |

## Root commands

| Command | What it does |
| --- | --- |
| `bun install` | Install workspace deps |
| `bun run prepare` | Install Lefthook git hooks |
| `bun run dev` | Start all app dev servers (Turbo) |
| `bun run build` | Build all apps |
| `bun run lint` / `bun run format` | Biome + ShellCheck + ruff (+ cargo fmt) |
| `bun run typecheck` | TypeScript across packages |
| `bun run test` / `bun run test:coverage` | Unit/coverage gates |
| `bun run test:e2e:web` | Playwright e2e for web |
| `bun run architecture:check` | Import boundary enforcement |

## Deploy

See `/docs/deploy` in the docs app. Short version:

- **Web / Docs** — Vercel (`apps/web`, `apps/docs` each have `vercel.json`)
- **Nest API** — Render Blueprint (`render.yaml`) + Neon Postgres
- Cross-origin cookies: set `COOKIE_SAME_SITE=none` when web and API are on different sites

```bash
cp env.docker.example .env
docker compose up -d --build
```

## License

MIT