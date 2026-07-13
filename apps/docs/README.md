# docs

School OS documentation site (Next.js + Fumadocs).

All project docs live in `content/docs/` and are served from this app.

```bash
bun --cwd apps/docs run dev
```

Open http://localhost:3002/docs

## Content map

| Path | Topic |
| --- | --- |
| `/docs` | Home |
| `/docs/quick-start` | Bootstrap |
| `/docs/production-roadmap` | Nest API / product phases |
| `/docs/product-system-design` | Architecture & data model |
| `/docs/architecture` | Boundaries + ADRs |
| `/docs/docker` | Compose / Postgres |
| `/docs/qol` | Hooks, CI, tooling |
| `/docs/ai-first-workflow` | AI-assisted workflow |
| `/docs/overrides` | Architecture override policy |

Agents should prefer these pages (and `AGENTS.md` / `DESIGN.md` at repo root) over the old root `docs/` folder.
