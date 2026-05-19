# Monorepo task runner – universal interface. Requires: bun (and optionally just).
# Without just: use `bun run <task>` (e.g. `bun run lint`, `bun run format`).

default:
    @just --list

# Lint: Turbo (Biome, etc.) + scripts (ShellCheck, luacheck, ruff)
lint:
    bun run lint

# Lint with auto-fix
lint-fix:
    bun run lint:fix

# Format: Biome + scripts (shfmt, stylua, ruff) + Rust (cargo fmt) + C (clang-format)
format:
    bun run format

# Typecheck (TS)
typecheck:
    bun run typecheck

# Run tests (Turbo: e.g. cargo test in apps/rust)
test:
    bun run test

# Build all (Turbo + C app)
build:
    bun run build
    @cd apps/c && bun run build

# Dev: start all dev servers (Turbo)
dev:
    bun run dev

# Install deps and install git hooks
setup:
    bun install
    bun run prepare

# Scripts: lint only (bash, lua, python)
scripts-lint:
    bun run scripts:lint

# Scripts: format only
scripts-format:
    bun run scripts:format
