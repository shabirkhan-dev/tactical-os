# Starter Kit

Production-ready monorepo starter built with **Bun + Turborepo**.

It includes multiple runnable apps (web, mobile, APIs, docs, systems demos), shared packages,
polyglot scripts, architecture checks, hooks, CI/CD, security workflows, Docker, and a Dev
Container.

## Quick start

**Prerequisites**

- [Bun](https://bun.sh) `1.3.11`
- Optional: [just](https://github.com/casey/just), Docker Compose `v2.20+`, Rust, clang toolchain

```bash
git clone <this-repo>
cd <repo>
bun install
bun run prepare
bun run dev
```

## Monorepo at a glance

| Area | Purpose |
| --- | --- |
| `apps/` | Runnable products/services: web, mobile, APIs, docs, PWA, and language demos |
| `packages/` | Shared workspace packages used across apps (`@starter/*`) |
| `scripts/` | Utility + test scripts in Bash/Lua/Python |
| `docs/` | Architecture, Docker, QoL, and override documentation |
| `docker/` | Docker Compose fragments used by root `docker-compose.yml` |
| `.github/workflows/` | CI, CD, and security automation |
| `.devcontainer/` | Reproducible development environment |

## Apps (each piece)

| App | Stack | What it covers |
| --- | --- | --- |
| `apps/web` | Next.js 16, React 19, Tailwind 4 | Main web app + Vitest + Playwright e2e |
| `apps/mobile` | Expo SDK 55, Expo Router, React Native, NativeWind | Mobile app with file-based routing |
| `apps/hono-api` | Hono, Prisma, PostgreSQL | Bun-first REST API with DB workflows |
| `apps/fastapi` | FastAPI, uv, Ruff, pytest | Python API variant |
| `apps/nest-api` | NestJS 11, JWT/auth modules, Jest | Nest API scaffold (currently being added) |
| `apps/pwa` | Bun build pipeline, TS, service worker | Lightweight browser-first PWA |
| `apps/docs` | Next.js + Fumadocs + MDX | Documentation site |
| `apps/rust` | Cargo, clippy, rustfmt | Rust binary app and tests |
| `apps/c` | C17, clang-format, clang-tidy | C binary app and checks |

## Shared packages

| Package | Purpose |
| --- | --- |
| `packages/ui` | Shared web UI primitives (`@starter/ui`) |
| `packages/logger` | Shared logger for TypeScript and Rust |
| `packages/tailwind-config` | Shared Tailwind theme/tokens |
| `packages/typescript-config` | Shared TS config presets (`base`, `nextjs`, `expo`) |

## Root commands (single interface)

Run from repo root with `bun run <task>` (or `just <task>` when available):

| Command | Purpose |
| --- | --- |
| `bun run dev` | Start workspace development servers with Turbo |
| `bun run build` | Build all apps/packages |
| `bun run start` | Start app `start` scripts through Turbo |
| `bun run lint` | Lint workspace + script directories |
| `bun run lint:fix` | Auto-fix lint issues where supported |
| `bun run format` | Format TS/JS + shell/Lua/Python + Rust + C |
| `bun run typecheck` | Run TypeScript type checks |
| `bun run test` | Run workspace tests + script tests |
| `bun run test:coverage` | Run coverage/multi-language test pass |
| `bun run test:e2e:web` | Run Playwright e2e for web app |
| `bun run architecture:check` | Enforce import boundary rules |
| `bun run preflight` | Lint + typecheck + test |

## Tooling and features

- **Package manager:** Bun workspaces (`apps/*`, `packages/*`)
- **Monorepo orchestration:** Turborepo task pipeline
- **TS/JS lint + format:** Biome (`biome.json`, tabs, line width 100)
- **Git hooks:** Lefthook (format/lint/typecheck/architecture + file-size + secret scan + commit message checks)
- **Architecture guardrails:** `scripts/architecture/check-boundaries.sh`
- **Polyglot quality tooling:**
  - Bash: ShellCheck + shfmt
  - Lua: luacheck + stylua
  - Python: Ruff + pytest
  - Rust: rustfmt + clippy + cargo test
  - C: clang-format + clang-tidy
- **CI/CD + security:** GitHub Actions for CI gates, deploy template, dependency review, CodeQL, Dependabot
- **Workspace conventions:** shared TS configs, shared Tailwind tokens, shared logger package

## Running apps directly

You can target one app with `bun --cwd <path> run <script>`, for example:

- `bun --cwd apps/web run dev`
- `bun --cwd apps/mobile run start`
- `bun --cwd apps/hono-api run dev`
- `bun --cwd apps/fastapi run dev`
- `bun --cwd apps/docs run dev`
- `bun --cwd apps/pwa run dev`
- `bun --cwd apps/rust run dev`
- `bun --cwd apps/c run dev`

## Docker

Postgres + Hono API stack:

```bash
cp env.docker.example .env
docker compose up --build
```

- Compose fragments live in `docker/compose/`
- Root `docker-compose.yml` includes fragment files
- See [docs/docker.md](docs/docker.md) for env/ports/full usage

## Reproducible development

- **Dev Container:** `.devcontainer/` includes Bun, Rust, C, Python, Lua toolchain
- **Agent guidance:** `AGENTS.md` + `.cursor/rules/`
- **Project standards:** EditorConfig + Biome + Lefthook + architecture checks

## Documentation map

- [PROJECT.md](PROJECT.md) - project overview and conventions
- [DESIGN.md](DESIGN.md) - design-system brief for humans and AI agents
- [docs/ai-first-starter-workflow.md](docs/ai-first-starter-workflow.md) - starter-kit audit and AI-first workflow roadmap
- [docs/QoL.md](docs/QoL.md) - developer quality-of-life stack
- [docs/docker.md](docs/docker.md) - Docker setup and flow
- [docs/architecture/README.md](docs/architecture/README.md) - architecture baseline and rules
- [docs/overrides.md](docs/overrides.md) - override policy
- [scripts/README.md](scripts/README.md) - script layout and usage

## License

Dual-licensed under **MIT** or **Apache-2.0** at your option:
[LICENSE-MIT](LICENSE-MIT), [LICENSE-Apache-2.0](LICENSE-Apache-2.0).
