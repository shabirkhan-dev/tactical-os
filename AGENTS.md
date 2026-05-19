# Agent instructions (School OS)

Universal instructions for AI agents (Cursor, Copilot, Claude Code, Windsurf, Cline, Aider, etc.).
Read this file first when working in this repo.

## Project overview

Monorepo School OS managed with **Turborepo + Bun**. Four apps, shared packages, and
multi-language scripts, all wired into a single lint/format/build/test surface.


<!-- BEGIN:nextjs-agent-rules -->

# Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.

<!-- END:nextjs-agent-rules -->
## Repository layout

```
school-os/
├── apps/
│   ├── web/             # Next.js (React, Tailwind, shadcn-style UI)
│   ├── mobile/          # Expo Router + NativeWind app (TypeScript)
│   ├── hono-api/        # Hono + Prisma + PostgreSQL REST API
│   ├── rust/            # Rust binary (Cargo, Axum)
│   └── c/               # C binary (clang-format, clang-tidy)
│   └── docs/               # Documentation for the School OS

├── packages/
│   ├── ui/              # Shared web UI primitives
│   ├── tailwind-config/ # Shared Tailwind theme (theme.css)
│   ├── typescript-config/ # Shared tsconfig bases (base.json, nextjs.json)
│   └── logger/          # Shared logger (TS + Rust)
├── scripts/             # Utility scripts: bash/, lua/, python/
├── docker/              # Docker Compose fragments (see docker/README.md)
├── docs/                # Extra docs: docker.md, QoL.md
├── .cursor/rules/       # Cursor-specific rules (also summarised below)
├── .devcontainer/       # Dev Container config (Bun, Rust, C, Python, Lua, etc.)
├── .github/workflows/   # CI (lint, typecheck, build, test)
└── (root config)        # biome.json, turbo.json, lefthook.yml, justfile, .editorconfig, etc.
```

## Tooling and commands

| Tool | Purpose | Config |
|------|---------|--------|
| **Bun** | Package manager and script runner (not npm/yarn/pnpm) | `package.json` workspaces |
| **Turborepo** | Monorepo orchestration | `turbo.json` |
| **Biome** | Lint + format for TS/JS | `biome.json` (tabs, line width 100) |
| **Lefthook** | Git hooks (pre-commit, commit-msg) | `lefthook.yml` |
| **EditorConfig** | Consistent indent/charset/line endings | `.editorconfig` |

**Run everything from repo root:**

| Command | What it does |
|---------|-------------|
| `bun install` | Install all dependencies |
| `bun run prepare` | Install git hooks (lefthook) |
| `bun run dev` | Start all dev servers (Turbo) |
| `bun run build` | Build all apps (Turbo + C) |
| `bun run lint` | Lint: Biome (TS/JS) + ShellCheck + luacheck + ruff |
| `bun run lint:fix` | Lint with auto-fix |
| `bun run format` | Format: Biome + shfmt + stylua + ruff + cargo fmt + clang-format |
| `bun run typecheck` | TypeScript typecheck |
| `bun run test` | Run tests (e.g. cargo test) |
| `bun run test:coverage` | Run TS coverage + all language tests |
| `bun run test:e2e:web` | Run web Playwright e2e tests |
| `bun run architecture:check` | Enforce architecture import boundaries |

