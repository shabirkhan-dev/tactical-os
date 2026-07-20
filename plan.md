# Tactical OS — Project Plan

Date: 2026-07-20
Status: living document. Single source of truth for what we are building, why, what
exists today, and what we do next.

---

## 1. What we are building (the vision)

**Tactical OS** is an **operator training and mission-readiness platform** for
training organizations — instructors, operators (students), and mission planners
working in real-world physical training contexts.

It is **not** cyber range tooling (see RedCore + Blade). It is **not** generic
HR or a consumer fitness app. It exists to answer:

> *Are our people trained, equipped, and ready — and can we prove it with data?*

### 1.1 The core loop

```text
Plan the training or exercise → run the drill → capture performance and gear data
→ review trends → adjust loadout, technique, or program → repeat
```

For **operators**, the daily loop is:

> Log into my unit → open today’s assigned drill → run the timer or enter scores
> → record weapon, ammo, accuracy, and what changed → sync when online.

For **instructors**, the loop is:

> Define or assign drills → review student scores and trends → identify who is
> ready and who needs remediation.

For **planners**, the loop is:

> Build a structured exercise plan (objectives, phases, personnel, gear, linked
> drills) → execute in training → review outcomes against the plan.

### 1.2 Target experience (one sentence)

> A training academy runs marksmanship, CQB, physical, and qualification drills on
> web and mobile — offline in the field — with weapon history, ammo/accuracy logs,
> and structured op plans when the exercise scales up.

---

## 2. Who it is for

### 2.1 Primary market

**Training organizations / academies** — military-style, SF-style, or tactical
training schools where instructors run cohorts through repeatable drills and
qualification standards.

### 2.2 Roles (v1)

| Role | Primary surface | Responsibility |
| --- | --- | --- |
| **Operator** (student) | Mobile-first | Log drills, timers, scores, weapon/ammo/accuracy, personal kit |
| **Instructor** | Web + mobile | Create/assign drills, define standards, review performance |
| **Planner** | Web-first | Structured exercise / op plans (OPORD-lite), link drills and gear |
| **Org admin** | Web | Manage org, units/cohorts, users, tenancy boundaries |

Operators and instructors are the **MVP focus**. Planners and structured op
planning follow once drill logging is reliable.

### 2.3 Organization model

**Multi-tenant SaaS shape:**

- Each **organization** (academy, unit, school) is isolated — own users, drills,
  data, and settings.
- Within an org: **units / cohorts** (e.g. Alpha, Bravo, Class 2026) for grouping
  operators and assignments.
- No cross-tenant data leakage; org admin invites users and assigns roles.

Personal/solo use is possible inside a single-user org, but the product is
**designed for training orgs first**.

---

## 3. Core domains

### 3.1 Training & drills

Supported drill categories at launch (and beyond):

| Category | Examples | Typical metrics |
| --- | --- | --- |
| **Marksmanship** | Draw, splits, reloads, qualification tables | Time, hits/misses, accuracy %, pass/fail |
| **CQB** | Room entry, response drills, team movement | Response time, stage time, errors |
| **Physical** | Ruck, endurance, strength circuits | Time, distance, reps, heart rate (manual later) |
| **Qualification** | Standard tables with pass thresholds | Score vs standard, qualified / not qualified |
| **Custom** | Instructor-defined drill templates | Configurable fields per template |

**Instructor capabilities:**

- Create drill templates (fields, scoring rules, qualification threshold optional).
- Assign drills to operators or cohorts.
- Review history and compare against standards.

**Operator capabilities:**

- View assigned and ad-hoc drills.
- Log results after completion.

### 3.2 Performance & metrics

**Phase 1 — manual entry + in-app timers**

- Built-in **stopwatch / stage timer** for response time, splits, total time.
- Manual fields: hits, misses, rounds fired, notes.
- Pass/fail against qualification standard when drill type is `qualification`.

**Phase 2+ — integrations (not MVP)**

- Wearables (HR, movement).
- Range hardware / shot timers where APIs exist.
- Import from files or partner devices.

Design principle: **never block logging** if hardware is absent — manual + timer
always works.

### 3.3 Weapons, attachments & accuracy

Inventory is **role- and responsibility-aware**, not a generic warehouse SKU system.

For an operator responsible for a weapon, track:

| Data | Purpose |
| --- | --- |
| **Weapon profile** | Platform, serial/reference id, baseline zero/config |
| **Attachments** | Optic, light, grip — what was on the weapon for this session |
| **Per-session log** | Drill id, rounds fired, hits/misses, accuracy, conditions |
| **Change notes** | What changed (grip, stance, zero, ammo type) and whether performance improved or degraded |
| **Long-term history** | Trend per weapon + attachment combo over time |

Goal: answer *“Did this change make me better or worse?”* and *“Which setup
performs best for me?”*

Unit/shared armory (shared weapons, bulk ammo) is **future** unless an org admin
explicitly needs it; MVP centers on **personal responsibility tracking**.

### 3.4 Operations & exercise planning (planner role)

**Not MVP**, but defined now so architecture fits.

Structured **OPORD-lite** exercise plans:

| Section | Content |
| --- | --- |
| Objectives | Primary / secondary training goals |
| Timeline | Phases, start/end, checkpoints |
| Personnel | Assigned operators, instructors, roles |
| Gear | Required kit and weapon loadout per participant |
| Drills | Linked drill templates executed during the exercise |
| Contingencies | Weather, med, comms notes (training context) |
| Comms | Simple comms plan or contact tree |

Scope: **training exercises only** — not classified real-world operational
planning. Language and UX should reflect training safety and academy use.

### 3.5 Command surfaces

