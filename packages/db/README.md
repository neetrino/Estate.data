# @estate/db

PostgreSQL storage for site assets and contact form submissions.

## Models

- `Asset` — binary site images (seeded from `apps/web/public`)
- `ContactInquiry` — rows from `POST /api/v1/contact`

## Setup

1. Copy repo root `.env.example` → `.env` and set Neon `DATABASE_URL` (pooled) + `DIRECT_URL` (direct).
2. Copy `apps/web/.env.example` → `apps/web/.env.local` (include the same `DATABASE_*` values).
3. When `apps/api` is scaffolded: copy `apps/api/.env.example` → `apps/api/.env.local`.
4. Verify: `pnpm env:check` then from repo root:

```bash
pnpm install
pnpm db:generate
pnpm db:migrate
pnpm db:seed
```

`db:seed` reads files from `apps/web/public/` (and favicons from `apps/web/src/app/`) and upserts into the `assets` table.

## Usage

```ts
import { ASSET_KEYS, assetUrl } from "@estate/db";

const src = assetUrl(ASSET_KEYS.homeHero); // → /api/v1/assets/home-hero
```

Server-only (API routes, scripts):

```ts
import {
  getPrisma,
  loadAsset,
  parseDatabaseEnv,
  pingDatabase,
  tryGetPrisma,
} from "@estate/db/server";
```

Pool limits — set in env (appended to runtime `DATABASE_URL`):

- `DATABASE_CONNECTION_LIMIT` (default `10`)
- `DATABASE_POOL_TIMEOUT` (default `20`, seconds)

The API app validates `DATABASE_URL` at boot (`apps/api/src/instrumentation.ts`) and serves assets from PostgreSQL first (`preferDatabase: true`).
