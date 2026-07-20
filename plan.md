# Tactical OS — Project Plan

Date: 2026-07-20
Status: living document. Vision and domains below; implementation follows in phases on the Starter kit base.

---

## 1. What we are building

**Tactical OS** is an operator training and mission-readiness platform for real operations personnel and SF-style teams.

### 1.1 Core domains

| Module | Purpose |
| --- | --- |
| Operations | Mission planning, timelines, objectives |
| Training | Drill programs, sessions, progression |
| Performance | Response time, firing speed, qualification scores |
| Inventory | Gear, ammo, equipment checks |
| Command | Web dashboard for planners; mobile for field |

### 1.2 Target experience

> Plan an operation → assign drills → capture scores and gear status → review readiness before the real thing.

---

## 2. Where we are today

**Maturity: Starter kit scaffold.** Web, mobile, API, docs, CI, and Docker are in place. Operator-specific product modules are **not implemented yet**.

### 2.1 Implemented (platform)

- Bun + Turborepo monorepo with Next.js, Expo, NestJS, Fumadocs
- Auth spine, shared UI, Lefthook, Biome, architecture checks, CI/CD
- Docker Compose and Dev Container

### 2.2 Planned (product)

- Operation and mission planning UI
- Drill logging and performance analytics
- Inventory and gear accountability
- Role-based access for trainers and operators

---

## 3. Near-term milestones

1. **M1 — Operator profile & drills:** auth, drill CRUD, score logging
2. **M2 — Performance metrics:** response time, firing speed, history charts
3. **M3 — Operations:** mission plans linked to training events
4. **M4 — Inventory:** gear tracking tied to ops and drills

---

## 4. What this is not

- Not cyber range / lab tooling (see RedCore + Blade)
- Not generic HR or LMS
- Not consumer fitness — operator and mission focused
