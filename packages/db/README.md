# @estate/db

PostgreSQL storage for site assets (hero, logos, What we do icons).

## Setup

1. Set `DATABASE_URL` (pooled `app_user`) and `DIRECT_URL` (owner, migrations only) in repo or `apps/web/.env.local`.
2. From repo root:

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
import { getPrisma } from "@estate/db/server";
```

The web app serves bytes at `GET /api/v1/assets/[key]`. Without `DATABASE_URL`, the same route falls back to `public/` files.
