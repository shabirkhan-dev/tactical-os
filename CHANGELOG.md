# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-07-19

First public pin of the Starter kit (Bun + Turborepo monorepo).

### Added

- Apps: Next.js web, Expo mobile, NestJS API, Fumadocs docs, optional FastAPI AI assist, optional Rust/Axum demo.
- Shared packages: `@school-os/ui`, logger, TypeScript configs.
- Nest auth (`/api/v1/auth/*`), billing checkout hooks, web + mobile clients.
- Docker Compose fragments, slim Dev Container, Lefthook hooks, architecture boundary checks.
- CI / CD / Security workflows (Bun `1.3.13`), deploy scaffolding (Vercel + Render/Neon).
- Dual license: MIT and Apache-2.0.

### Changed

- Documentation lives in `apps/docs` only (no root `docs/` folder).
- Product naming is **Starter**; workspace packages keep the `@school-os/*` scope.

[Unreleased]: https://github.com/shabirkhan-dev/starter/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/shabirkhan-dev/starter/releases/tag/v0.1.0
