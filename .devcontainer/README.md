# Dev Container

Reproducible environment for the polyglot monorepo: Bun, Rust, C (clang), Python, Lua, ShellCheck, shfmt, Ruff, stylua, luacheck, just.

## How to use

1. **VS Code / Cursor**: Install the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension, then **Reopen in Container** from the command palette (or from the bottom-left green icon).
2. **CLI**: From repo root, `devcontainer build` then `devcontainer run` (requires [Dev Container CLI](https://github.com/devcontainers/cli)).

After the container starts, `postCreateCommand` runs `bun install` and `bun run prepare` (git hooks). Then use `bun run dev`, `bun run lint`, `just build`, etc. as on the host.

## What’s installed

- **Bun** – JS/TS runtime and package manager
- **Rust** – stable, rustfmt, clippy (from rust-toolchain.toml when building in repo)
- **C** – gcc, clang, clang-format, clang-tidy
- **Python** – python3, pip, ruff (user install)
- **Lua** – lua5.4, luarocks, stylua, luacheck
- **Bash** – shellcheck, shfmt
- **just** – optional task runner (`just lint`, `just format`, etc.)

Port **3000** is forwarded for the Next.js app.
