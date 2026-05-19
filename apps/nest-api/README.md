# Nest API

NestJS API app with a modular structure and baseline auth flows inspired by the Hono API.

## Folder structure

`src/common`
- `decorators/` shared decorators (for example `CurrentUser`)
- `filters/` global error handling
- `interceptors/` global response envelope

`src/modules`
- `health/` root and health check endpoints
- `auth/` register/login/refresh/me/logout APIs with DTOs, guard, and service

## Auth endpoints

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `GET /auth/me` (Bearer token required)
- `POST /auth/logout` (Bearer token required)

## Run

```bash
bun install
bun run start:dev
```

Default port is `3002` (set `PORT` to override).
