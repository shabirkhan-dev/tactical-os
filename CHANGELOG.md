# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Monorepo: Turborepo + Bun, apps (web, rust, c), packages (ui, tailwind-config, typescript-config).
- **Web**: Next.js app with Tailwind, shadcn-style UI.
- **Rust**: Cargo app with rust-toolchain, rustfmt, Clippy.
- **C**: Justfile app with clang-format, clang-tidy.
- **Scripts**: bash/, lua/, python/ with ShellCheck, shfmt, luacheck, stylua, ruff.
- Biome for TS/JS lint and format; lefthook pre-commit (biome + typecheck).
- Cursor rules and AGENTS.md, PROJECT.md.
- Dual license: MIT and Apache-2.0 (see LICENSE-MIT and LICENSE-Apache-2.0).

### Changed

- Rebranded from personal-os to Starter Kit; workspace scope `@starter/*`.

## [0.1.0] - 2026-02-10

### Added

- Initial starter kit layout.

[Unreleased]: https://github.com/your-org/starter/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/your-org/starter/releases/tag/v0.1.0
