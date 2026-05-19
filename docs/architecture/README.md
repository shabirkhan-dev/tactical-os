# Architecture Baseline

This starter uses a strong default architecture that is intentionally overridable.

## Principles

- Keep apps thin; keep reusable behavior in packages.
- Prefer module public entrypoints over deep internal imports.
- Keep domain logic separate from transport and framework concerns.
- Enforce boundaries with automated checks, not only conventions.

## Layering

### `apps/web`

- `src/app/*` is routing and composition.
- `src/modules/*` is feature-level UI and workflows.
- `src/lib/*` contains framework-agnostic helpers for the app.
- `src/components/*` contains reusable visual components.

### `apps/hono-api`

- `src/modules/*` holds feature modules (routes/controller/service/validator).
- `src/shared/*` holds cross-module primitives (errors, config, utils, middleware).
- Route handlers should delegate business logic to services.

### `packages/*`

- Packages should remain app-agnostic and not import app aliases like `@/...`.
- Shared packages expose public entrypoints and avoid framework lock-in when possible.

## Enforcement

- Run `bun run architecture:check` locally and in CI.
- Boundary checks currently validate:
  - no `@/...` imports inside `packages/*`
  - no deep web module imports under `@/modules/*/*/*`
  - no cross-app relative imports (`../../apps/...`)

## ADRs

See `docs/architecture/adr-0001-strong-default-overridable.md` for rationale and trade-offs.
