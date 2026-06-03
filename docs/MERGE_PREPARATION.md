# Merge preparation: `apps/api` → `apps/web`

Pre-merge documentation only. **Do not execute the merge steps in this file until explicitly requested.**

Goal: consolidate frontend and backend into one Next.js app at `apps/web` serving UI on `/` and API on `/api/v1/*`, while keeping the current separate architecture working until merge day.

---

## A. Current architecture

| App | Package | Port | Role |
|-----|---------|------|------|
| Frontend | `@estate/web` (`apps/web`) | 3000 | Next.js UI, mock-mode asset route when `NEXT_PUBLIC_USE_MOCK_API=true` |
| Backend | `@estate/api` (`apps/api`) | 3001 | Next.js API routes, admin routes, integrations |
| Database | `@estate/db` (`packages/db`) | — | Prisma schema, client, shared asset helpers |

**Dev commands (root `package.json`):**

- `pnpm dev:web` → `apps/web` on http://localhost:3000
- `pnpm dev:api` → `apps/api` on http://localhost:3001
- `pnpm db:generate`, `pnpm lint`, `pnpm typecheck`, `pnpm build`

**Env layout (separate apps):**

- Root `.env` — shared secrets (DB, JWT, R2, Resend, Redis)
- `apps/web/.env.local` — Next.js web (public + server vars)
- `apps/api/.env.local` — Next.js API on :3001

