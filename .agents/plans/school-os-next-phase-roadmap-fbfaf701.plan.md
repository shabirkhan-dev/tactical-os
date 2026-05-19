---
name: Reliability-First School OS Roadmap
overview: ""
todos: []
isProject: false
---

---
todos:
  - id: "phase1-test-depth"
    content: "Design and implement deeper test suites (unit/integration/e2e) with shared fixtures and coverage gates."
    status: pending
  - id: "phase2-ci-cd-gates"
    content: "Refactor CI into explicit quality gates, add artifacts/reporting, and define staged CD with rollback checks."
    status: pending
  - id: "phase3-architecture-baseline"
    content: "Create enforceable architecture baseline docs and boundary checks with override mechanism."
    status: pending
  - id: "phase4-dx-generators"
    content: "Add scaffolding generators and preflight workflows after reliability and architecture are stable."
    status: pending
  - id: "docs-drift-cleanup"
    content: "Unify README/PROJECT/docs with actual runtime ports, scripts, and CI behavior to remove ambiguity."
    status: pending
isProject: false
---
# Reliability-First School OS Roadmap

## Goals
- Make this school-os safe as a default base for all 5 upcoming projects.
- Enforce high-confidence quality gates in CI before merge/release.
- Define an opinionated architecture that is easy to override per project.

## Current-State Findings (from rescan)
- Test foundation exists and is multi-language (`vitest`, Playwright, Rust/C/script tests via `package.json`).
- CI currently runs a single `qa` job with lint/typecheck/build/test in `.github/workflows/ci.yml`.
- Tooling/docs drift exists (example: Docker/port notes differ across docs, and local lint depends on host tools).
- Architecture guidance is broad (`AGENTS.md`, `PROJECT.md`) but not yet codified as enforceable module boundaries.

## Phase 1: Reliability and Test Depth (highest priority)
- Expand tests from smoke-level to contract-level and behavior-level:
  - `apps/hono-api`: endpoint integration tests (auth/session/2FA, error shapes, cookie behavior).
  - `apps/web`: component + integration tests for auth/dashboard flows; keep Playwright for critical happy paths.
  - `packages/logger`: edge-case tests (color/no-color, min-level behavior, child logger composition).
  - `apps/rust`, `apps/c`, `scripts/*`: add negative-path tests and lightweight fixture-based tests.
- Add deterministic test harness patterns:
  - Shared test utils per app (`test-utils/`), fixture conventions, and seeded data strategy.
  - Isolate external dependencies with mocks/fakes where possible.
- Introduce minimum coverage gates for TS packages/apps first, then expand to other stacks where practical.

## Phase 2: CI Gates and Release Confidence
- Split CI into clear jobs with fail-fast matrix where useful:
  - `lint`, `typecheck`, `unit`, `integration`, `e2e` (e2e optional on PR, required on main/release).
- Add required branch protections aligned to CI jobs.
- Add artifact publishing from CI:
  - test reports (JUnit), Playwright report artifact, coverage summary/comment.
- Add release-safe CD flow:
  - staging deploy on merge to `main` (or pre-release tag), production deploy on signed/tagged release.
  - include rollback steps and health-check gate before marking deploy success.
- Add dependency/security gates:
  - dependency audit, secret scan in CI, and PR automation for updates.

## Phase 3: Strong Opinionated Architecture (overridable)
- Define an Architecture Decision baseline in `docs/architecture/`:
  - module boundaries, naming, layering (app/module/domain/infrastructure), error model, API contracts.
- Codify architecture via enforceable checks:
  - import boundary checks (for TS), directory conventions, and module template structure.
- Add override mechanism for future projects:
  - `docs/overrides.md` + per-project `ARCHITECTURE.md` that can intentionally deviate with rationale.
- Create school-os templates for new modules/apps with default folders and test scaffolding.

## Phase 4: DX Acceleration (after reliability baseline)
- Add generators (`scripts/scaffold/*` or CLI) for:
  - new feature module, API route+validator+test, UI component+test, package bootstrap.
- Add quality-of-life automations:
  - one-command local preflight (`lint+typecheck+test`), issue/PR templates, release checklist.
- Improve docs as executable runbooks:
  - onboarding path, troubleshooting matrix, CI failure playbook.

## Suggested Execution Order (2-week chunks)
- Chunk 1: Phase 1 core test depth + coverage gate for TS.
- Chunk 2: Phase 2 CI split + artifact/reporting + branch protection.
- Chunk 3: Phase 3 architecture ADR + enforceable boundaries + override model.
- Chunk 4: Phase 4 generators and DX polish.

## Key Files to Touch First
- `package.json` (gate scripts and pipeline entry points)
- `.github/workflows/ci.yml` (job split, artifacts, release/deploy flow)
- `turbo.json` (task graph for unit/integration/e2e separation)
- `AGENTS.md`, `PROJECT.md`, `docs/QoL.md`, `docs/docker.md` (single source of truth and drift cleanup)
- New docs: `docs/architecture/*`, `docs/overrides.md`

## Definition of Done for “production-ready school-os”
- Every PR gated by lint/typecheck/unit; integration/e2e policy enforced.
- Main branch has deterministic build/test results with artifacted reports.
- Clear architecture rules are both documented and machine-enforced.
- Project-specific overrides are explicit, documented, and safe.