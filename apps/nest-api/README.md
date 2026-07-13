# School OS API (`nest-api`)

Production backend for School OS, built with **NestJS 11**, **Zod**, and **Biome** (monorepo lint/format).

## Phase 0 (current)

- `GET /api/v1/health` with standard success envelope
- Global prefix `/api/v1`, URI versioning
- Config module with env validation
- Request ID middleware
- Response interceptor and exception filter
- Zod validation pipe

See the docs app page [Production Roadmap](../../apps/docs/content/docs/production-roadmap.mdx)
(`/docs/production-roadmap` when running `bun --cwd apps/docs run dev`) for the full build plan.

## Commands

From repo root:

```bash
bun --cwd apps/nest-api run dev
bun --cwd apps/nest-api run test
bun --cwd apps/nest-api run test:e2e
```

## Health check

```bash
curl http://localhost:3000/api/v1/health
```

Expected shape:

```json
{
  "success": true,
  "statusCode": 200,
  "requestId": "...",
  "timestamp": "...",
  "data": {
    "status": "ok",
    "service": "school-os-api"
  }
}
```

## Environment

| Variable | Default | Description |
| --- | --- | --- |
| `PORT` | `3000` | HTTP port |
| `NODE_ENV` | `development` | Runtime environment |
| `API_PREFIX` | `api` | Global route prefix |
| `API_VERSION` | `1` | Default URI version segment |