**Cross-origin:** `apps/api/next.config.ts` sets CORS headers on `/api/*` with `Access-Control-Allow-Origin: APP_URL` (default http://localhost:3000).

**Instrumentation:** `apps/api/src/instrumentation.ts` calls `ensureDatabaseReady()` on Node startup. `apps/web` has no equivalent yet.

---

## B. Target architecture

Single Next.js app: **`apps/web` only** (public site + `/api/v1/*`).

```
apps/web/
  src/
    app/                    # pages + route handlers (including /api/v1)
    server/
      features/             # moved from apps/api/src/features
      lib/                  # moved from apps/api/src/lib
    instrumentation.ts      # moved from apps/api
  public/                   # static assets (asset fallback target)
```

- Frontend calls same-origin `/api/v1/*` (or relative URLs); `NEXT_PUBLIC_API_URL` may become optional or same-origin.
- `apps/api` removed from workspace after cutover.
- Check scripts default to http://localhost:3000.

---

## C. What must NOT be moved yet

Until the actual merge task:

- Do **not** delete `apps/api`
- Do **not** remove `apps/api` from pnpm workspace
- Do **not** move API route handlers into `apps/web`
- Do **not** change public API contracts
- Do **not** change check script default ports (stay on 3001)
- Do **not** consolidate `.env` files yet
- Do **not** add backend deps to `apps/web` yet (except what pre-merge fixes require)

---

## D. Duplicate asset route resolution plan

### Current (duplicate)

| Location | Behavior |
|----------|----------|
| `apps/api/src/app/api/v1/assets/[key]/route.ts` | **Source of truth** — DB first, `public/` fallback, standard error envelope |
| `apps/web/src/app/api/v1/assets/[key]/route.ts` | Mock-mode only when `NEXT_PUBLIC_USE_MOCK_API=true`; public dir only, no DB preference |

### Future final route

**Keep:** `apps/web/src/app/api/v1/assets/[key]/route.ts`  
**Remove:** `apps/api/src/app/api/v1/assets/[key]/route.ts` (after merge)

### Merge behavior (from API route)

1. Serve **DB `Asset` first** (`preferDatabase: true`).
2. On DB miss, fallback to `apps/web/public/` (via `resolveWebPublicDir()`).
3. Preserve `Content-Type` from asset metadata.
4. Preserve `Cache-Control: ASSET_CACHE_CONTROL` (immutable).
5. Preserve 404 JSON envelope: `{ error: { message, code: "NOT_FOUND" } }`.
6. Use `handleApiRoute` / `serveAssetByKey` from server lib.

### Pre-merge fix (done)

`apps/api/src/lib/assets.ts` exports `resolveWebPublicDir()`:

1. `WEB_PUBLIC_DIR` env if set (relative or absolute)
2. Else `cwd` under `apps/api` → `../web/public`
3. Else `cwd` under `apps/web` → `./public`
4. Else legacy fallback `../web/public`

---

## E. Server namespace plan

Move backend code under `apps/web/src/server/` to avoid `@/` alias collisions.

| From | To |
|------|-----|
| `apps/api/src/features/**` | `apps/web/src/server/features/**` |
| `apps/api/src/lib/**` | `apps/web/src/server/lib/**` |
| `apps/api/src/instrumentation.ts` | `apps/web/src/instrumentation.ts` |
| `apps/api/src/app/api/**` | `apps/web/src/app/api/**` (merge routes; dedupe assets) |

Route handlers stay in `src/app/api/` (Next.js convention). Only features/lib move to `src/server/`.

---

## F. Import rewrite rules

During merge, rewrite imports in moved files:

| Before | After |
|--------|-------|
| `@/features/...` | `@/server/features/...` |
| `@/lib/...` (backend) | `@/server/lib/...` |
| `@estate/db` | unchanged |
| `@estate/db/server` | unchanged |

**tsconfig paths (`apps/web`):** add `@/server/*` → `./src/server/*`. Keep existing `@/*` for frontend.

**Do not** import from `apps/api` in frontend code — only HTTP until merge completes.

---

## G. Dependency merge checklist

Add to `apps/web/package.json` during merge (from `apps/api`):

| Package | Currently in apps/api | Currently in apps/web | Add during merge? | Why |
|---------|----------------------|----------------------|-------------------|-----|
| `@aws-sdk/client-s3` | yes | no | **yes** | R2 media upload (`lib/r2`, admin media) |
| `@node-rs/argon2` | yes | no | **yes** | Admin password hashing |
| `@upstash/ratelimit` | yes | no | **yes** | Contact/admin rate limits |
| `@upstash/redis` | yes | no | **yes** | Redis cache + rate limit store |
| `jose` | yes | no (root devDep only) | **yes** | JWT sign/verify for admin auth |
| `resend` | yes | no | **yes** | Contact form email |
| `@estate/db` | yes | yes | no | already in web |
| `next`, `react`, `react-dom`, `zod` | yes | yes | no | align versions if drift |
| `eslint`, `typescript`, `@types/*` | yes | yes | no | merge devDeps as needed |

Root `package.json` has `jose` as devDependency for `issue-admin-token.mjs` — can stay at root or move to web after merge.

---

## H. Env merge checklist

After merge, prefer **one** env surface: root `.env` + `apps/web/.env.local` (or root only if Next is configured to load it). Remove `apps/api/.env.local`.

| Env variable | Group | Required after merge? | Secret? | NEXT_PUBLIC allowed? | Used for |
|--------------|-------|----------------------|---------|----------------------|----------|
| `DATABASE_URL` | Database | **yes** | **yes** | **NO** | Prisma runtime queries |
| `DIRECT_URL` | Database | **yes** (migrations) | **yes** | **NO** | Prisma migrate |
| `DATABASE_CONNECTION_LIMIT` | Database | optional | no | NO | Connection pool size |
| `DATABASE_POOL_TIMEOUT` | Database | optional | no | NO | Pool timeout (seconds) |
| `JWT_SECRET` | Auth | **yes** | **yes** | **NO** | Admin JWT signing |
| `JWT_EXPIRES_IN` | Auth | optional | no | NO | Token TTL |
| `ADMIN_EMAIL` | Auth | seed/dev | no | NO | Admin seed login |
| `ADMIN_PASSWORD` | Auth | seed/dev | **yes** | **NO** | Admin seed password |
| `NEXT_PUBLIC_API_URL` | Frontend public | optional post-merge | no | **yes** | Client API base; same-origin `/api/v1` may replace |
| `NEXT_PUBLIC_USE_MOCK_API` | Frontend public | dev only | no | **yes** | Mock same-origin assets/API |
| `RESEND_API_KEY` | Email | prod contact | **yes** | **NO** | Resend API |
| `RESEND_FROM_EMAIL` | Email | prod contact | no | NO | From address |
| `CONTACT_NOTIFY_EMAIL` | Email | prod contact | no | NO | Inbox for inquiries |
| `R2_ACCOUNT_ID` | Storage/R2 | media features | no | NO | Cloudflare account |
| `R2_ACCESS_KEY_ID` | Storage/R2 | media features | semi | **NO** | R2 access key |
| `R2_SECRET_ACCESS_KEY` | Storage/R2 | media features | **yes** | **NO** | R2 secret |
| `R2_BUCKET_NAME` | Storage/R2 | media features | no | NO | Bucket name |
| `R2_PUBLIC_URL` | Storage/R2 | media features | no | NO | Public CDN base |
| `IDRAM_TEST_MODE` | Payments | payments | no | NO | Sandbox toggle |
| `API_PUBLIC_URL` | Payments | payments | no | NO | Callback base URL override |
| `UPSTASH_REDIS_REST_URL` | Cache/rate-limit | optional | no | NO | Redis REST endpoint |
| `UPSTASH_REDIS_REST_TOKEN` | Cache/rate-limit | optional | **yes** | **NO** | Redis auth |
| `CACHE_TTL_SEC` | Cache/rate-limit | optional | no | NO | Public GET cache TTL |
| `RATE_LIMIT_CONTACT_MAX` | Cache/rate-limit | optional | no | NO | Contact POST limit |
| `RATE_LIMIT_CONTACT_WINDOW_SEC` | Cache/rate-limit | optional | no | NO | Contact window |
| `RATE_LIMIT_ADMIN_MAX` | Cache/rate-limit | optional | no | NO | Admin route limit |
| `RATE_LIMIT_ADMIN_WINDOW_SEC` | Cache/rate-limit | optional | no | NO | Admin window |
| `APP_URL` | App/CORS | **yes** | no | NO | Site origin, metadata |
| `API_URL` | App/CORS | optional | no | NO | Check scripts override (not always in .env) |
| `API_DEV_ORIGIN` | App/CORS | dev optional | no | NO | API dev origin hint |
| `WEB_PUBLIC_DIR` | Assets | optional | no | NO | Override public dir for asset fallback |
| `SENTRY_DSN` | Observability | optional | semi | **NO** | Error reporting |

**Never expose via NEXT_PUBLIC:** `DATABASE_URL`, `JWT_SECRET`, `R2_SECRET_ACCESS_KEY`, `UPSTASH_REDIS_REST_TOKEN`, `RESEND_API_KEY`, `ADMIN_PASSWORD`.

### Separate-mode expected values

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_USE_MOCK_API=false   # required to test live API from web
APP_URL=http://localhost:3000
API_DEV_ORIGIN=http://localhost:3001
```

### Post-merge expected values

```env
NEXT_PUBLIC_USE_MOCK_API=false
# Client may use relative /api/v1 or NEXT_PUBLIC_API_URL=http://localhost:3000
APP_URL=http://localhost:3000
```

---

## I. Check scripts migration checklist

Do **not** change defaults until merge is complete. All scripts support `API_URL` override, then fall back to `NEXT_PUBLIC_API_URL`, then default.

| Script | Current default URL | Future merged default URL | Uses API_URL override? | Env needed |
|--------|--------------------|---------------------------|------------------------|------------|
| `check-health.mjs` | http://localhost:3001 | http://localhost:3000 | yes (`API_URL` → `NEXT_PUBLIC_API_URL`) | Running API, DB |
| `check-assets.mjs` | http://localhost:3001 | http://localhost:3000 | yes | Running API, seeded assets |
| `check-api-standards.mjs` | http://localhost:3001 | http://localhost:3000 | yes | Running API |
| `check-contact.mjs` | http://localhost:3001 | http://localhost:3000 | yes | Running API |
| `check-auth.mjs` | http://localhost:3001 | http://localhost:3000 | yes | Running API, `JWT_SECRET`, admin seed |
| `check-portfolio.mjs` | http://localhost:3001 | http://localhost:3000 | yes | Running API |
| `check-recent-work.mjs` | http://localhost:3001 | http://localhost:3000 | yes | Running API |
| `check-resources.mjs` | http://localhost:3001 | http://localhost:3000 | yes | Running API |
| `check-pricing.mjs` | http://localhost:3001 | http://localhost:3000 | yes | Running API |
| `check-i18n.mjs` | http://localhost:3001 | http://localhost:3000 | yes | Running API |
| `check-admin-assets.mjs` | http://localhost:3001 | http://localhost:3000 | yes | Running API, admin JWT |
| `check-payments.mjs` | http://localhost:3001 | http://localhost:3000 | yes | Running API |
| `check-cache.mjs` | http://localhost:3001 | http://localhost:3000 | yes | Running API, optional Upstash |
| `check-rate-limit.mjs` | http://localhost:3001 | http://localhost:3000 | yes | Running API |
| `issue-admin-token.mjs` | N/A (local JWT) | N/A | no | Root `.env` `JWT_SECRET` |

Root scripts: `pnpm health:check`, `pnpm assets:check`, etc. map to these files.

---

## J. CORS changes after merge

**Current:** `apps/api/next.config.ts` adds CORS headers on all `/api/:path*` responses so browser on :3000 can call :3001.

**After merge:** Same-origin requests from `apps/web` → no CORS needed for normal UI flows.

**Actions:**

1. Remove or narrow CORS headers in merged `apps/web/next.config.ts` (API-only headers block from api config).
2. Keep `APP_URL` for metadata/redirects, not cross-origin API.
3. If external clients call API later, add explicit allowlist — do not restore blanket CORS without review.

---

## K. Instrumentation plan

1. Copy `apps/api/src/instrumentation.ts` → `apps/web/src/instrumentation.ts`.
2. Update import: `@/lib/env` → `@/server/lib/env` (after server namespace move).
3. Enable in `apps/web/next.config.ts` if not already (`experimental.instrumentationHook` — verify Next 16 defaults).
4. Remove duplicate from `apps/api` only after API app is deleted.

`ensureDatabaseReady()` validates DB connectivity at startup — important for merged single app.

---

## L. Step-by-step future merge order

1. **Branch** — `feat/merge-api-into-web`.
2. **Deps** — Add backend packages to `apps/web/package.json`; `pnpm install`.
3. **Server namespace** — Copy `apps/api/src/features` → `apps/web/src/server/features`; same for `lib`.
4. **tsconfig** — Add `@/server/*` path mapping; rewrite imports in copied files.
5. **Routes** — Copy `apps/api/src/app/api/v1/**` into `apps/web/src/app/api/v1/**`.
6. **Dedupe assets** — Replace web mock asset route with API `serveAssetByKey` logic; delete api duplicate path conceptually (single file in web).
7. **Instrumentation** — Move to `apps/web/src/instrumentation.ts`.
8. **next.config** — Merge transpilePackages, headers (then strip CORS), any api-specific config.
9. **Env** — Consolidate to web `.env.local`; document removed `apps/api/.env.local`.
10. **Frontend wiring** — Set `NEXT_PUBLIC_USE_MOCK_API=false`; point client to same-origin or `http://localhost:3000`.
11. **Check scripts** — Change `DEFAULT_API_URL` to `http://localhost:3000` in all `scripts/check-*.mjs`.
12. **Validate** — `pnpm db:generate`, `lint`, `typecheck`, `build`; run all `pnpm *:check` against :3000.
13. **Remove apps/api** — Delete app, remove from `pnpm-workspace.yaml`, root scripts (`dev:api` → optional alias or remove).
14. **Docs** — Update README, TECH_CARD, backend-doc.

---

## M. Rollback plan

If merge branch fails validation:

1. **Do not merge to main** — abandon or fix forward on branch.
2. **Separate apps still on main** — `pnpm dev:web` + `pnpm dev:api` remain valid.
3. **Revert commit range** — `git revert` merge commits or reset branch to pre-merge SHA.
4. **Restore env** — Keep `apps/api/.env.local` backup until cutover confirmed.
5. **DNS/deploy** — If staging was switched to single app, redeploy previous two-app or web-only mock configuration.

Pre-merge commits (e.g. `resolveWebPublicDir`, this doc) are safe on main — they do not break separate mode.

---

## Validation (separate mode)

With both servers running:

```bash
pnpm dev:web   # :3000
pnpm dev:api   # :3001
curl http://localhost:3001/api/v1/health
curl http://localhost:3001/api/v1/assets/site-logo
curl http://localhost:3001/api/v1/portfolio
curl http://localhost:3001/api/v1/pricing
```

Use `API_URL=http://localhost:3001 pnpm health:check` if root `.env` has wrong `NEXT_PUBLIC_API_URL`.

---

*Last updated: merge completed — `apps/api` removed; single app at `apps/web` on :3000.*
