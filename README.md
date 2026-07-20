# Tactical OS

[![CI](https://github.com/shabirkhan-dev/tactical-os/actions/workflows/ci.yml/badge.svg)](https://github.com/shabirkhan-dev/tactical-os/actions/workflows/ci.yml)
[![Security](https://github.com/shabirkhan-dev/tactical-os/actions/workflows/security.yml/badge.svg)](https://github.com/shabirkhan-dev/tactical-os/actions/workflows/security.yml)

**Operator training and mission-readiness platform** for training academies —
instructors, operators, and planners who need drills, timers, scores, weapons
data, and gear accountability in one place.

> *Are our people trained, equipped, and ready — and can we prove it with data?*

Not a cyber range. Not a consumer fitness app. Built for real physical training
contexts: marksmanship, CQB, qualifications, and structured exercises — on web
and mobile, including offline in the field.

Product roadmap and domain model: **[plan.md](plan.md)**.

---

## Core loop

```text
Plan training → run the drill → capture scores & gear → review trends → adjust → repeat
```

| Role | Surface | Job |
| --- | --- | --- |
| **Operator** | Mobile-first | Log drills, timers, scores, weapon/ammo/accuracy |
| **Instructor** | Web + mobile | Assign drills, set standards, review readiness |
| **Planner** | Web | Exercise / op plans linked to drills and gear |
| **Org admin** | Web | Tenants, cohorts, users, access |

---

## Stack

Monorepo managed with **Bun + Turborepo**.

| App | Path | Stack |
| --- | --- | --- |
| Web console | `apps/web` | Next.js, React, Tailwind, ops admin dashboard |
| Mobile | `apps/mobile` | Expo Router, NativeWind |
| API | `apps/nest-api` | NestJS, Drizzle, PostgreSQL / Neon |
| Docs | `apps/docs` | Fumadocs |
| AI assist | `apps/ai-api` | FastAPI (proxied via Nest; no public LLM keys) |
| Rust | `apps/rust` | Optional Axum binary |

Shared packages live under `packages/` (`@school-os/ui`, `@school-os/logger`,
`@school-os/typescript-config`). Domain packages will move to `@tactical-os/*`
as features land.

---

## Quick start

**Prerequisites:** [Bun](https://bun.sh) `1.4.x` · PostgreSQL (local Docker or
[Neon](https://neon.tech)) · optional Docker Compose `v2.20+`

```bash
git clone https://github.com/shabirkhan-dev/tactical-os.git
cd tactical-os
bun install
bun run prepare
```

### Configure env

```bash
cp apps/nest-api/.env.example apps/nest-api/.env
cp apps/web/.env.example apps/web/.env.local
```

1. Set `DATABASE_URL` in `apps/nest-api/.env` (Postgres or Neon).
2. Run migrations once on a fresh database:

   ```bash
   bun --cwd apps/nest-api run db:migrate
   ```

3. Keep `NEXT_PUBLIC_NEST_API_URL=http://127.0.0.1:4000` in web env
   (prefer `127.0.0.1` over `localhost` on Windows to avoid IPv6 issues).

### Run

```bash
bun run dev
```

| Service | URL |
| --- | --- |
| Web | http://localhost:3000 |
| Nest API | http://127.0.0.1:4000 |
| API health | http://127.0.0.1:4000/api/v1/health |
| Docs | http://localhost:3002/docs |
| Mobile | Expo (terminal QR / simulator) |

Useful filters:

```bash
bun run dev:core      # web + docs + nest + ai (no mobile)
bun run dev:mobile   # Expo only
bun run dev:all      # everything including rust
```

### Docker (optional)

```bash
cp env.docker.example .env
docker compose up -d --build
```

Defaults: web `:3000`, Nest `:4000`, Postgres host `:5433`. See `docker/README.md`.

---

## Repository layout

```text
tactical-os/
├── apps/
│   ├── web/          # Landing + admin console
│   ├── mobile/       # Operator app
│   ├── nest-api/     # Auth, users, billing spine
│   ├── docs/         # Product & engineering docs
│   ├── ai-api/       # Internal AI assist
│   └── rust/         # Optional service
├── packages/         # Shared UI, logger, TS configs
├── scripts/          # Architecture checks, hooks helpers
├── docker/           # Compose fragments
└── plan.md           # Product source of truth
```

---

## Root commands

| Command | Purpose |
| --- | --- |
| `bun run dev` | Start core + mobile workspace servers |
| `bun run build` | Build all apps |
| `bun run lint` / `lint:fix` | Biome + script linters |
| `bun run format` | Format TS/JS, shell, Python, Rust |
| `bun run typecheck` | TypeScript across workspaces |
| `bun run test` / `test:coverage` | Unit tests + coverage |
| `bun run test:e2e:web` | Playwright e2e for web |
| `bun run architecture:check` | Import boundaries + kebab-case names |
| `bun run preflight` | Lint + typecheck + test |

Run a single app: `bun --cwd apps/<app> run <script>`.

---

## Documentation

| Doc | Purpose |
| --- | --- |
| [plan.md](plan.md) | Vision, roles, domains, milestones |
| [PROJECT.md](PROJECT.md) | Monorepo layout and conventions |
| [AGENTS.md](AGENTS.md) | Instructions for AI agents |
| [DESIGN.md](DESIGN.md) | UI design brief |
| `apps/docs` | Living docs site (`bun --cwd apps/docs run dev`) |

---

## License

Dual-licensed under **MIT** or **Apache-2.0**:
[LICENSE-MIT](LICENSE-MIT) · [LICENSE-Apache-2.0](LICENSE-Apache-2.0).
