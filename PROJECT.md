# School OS - Project overview

This document is the deeper technical reference for the School OS monorepo.
For quick setup/use, start with `README.md`.

## What this repository includes

Monorepo school-os managed by **Bun + Turborepo**, with:

- Multiple app templates (web, mobile, API, docs, PWA, systems-language apps)
- Shared workspace packages (`@school-os/*`)
- Polyglot scripts and quality tooling
- Architecture boundary checks
- Git hooks and CI/CD/security pipelines
- Optional Docker and Dev Container workflows

## Repository layout

```text
school-os/
├── apps/                     # Runnable applications
│   ├── web/                  # Next.js app
│   ├── mobile/               # Expo Router + NativeWind app
│   ├── hono-api/             # Hono + Prisma + PostgreSQL API
│   ├── fastapi/              # FastAPI service (Python + uv)
│   ├── nest-api/             # NestJS API scaffold
│   ├── pwa/                  # PWA app (Bun + service worker)
│   ├── docs/                 # Documentation app (Next.js + Fumadocs)
│   ├── rust/                 # Rust binary app (Cargo)
│   └── c/                    # C binary app (clang toolchain)
├── packages/
│   ├── logger/               # Shared logger (TypeScript + Rust)
│   ├── tailwind-config/      # Shared Tailwind theme/tokens
│   └── typescript-config/    # Shared TS config bases
├── scripts/                  # Bash, Lua, Python scripts and tests
├── docs/                     # Architecture, Docker, QoL docs
├── docker/                   # Docker Compose fragments
├── .github/workflows/        # CI/CD/security workflows
├── .devcontainer/            # Reproducible development environment
├── biome.json                # Formatter/linter config (TS/JS)
├── lefthook.yml              # Git hooks
├── turbo.json                # Turborepo pipeline
├── package.json              # Root scripts + workspaces
└── AGENTS.md                 # Universal AI agent guidance
```

## Apps and stacks

| App | Stack | Notes |
| --- | --- | --- |
| `apps/web` | Next.js 16, React 19, Tailwind 4 | Includes unit/integration and Playwright e2e flow |
| `apps/mobile` | Expo SDK 55, Expo Router, React Native, NativeWind | Mobile-first file-based routing |
| `apps/hono-api` | Hono, Prisma, PostgreSQL | Bun-first API with DB tooling |
| `apps/fastapi` | FastAPI, uv, Ruff, pytest | Python API option |
| `apps/nest-api` | NestJS 11, JWT/auth modules, Jest | TypeScript API scaffold |
| `apps/pwa` | Bun build, TS, service worker | Lightweight browser app |
| `apps/docs` | Next.js + Fumadocs + MDX | Project docs site |
| `apps/rust` | Cargo, clippy, rustfmt | Rust application template |
| `apps/c` | C17, clang-format, clang-tidy | C application template |

## Shared packages

| Package | Workspace import | Purpose |
| --- | --- | --- |
| `packages/ui` | `@school-os/ui` | Shared web UI primitives |
| `packages/logger` | `@school-os/logger` | Shared structured logger for TypeScript and Rust |
| `packages/tailwind-config` | `@school-os/tailwind-config` | Shared design tokens/theme |
| `packages/typescript-config` | `@school-os/typescript-config` | Reusable TypeScript config presets |

## Root command surface

Run commands from repo root:

| Command | Purpose |
| --- | --- |
| `bun run dev` | Start `dev` tasks via Turborepo |
| `bun run build` | Build workspace targets |
| `bun run start` | Start runtime targets |
| `bun run lint` | Lint workspace + scripts |
| `bun run lint:fix` | Apply lint autofixes |
| `bun run format` | Format TS/JS + shell/Lua/Python + Rust + C |
| `bun run typecheck` | TypeScript type checking |
| `bun run test` | Run tests in workspace + scripts |
| `bun run test:coverage` | Run full coverage-oriented pass |
| `bun run test:e2e:web` | Web Playwright e2e |
| `bun run architecture:check` | Enforce architecture boundaries |
| `bun run preflight` | Lint + typecheck + test |
| `bun run prepare` | Install git hooks (Lefthook) |

### Running one app directly

Use:

```bash
bun --cwd <app-path> run <script>
```

Examples:

- `bun --cwd apps/web run dev`
- `bun --cwd apps/mobile run start`
- `bun --cwd apps/hono-api run dev`
- `bun --cwd apps/fastapi run dev`
- `bun --cwd apps/docs run dev`
- `bun --cwd apps/pwa run dev`
- `bun --cwd apps/rust run dev`
- `bun --cwd apps/c run dev`

## Tooling and quality system

### Monorepo and package management

- **Bun** is the only package manager (`bun@1.3.11`)
- Workspaces: `apps/*` and `packages/*`
- **Turborepo** orchestrates shared tasks (`turbo.json`)

### Linting and formatting

- **Biome** is the TS/JS formatter+linter (`biome.json`)
- Formatting style: tabs, line width 100
- Root `format` and `lint` scripts also run language-specific tools

### Language-specific tools

- **Bash:** `shellcheck`, `shfmt`
- **Lua:** `luacheck`, `stylua`
- **Python:** `ruff`, `pytest`
- **Rust:** `cargo fmt`, `cargo clippy`, `cargo test`
- **C:** `clang-format`, `clang-tidy`, compiler-based tests

### Git hooks

Configured in `lefthook.yml`:

- Pre-commit: trailing whitespace fix, format, lint:fix, typecheck, architecture check
- Safety checks: large file guard, secret scan
- Commit-msg hook: message quality rules

Install hooks with:

```bash
bun run prepare
```

### Architecture enforcement

- Rule checks run via `bun run architecture:check`
- Script location: `scripts/architecture/check-boundaries.sh`
- See `docs/architecture/README.md` for boundaries and allowed dependency flow

## CI/CD and security

- **CI:** `.github/workflows/ci.yml` runs lint/typecheck/test/e2e jobs
- **CD:** `.github/workflows/cd.yml` is a staged deploy template (`main` and version tags)
- **Security:** `.github/workflows/security.yml` + Dependabot + CodeQL

## Docker workflow

Postgres + Hono API are composed through root `docker-compose.yml` with fragment files under
`docker/compose/`.

```bash
cp env.docker.example .env
docker compose up --build
```

More details: `docs/docker.md` and `docker/README.md`.

## Dev Container workflow

`.devcontainer/` provides a reproducible setup with Bun, Rust, C, Python, Lua, and related tools.

- Open in VS Code/Cursor and choose **Reopen in Container**
- See `.devcontainer/README.md` for exact toolchain and post-create steps

## Conventions and development rules

- Primary repository guidance: `AGENTS.md`
- Cursor-specific rules: `.cursor/rules/`
- Architecture baseline: `docs/architecture/README.md`
- Override process: `docs/overrides.md`
- Use workspace imports as `@school-os/<package>`

## Related docs

- `README.md` - quick start and high-level navigation
- `docs/QoL.md` - quality-of-life stack details
- `scripts/README.md` - script usage and structure
- `apps/*/README.md` - per-app setup and workflows