| Surface | Use |
| --- | --- |
| **Web** | Org admin, instructor dashboards, planner boards, analytics, bulk review |
| **Mobile** | Field logging, timers, quick drill entry, offline capture |
| **API** (Nest) | Auth, sync, multi-tenant boundaries, audit trail |

Same product on **web and mobile** — not two different apps with different features,
though mobile optimizes for field input and web for planning/review.

---

## 4. Offline & sync (recommended default)

You asked for offline; default strategy:

**Local-first on mobile (and web where useful)**

1. Operator can open assigned drills and **log scores offline**.
2. Timers and forms write to **local durable storage** immediately.
3. When connectivity returns, **background sync** pushes to Nest API.
4. Conflicts: **last-write-wins per field** for MVP; instructor-reviewed records
   can be marked `locked` later to prevent overwrite.
5. Web shows **sync status** (pending / synced / failed) on recent entries.

Instructors should be able to **download** cohort drill assignments for a training
day when offline read is needed.

This matches range and field conditions where signal is poor.

---

## 5. Relationship to other School OS portfolio products

| Product | Relationship |
| --- | --- |
| **RedCore + Blade** | **Separate.** Cyber labs and evidence; no shared runtime. May mention in portfolio docs only. |
| **Starter kit** | **Foundation.** This repo is a Starter fork; platform spine only until `@tactical-os/*` domain packages land. |
| **Personal OS** | Separate domain (personal life). No product integration planned. |
| **Humanity One** | Separate domain (STEM LLM). No product integration planned. |
| **School OS** | Separate domain (school trust). No product integration planned. |

Future *portfolio* idea (not committed): joint training exercise linking a
RedCore cyber lane and a Tactical field lane — **out of scope** until both products
have core loops shipped.

---

## 6. Where we are today

**Maturity: Starter kit scaffold (Phase 0).**

### 6.1 Implemented (platform only)

- Bun + Turborepo monorepo: Next.js web, Expo mobile, NestJS API, Fumadocs docs
- Auth spine (JWT, sessions), shared `@school-os/ui`, CI/CD, Docker, Dev Container
- Architecture boundary checks, Lefthook, Biome

### 6.2 Not implemented (product)

- Multi-tenant org / unit model
- Role-based access (instructor, operator, planner, org admin)
- Drill templates, assignments, qualification standards
- Timers and performance logging
- Weapon / attachment / session history
- Offline sync layer on mobile
- Structured exercise / OPORD-lite planner
- `@tactical-os/*` domain packages

---

## 7. Phased roadmap

### Phase 0 — Foundation (current)

- [x] Repo, SEO, product README, this plan
- [ ] Fix CI green on Starter spine (Turbo lint recursion on older base)
- [ ] Define `@tactical-os/contracts` or shared types for Drill, Session, WeaponProfile (Zod)

### Phase 1 — MVP: drill logging (v0.1 target)

**Goal:** Operators log drills every week; instructors can review.

- Multi-tenant org + invite flow (minimal admin)
- Roles: operator, instructor (planner read-only stub ok)
- Drill templates: marksmanship, CQB, physical, qualification, custom
- Mobile: assigned drills list, **timer**, manual score entry
- Session log: weapon ref, rounds, hits/misses, accuracy, notes, attachment snapshot
- Web: instructor create/assign drill; review operator history
- Basic weapon profile + per-weapon session history
- Offline queue + sync on mobile

**Exit criteria:** One academy cohort completes a training day entirely on mobile
(with offline periods) and instructor reviews on web.

### Phase 2 — Performance intelligence (v0.2)

- Trends: response time, accuracy, qualification pass rate over time
- Compare attachment/loadout changes vs performance
- Cohort dashboards for instructors
- Export / print qualification summary (PDF later)

### Phase 3 — Planner & structured exercises (v0.3)

- OPORD-lite exercise builder
- Link drills and gear to exercise phases
- Planner role permissions
- Post-exercise review: plan vs actual

### Phase 4 — Integrations (v0.4+)

- Wearables, shot timers, range systems (partner/API)
- Unit armory (shared weapons/ammo) if orgs require it
- Advanced conflict resolution and locked instructor sign-off records

---

## 8. Technical notes (for implementers)

- **Tenancy:** org id on every row; enforce in Nest guards and query scopes.
- **Audit:** append-only event log for qualification and instructor sign-off (later).
- **Mobile offline:** Expo SQLite or WatermelonDB-style local store; sync via Nest.
- **Time sync:** store UTC + device offset; flag entries logged offline for review.
- **Security:** training data sensitivity varies by customer — design for
  encryption at rest and strict tenant isolation from day one.
- **Design:** operational density, scannable tables, real loading/empty/error states
  (see `DESIGN.md`).

---

## 9. What this is not

- Not RedCore / cyber range / lab evidence tooling
- Not generic HR, LMS, or corporate learning management
- Not consumer fitness (Strava-for-gym)
- Not classified operational command system for real-world combat orders
- Not a game or simulation engine (no 3D training sim in scope)

---

## 10. Open questions (resolve during Phase 1)

| # | Question | Notes |
| --- | --- | --- |
| 1 | Qualification standards library | Fixed global tables vs per-org custom only? |
| 2 | Media attachments | Photos/video of targets allowed on mobile? Storage cost? |
| 3 | Instructor sign-off | Required for qualification records to count? |
| 4 | Localization | English-only MVP or Urdu/regional early? |
| 5 | Billing | Free for own academy vs paid multi-tenant SaaS later? |

---

## 11. Document history

| Date | Change |
| --- | --- |
| 2026-07-20 | Initial scaffold from product branding pass |
| 2026-07-20 | Deep plan from founder Q&A: training org, roles, drills, weapons, offline, tenancy |
