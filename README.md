# School OS

Production-ready monorepo school-os built with **Bun + Turborepo**.

It includes multiple runnable apps (web, mobile, Nest API, docs, Rust), shared packages,
polyglot scripts, architecture checks, hooks, CI/CD, security workflows, Docker, and a Dev
Container.

## Quick start

**Prerequisites**

- [Bun](https://bun.sh) `1.3.11`
- Optional: Docker Compose `v2.20+`, Rust

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
| `apps/` | Runnable products/services: web, mobile, Nest API, docs, Rust |
| `packages/` | Shared workspace packages used across apps (`@school-os/*`) |
| `scripts/` | Utility + test scripts in Bash/Python |
| `docker/` | Docker Compose fragments used by root `docker-compose.yml` |
| `.github/workflows/` | CI, CD, and security automation |
| `.devcontainer/` | Reproducible development environment |

## Apps (each piece)

| App | Stack | What it covers |
| --- | --- | --- |
| `apps/web` | Next.js 16, React 19, Tailwind 4 | Main web app + Vitest + Playwright e2e |
| `apps/mobile` | Expo SDK 57, Expo Router, React Native, NativeWind | Mobile app with file-based routing |
| `apps/nest-api` | NestJS 11, Zod, Jest | Production API spine (REST, PostgreSQL in later phases) |
| `apps/docs` | Next.js + Fumadocs + MDX | Documentation site |
| `apps/rust` | Cargo, clippy, rustfmt | Rust binary app and tests |

## Shared packages

| Package | Purpose |
| --- | --- |
| `packages/ui` | Shared web UI primitives (`@school-os/ui`) + design tokens |
| `packages/logger` | Shared logger for TypeScript and Rust |
| `packages/typescript-config` | Shared TS config presets (`base`, `nextjs`, `expo`) |

## Root commands (single interface)

Run from repo root with `bun run <task>`:

| Command | Purpose |
| --- | --- |
| `bun run dev` | Start workspace development servers with Turbo |
| `bun run build` | Build all apps/packages |
| `bun run start` | Start app `start` scripts through Turbo |
| `bun run lint` | Lint workspace + script directories |
| `bun run lint:fix` | Auto-fix lint issues where supported |
| `bun run format` | Format TS/JS + shell/Python + Rust |
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
  - Python: Ruff + pytest
  - Rust: rustfmt + clippy + cargo test
- **CI/CD + security:** GitHub Actions for CI gates, deploy template, dependency review, CodeQL, Dependabot
- **Workspace conventions:** shared TS configs, shared Tailwind tokens, shared logger package

## Running apps directly

You can target one app with `bun --cwd <path> run <script>`, for example:

- `bun --cwd apps/web run dev`
- `bun --cwd apps/mobile run start`
- `bun --cwd apps/nest-api run dev`
- `bun --cwd apps/docs run dev`
- `bun --cwd apps/rust run dev`

### shadcn/ui (monorepo)

Add components from the **app** directory so the CLI installs primitives into `packages/ui`:

```bash
cd apps/web
bunx --bun shadcn@latest add button
```

Import shared UI as `@school-os/ui/components/...`. See `packages/ui/README.md`.

## Docker

Postgres for local development (Nest API runs on the host for now):

```bash
cp env.docker.example .env
docker compose up -d
bun --cwd apps/nest-api run dev
```


- Compose fragments live in `docker/compose/`
- Root `docker-compose.yml` includes fragment files
- See [apps/docs](apps/docs) (`/docs/docker`) for env/ports/full usage

## Reproducible development

- **Dev Container:** `.devcontainer/` includes Bun, Rust, C, Python, Lua toolchain
- **Agent guidance:** `AGENTS.md` + `.cursor/rules/`
- **Project standards:** EditorConfig + Biome + Lefthook + architecture checks

## Documentation map

Human and agent docs live in the **docs app** (`apps/docs`). Run:

```bash
bun --cwd apps/docs run dev
```

Then open:

- [/docs](http://localhost:3002/docs) — docs home
- [/docs/quick-start](http://localhost:3002/docs/quick-start)
- [/docs/production-roadmap](http://localhost:3002/docs/production-roadmap)
- [/docs/product-system-design](http://localhost:3002/docs/product-system-design)
- [/docs/architecture](http://localhost:3002/docs/architecture)
- [/docs/docker](http://localhost:3002/docs/docker)
- [/docs/qol](http://localhost:3002/docs/qol)
- [/docs/ai-first-workflow](http://localhost:3002/docs/ai-first-workflow)
- [/docs/overrides](http://localhost:3002/docs/overrides)

Root quick refs (not migrated into the docs site):

- [PROJECT.md](PROJECT.md) - project overview and conventions
- [DESIGN.md](DESIGN.md) - design-system brief for humans and AI agents
- [scripts/README.md](scripts/README.md) - script layout and usage

## License

Dual-licensed under **MIT** or **Apache-2.0** at your option:
[LICENSE-MIT](LICENSE-MIT), [LICENSE-Apache-2.0](LICENSE-Apache-2.0).
