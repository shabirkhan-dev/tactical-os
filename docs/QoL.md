# Monorepo QoL stack

Consistency, fast feedback, and automation across TS, Rust, C, Lua, Bash, and Python.

## Cross-repo (Tier 1)

| Layer | What we use |
|-------|-------------|
| **Git hooks** | Lefthook: format, lint, typecheck, large-files, secrets, commit-msg (see `scripts/git-hooks/`) |
| **Task runner** | Root `justfile` wraps `bun run`; use `just lint`, `just format`, `just test`, or `bun run <task>` |
| **Editor consistency** | `.editorconfig`: LF, indent, charset, final newline |
| **CI** | `.github/workflows/ci.yml`: split quality gates (lint, typecheck, coverage tests, web e2e) on push/PR to `main` |
| **CD** | `.github/workflows/cd.yml`: staged deploy workflow template (staging on `main`, production on version tags) |
| **Dev Container** | `.devcontainer/`: reproducible env (Bun, Rust, C, Python, Lua, shell tools). Reopen in Container; see `.devcontainer/README.md` |

## Per-language

| Language | Lint / format | Test / types |
|----------|----------------|--------------|
| **TS/JS** | Biome (lint + format) | tsc (typecheck), Vitest/Jest if added |
| **Rust** | rustfmt, clippy | cargo test (e.g. apps/rust) |
| **C** | clang-format, clang-tidy | (manual / sanitizers optional) |
| **Bash** | shellcheck, shfmt | (bats optional) |
| **Lua** | luacheck, stylua | (busted optional) |
| **Python** | ruff (check + format) | (pytest optional); scripts/python |

## One-command surface

From repo root:

- **`bun run format`** — Biome + scripts (shfmt, stylua, ruff) + cargo fmt + clang-format
- **`bun run lint`** — Turbo lint + scripts (shellcheck, luacheck, ruff)
- **`bun run typecheck`** — TS only
- **`bun run test`** — Turbo tests + script tests
- **`bun run test:coverage`** — TS coverage runs + all language tests
- **`bun run test:e2e:web`** — Playwright browser tests for `apps/web`
- **`bun run build`** — Turbo build + C app

Optional: install [just](https://github.com/casey/just) and use `just lint`, `just format`, `just test`, `just build`, etc.

## Next-level (Tier 2+)

- **Rust**: `cargo watch` / `cargo nextest` for faster feedback
- **C**: sanitizers (ASan/UBSan) in debug builds
- **Python**: Pyright + pytest in CI
- **Releases**: changesets for versioning and changelogs
- **Environments**: Dev Container (`.devcontainer/`) or Nix for pinned toolchains

See `PROJECT.md` for full layout and commands.