Optional: install [just](https://github.com/casey/just) and use `just lint`, `just format`, etc.

## Conventions

### Code style

- **Formatter**: Biome. Tabs, line width 100. Applies to `apps/**/*.ts(x)`, `packages/**/*.ts(x)`,
  root config files. Run `bun run format` or rely on pre-commit hook.
- **No ESLint/Prettier**: Biome is the only lint/format tool for TS/JS in this project.
- **Naming**: PascalCase for components; files match component name. Hooks use `use*` prefix;
  utility functions are plain named exports.
- **Imports**: Prefer workspace imports as `@school-os/<package>` (e.g. `@school-os/ui`,
  `@school-os/tailwind-config`). Group: external → workspace → relative. No unused imports.
- **Types**: Explicit types for props and public APIs. Avoid `any`; use `unknown` and narrow.
- **Errors**: Handle explicitly — log and rethrow, or use result types. No silent catches.
- **Size**: Small, single-responsibility functions and components. Extract when complexity grows.

### Project structure

- **Monorepo**: Apps in `apps/`, shared code in `packages/`. When a change applies across apps,
  prefer changing a shared package.
- **New apps**: Add under `apps/`, wire into `turbo.json` tasks if needed.
- **New packages**: Add under `packages/`, export via `@school-os/<name>`.
- **Shared UI**: `packages/ui` uses shadcn-style components. Shared Tailwind theme is in
  `packages/tailwind-config/theme.css`.
- **TypeScript config**: Extend from `packages/typescript-config/base.json` (or `nextjs.json`
  for Next.js apps).
- **Expo mobile structure**: Use `src/app` for routes, `src/components/ui` for UI primitives,
  and `src/components` for non-UI reusable components.
- **Safe area in mobile**: Use `react-native-safe-area-context` instead of deprecated
  `react-native` `SafeAreaView`.

### Git and commits

- **Pre-commit hooks** (Lefthook): auto-format, lint, typecheck, large-file guard (2 MB max),
  secret scan, architecture check. Hooks run automatically if installed via `bun run prepare`.
- **Commit messages**: Enforced by `commit-msg` hook — must be 10–200 chars, no WIP/fixup.
- **Do not commit**: build output (`.next/`, `dist/`, `target/`), `node_modules/`, `.env` files,
  cache dirs. These are in `.gitignore`.
- **Separate concerns**: Don't mix lint/format-only fixes with feature changes in the same commit.

### Per-language notes

| Language | Lint | Format | Test |
|----------|------|--------|------|
| **TypeScript/JS** | Biome | Biome | Vitest/Jest (if added) |
| **Rust** | Clippy | rustfmt | `cargo test` |
| **C** | clang-tidy | clang-format | (manual) |
| **Bash** | ShellCheck | shfmt | — |
| **Lua** | luacheck | stylua | — |
| **Python** | ruff check | ruff format | — |

### Docker

PostgreSQL + Hono API via Docker Compose. Fragments live under `docker/compose/` and are merged by the root `docker-compose.yml` (Compose v2.20+). Setup:
```bash
cp env.docker.example .env
docker compose up --build
```
Postgres on 5432, Hono API on 3001 (host). See `docs/docker.md`.

## Before finishing any task

1. Run `bun run lint` from repo root — fix any errors.
2. Run `bun run format` from repo root — ensure formatting is clean.
3. If you changed TypeScript, run `bun run typecheck`.
4. Do not leave dead code, unused imports, or `any` types.

## Key files to read for deeper context

- `PROJECT.md` — detailed layout, tooling, and commands.
- `DESIGN.md` — design-system brief for UI generation and review.
- `docs/ai-first-school-os-workflow.md` — school-os audit and AI-first workflow roadmap.
- `docs/QoL.md` — full QoL stack (hooks, CI, per-language tools).
- `docs/architecture/README.md` — architecture baseline and enforceable boundaries.
- `docs/overrides.md` — policy for project-specific architecture overrides.
- `.cursor/skills/expo-mobile/SKILL.md` — Expo Router + EAS + official Expo Skills / LLM doc links for `apps/mobile`.
- `.cursor/rules/expo-ai-agents.mdc` — Expo remote skills URL, skill table, `llms.txt` bundles (when working under `apps/mobile/**`).
- `apps/mobile/AGENTS.md` — Short index for agents opening the mobile app folder.
- `docs/docker.md` — Docker Compose setup.
- `docker/README.md` — Compose fragment layout and `-f` fallback.
- `biome.json` — Biome config (lint rules, formatter settings).
- `lefthook.yml` — Git hook definitions.
- `turbo.json` — Turborepo pipeline config.
