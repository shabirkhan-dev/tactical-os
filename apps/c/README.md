# Starter Kit C app

C binary in the starter monorepo. Lives under **`apps/c`**. Turbo can run `build` / `dev` from root.

## Prerequisites

- C compiler (`cc` / `gcc` / `clang`)
- Optional: **clang-format**, **clang-tidy** for format/lint

## Commands (from root or `apps/c`)

| From root | From `apps/c` | Purpose |
|-----------|---------------|---------|
| `bun run build` | `just build` | Build binary to `build/starter-c` |
| `bun run dev` | `just run` | Build and run |
| `bun run test` (Turbo) | `bun run test` | Compile and run C unit tests |
| — | `just lint` | clang-tidy |
| — | `just format` | clang-format |
| — | `just clean` | Remove build dir |

## QoL / goodies

- **justfile** – Recipes: `build`, `run`, `lint`, `format`, `clean`; uses C17, -Wall -Wextra -pedantic. Requires [just](https://github.com/casey/just).
- **.clang-format** – Column limit 100, spaces, 4-width indent.
- **.clang-tidy** – Bugprone, analyzer, performance, portability, readability checks.
