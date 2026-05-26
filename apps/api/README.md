# @estate/api

Reserved for the **Next.js backend** (Route Handlers / server features).

## When you start backend work

1. Scaffold Next.js in this folder (App Router, no duplicate UI).
2. Expose REST (or RPC) under `/v1/*` — match paths in `apps/web/src/shared/api/routes.ts`.
3. Run on port **3001** in dev (`pnpm dev:api` from repo root).
4. Set env (see root `.env.example`):
   - Root `.env` — shared secrets
   - `apps/web/.env.local` — web + Prisma asset routes
   - `apps/api/.env.local` — API on :3001 (when scaffolded)
5. Run `pnpm env:check` then `pnpm dev:api` from repo root.

## Planned layout

```
apps/api/
  src/
    app/
      v1/          # versioned API routes
      health/
    lib/           # db, auth, domain services
```

Frontend must not import from `apps/api` — only HTTP via `NEXT_PUBLIC_API_URL`.
