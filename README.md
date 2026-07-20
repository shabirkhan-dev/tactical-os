# Tactical OS

[![CI](https://github.com/shabirkhan-dev/tactical-os/actions/workflows/ci.yml/badge.svg)](https://github.com/shabirkhan-dev/tactical-os/actions/workflows/ci.yml)
[![Security](https://github.com/shabirkhan-dev/tactical-os/actions/workflows/security.yml/badge.svg)](https://github.com/shabirkhan-dev/tactical-os/actions/workflows/security.yml)

Operator training program and tracker — mission planning, drills, response metrics, and gear inventory for ops personnel.

Built on a **Bun + Turborepo** monorepo (Next.js web, Expo mobile, NestJS API, Fumadocs docs, optional AI and Rust). Operator modules are rolling out on top of this foundation — see [plan.md](plan.md).

> Workspace UI packages use the `@school-os/*` npm scope from the Starter kit. Domain packages will use `@tactical-os/*` as features land.

## Quick start

**Prerequisites**

- [Bun](https://bun.sh) `1.3.13`
- Optional: Docker Compose `v2.20+`, Rust toolchain (for `apps/rust`)

```bash
git clone https://github.com/shabirkhan-dev/tactical-os.git
cd tactical-os
bun install
bun run prepare
bun run dev
```

| App | URL (dev) |
| --- | --- |
| Web | http://localhost:3000 |
| Nest API | http://localhost:4000 |
| Docs | http://localhost:3002/docs |

## What we are building

**Tactical OS** is an operator training program and tracker for real ops and SF-style personnel:

| Capability | Purpose |
| --- | --- |
| **Operations** | Plan missions, timelines, objectives |
| **Training** | Drills, progression, readiness |
| **Performance** | Response time, firing speed, scores |
| **Inventory** | Gear, ammo, equipment accountability |

**Core loop:** plan the op → run the drill → measure performance → track gear → improve readiness.

## Root commands

| Command | Purpose |
| --- | --- |
| `bun run dev` | Start workspace dev servers |
| `bun run build` | Build all apps |
| `bun run lint` / `lint:fix` | Biome + script linters |
| `bun run typecheck` | TypeScript across workspaces |
| `bun run test` / `test:coverage` | Tests + coverage |
| `bun run architecture:check` | Import boundary rules |
| `bun run preflight` | Lint + typecheck + test |

## Documentation

| Doc | Purpose |
| --- | --- |
| [plan.md](plan.md) | Vision, domains, and milestones |
| [PROJECT.md](PROJECT.md) | Monorepo layout and conventions |
| [AGENTS.md](AGENTS.md) | Instructions for AI agents |
| [DESIGN.md](DESIGN.md) | UI design brief |
| `apps/docs` | Fumadocs site |

## License

Dual-licensed under **MIT** or **Apache-2.0**: [LICENSE-MIT](LICENSE-MIT), [LICENSE-Apache-2.0](LICENSE-Apache-2.0).
