# Backend — տեխնիկական պլան (Estate.data)

> Վերջին աուդիտ. 2026-05-25  
> Հիմնական աղբյուրներ. `apps/api/README.md`, `apps/web/src/shared/api/`, `packages/db/`, `docs/BRIEF.md` (դեռ չի լրացվել), `.env.example`

---

## 1. Ներկայիս վիճակ (կարճ)

| Շերտ | Տեղ | Ստատուս |
|------|-----|---------|
| Frontend | `apps/web` (Next.js 16) | ✅ Marketing UI, static copy |
| API app | `apps/api` | ⬜ Scaffold միայն (`dev` script-ը log է տալիս) |
| DB package | `packages/db` (Prisma) | 🟡 `Asset` մոդել + migration + seed |
| API route (իրական) | `apps/web/src/app/api/v1/assets/[key]` | 🟡 Աշխատում է **web**-ում, ոչ `apps/api`-ում |
| `apiClient` + `API_ROUTES` | `apps/web/src/shared/api/` | 🟡 Միայն `health`, `assets` path-եր; mock mode default |
| BRIEF / TECH_CARD | `docs/` | ⬜ Չեն լրացվել — բիզնես-պահանջները infer են արված կոդից |

**Նախատեսված ճարտարապետություն.** Monorepo, առանձին Next.js backend (`apps/api`, port **3001**), frontend-ը կանչում է HTTP-ով (`NEXT_PUBLIC_API_URL`). Frontend-ը **չի** import անում `apps/api`-ից։

---

## 2. Backend առաջադրանքներ — հերթական աղյուսակ

Հերթականությունը՝ ինֆրակառուցվածք → core API → դոմեն → ապագա (CMS, վճարումներ)։

| # | Առաջադրանք | Առաջնայնություն | Ինչպես իրականացնել | API / մոդել | Կախվածություն |
|---|------------|-----------------|---------------------|--------------|---------------|
| **0** | **Տեխզադրանք և stack** | P0 | Լրացնել `docs/BRIEF.md`, ստեղծել/հաստատել `docs/TECH_CARD.md` (Next API vs NestJS, auth, email). Ամրագրել project size `00-core.mdc`-ում | — | Մշակողի հաստատում |
| **1** | **`apps/api` scaffold** | P0 | Next.js App Router `apps/api`-ում. `src/app/v1/*`, `src/lib/*`. `pnpm dev:api` → port 3001. CORS. `APP_URL` / `API_DEV_ORIGIN` | — | #0 |
| **2** | **Env և secrets** | P0 | Root `.env` + `apps/web/.env.local` + `apps/api/.env.local`. `DATABASE_URL`, `DIRECT_URL`, `JWT_SECRET`, Resend/R2 ըստ need-ի. `.env.example` sync | — | Neon, մշակող |
| **3** | **DB միացում API-ում** | P0 | `@estate/db` import `apps/api`-ում. Prisma singleton, connection limits ըստ TECH_CARD | — | #1, #2 |
| **4** | **`GET /v1/health`** | P0 | JSON `{ "data": { "status": "ok" } }` կամ flat `{ "status": "ok" }` — **միևնույն** `ApiEnvelope`/`apiClient` հետ | `API_ROUTES.health` | #1, #3 |
| **5** | **`GET /v1/assets/:key`** | P0 | Տեղափոխել logic-ը `apps/web/.../assets/[key]` → `apps/api`. Public fallback `public/`-ից կամ DB bytes. `Cache-Control: immutable` | `API_ROUTES.assets` + `Asset` | #3, seed |
| **6** | **Web ↔ API wiring** | P0 | Prod/dev. `NEXT_PUBLIC_API_URL=http://localhost:3001`, `NEXT_PUBLIC_USE_MOCK_API=false`. Web-ում asset route — proxy կամ հեռացնել duplicate | — | #4, #5 |
| **7** | **API ստանդարտներ** | P1 | Zod validation boundaries, `{ data, meta? }` envelope, `{ error: { message, code? } }`, request ID, structured logging (չ `console.log` prod-ում) | Բոլոր endpoints | #1 |
| **8** | **Rate limiting** | P1 | Contact/auth endpoints. Upstash Redis կամ edge middleware — արժեքները TECH_CARD-ով | `/v1/contact`, auth | #2, TECH_CARD |
| **9** | **Contact form backend** | P1 | UI արդեն կա (`ContactRequestForm` — միայն `preventDefault`). `POST /v1/contact` — Zod body, DB `ContactInquiry` կամ straight Resend | Նոր մոդել + route | #7, Resend |
| **10** | **Contact — email notification** | P1 | Resend template studio-ին + optional user confirmation. Idempotency key / duplicate detection | — | #9, `RESEND_*` |
| **11** | **Observability** | P1 | Health extended (DB ping), error logging, 5xx alerts (Vercel/Render + Sentry optional) | `/v1/health` | #4 |
| **12** | **Assets — admin upload (optional phase 1)** | P2 | `POST /v1/admin/assets` multipart → R2 **կամ** DB bytes (ներկայիս schema-ն DB-ում է). Auth guard | `Asset` / R2 keys | Auth, R2 |
| **13** | **Portfolio CMS** | P2 | Մոդել `PortfolioProject` (category, images R2 URLs, sort, published). `GET /v1/portfolio` public; admin CRUD | Frontend comment. «replace via admin» | #12, auth |
| **14** | **Home «Recent work» API** | P2 | `GET /v1/projects/recent?limit=4` — featured subset կամ portfolio query | `recentWorkCopy` placeholder | #13 |
| **15** | **Resources / articles CMS** | P3 | `Article`, `FaqItem` մոդելներ; slug pages `app/resources/[slug]`. Հիմա միայն list copy, detail routes չկան | Static `RESOURCES_ARTICLES` | #13 |
| **16** | **Pricing / packages (dynamic)** | P3 | Եթե պետք է admin-ից փոխել — `PricingPackage` մոդել; հիմա ամբողջությամբ TS copy | `pricing*Copy.ts` | #13 |
| **17** | **Auth (admin)** | P2 | JWT կամ Auth.js — `.env.example`-ում `JWT_*` placeholder կա, կոդ չկա. Role `admin`, protected `/v1/admin/*` | — | TECH_CARD |
| **18** | **R2 file storage** | P2 | Մեծ մեդիա portfolio/video — `R2_*` env. Presigned upload admin-ի համար | — | #12, #17 |
| **19** | **Redis / cache** | P3 | Upstash — session, rate limit, hot lists | — | TECH_CARD |
| **20** | **Payments (AM)** | P4 | `docs/reference/payment integration/` — Ameriabank, Idram, TelCell… Միայն եթե BRIEF-ում նշված է | `/api/v1/payments/{provider}/*` | Orders, webhooks, #17 |
| **21** | **i18n content API** | P4 | Միայն եթե BRIEF-ում բազմալեզու CMS | — | BRIEF |
| **22** | **CI backend checks** | P1 | `apps/api` build, typecheck, integration test health/assets; migrate deploy step | — | #1 |

---

## 3. API contract (frontend ↔ backend)

### 3.1 Central routes (`apps/web/src/shared/api/routes.ts`)

| Key | Path | Method | Նշում |
|-----|------|--------|-------|
| `health` | `/api/v1/health` | GET | `fetchHealth()` — mock եթե `NEXT_PUBLIC_USE_MOCK_API=true` |
| `assets` | `/api/v1/assets` | GET | Base path; իրականը `.../assets/{key}` |

Նոր endpoint ավելացնելիս.  
1) Ավելացնել `API_ROUTES`  
2) Իրականացնել `apps/api`  
3) Feature-level service + types  
4) Թարմացնել այս doc + `backend-progress.md`

### 3.2 Response ձևաչափ

```ts
// Հաջողություն (նախընտրելի)
{ "data": T, "meta"?: { ... } }

// Սխալ
{ "error": { "message": string, "code"?: string } }
```

`apiClient` (`apps/web/src/shared/api/client.ts`) unwrap է `data` դաշտը։

### 3.3 Asset URL-ներ

`assetUrl(key)` → `/api/v1/assets/{key}` (`@estate/db`). Սերվինգը պետք է միակ կետով լինի (#5, #6).

---

## 4. Տվյալների մոդել (ներկայիս + պլանավորված)

### 4.1 Իրականացված (Prisma)

| Մոդել | Դաշտեր | Նպատակ |
|--------|--------|--------|
| `Asset` | `key`, `mimeType`, `fileName`, `data` (Bytes), `byteSize` | Site icons/hero/logos — seed from `apps/web/public` |

### 4.2 Պլանավորված (կոդի մեկնաբերություններից)

| Մոդել | Ֆիչ |
|--------|-----|
| `ContactInquiry` | Contact form submissions |
| `PortfolioProject` | Portfolio grid + filters |
| `Article`, `FaqItem` | Resources page |
| `PricingPackage` | Pricing (optional) |
| `Order`, `Payment` | Payments integration (եթե scope-ում է) |
| `User` / `Session` | Admin auth |

---

## 5. Ֆիչ-ընթացիկ կապ (frontend → backend need)

| Frontend ֆիչ | Ֆայլ / նշում | Backend need |
|--------------|--------------|--------------|
| Contact form | `ContactRequestForm.tsx` — submit չի ուղարկում | #9, #10 |
| Portfolio | `portfolioCopy.ts` — static, CMS comment | #13 |
| Home recent work | `recentWorkCopy.ts` — placeholder | #14 |
| Resources articles | `resourcesContentCopy.ts` — href-եր առանց `[slug]` page | #15 |
| Health (dev check) | `health.ts` + mock flag | #4 |
| Բոլոր `assetUrl()` պատկերներ | `@estate/db` | #5, #6 |
| Pricing / Solutions / Media | TS copy only | #16 (optional) |

---

## 6. Անվտանգություն (պարտադիր minimum)

| Տարածք | Իրականացում |
|--------|--------------|
| Input validation | Zod on every mutating route |
| SQL | Prisma only — parameterized |
| Secrets | Միայն env — ոչ commit |
| CORS | `apps/api` — allowlist `APP_URL` |
| Contact POST | Rate limit (#8), honeypot optional |
| Admin | Auth (#17) before any write |
| Payments webhooks | Signature verify, idempotent status updates (տե՛ս payment docs) |

Մանրամասն checklist. `docs/reference/Check/Security/`

---

## 7. Զարգացման հրամաններ (ակնկալվող)

```bash
# Root
pnpm install
pnpm db:generate
pnpm db:migrate
pnpm db:seed

# Terminal 1 — API (after #1)
pnpm dev:api    # → :3001

# Terminal 2 — Web
pnpm dev:web    # → :3000
```

Env (մինիմում backend ստուգման համար).

```env
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
NEXT_PUBLIC_API_URL="http://localhost:3001"
NEXT_PUBLIC_USE_MOCK_API="false"
```

---

## 8. Որոշումներ, որոնք պետք է հաստատել (մինչև մեծ աշխատանք)

1. **Backend տիպ.** Next.js Route Handlers (`apps/api`) vs NestJS — repo-ն ներկայում նախատեսում է Next (`apps/api/README.md`).
2. **Assets.** DB bytes (ներկայիս) vs R2 CDN — portfolio-ի համար R2 ավելի հարմար է։
3. **CMS scope.** Միայն portfolio թե նաև articles/pricing։
4. **Auth provider.** JWT homemade vs Auth.js / Clerk։
5. **Payments.** Հայկական provider-ներ — միայն եթե prod scope-ում է։

---

## 9. Կապակցված փաստաթղթեր

| Ֆայլ | Նպատակ |
|------|--------|
| [backend-progress.md](./backend-progress.md) | % առաջընթաց, verification |
| [BRIEF.md](./BRIEF.md) | Բիզնես-պահանջներ (լրացնել) |
| `apps/api/README.md` | API app layout |
| `packages/db/README.md` | Migrations + seed |
| `docs/reference/templates/TECH_CARD_TEMPLATE.md` | Stack decisions |

---

*Այս փաստաթուղթը թարմացնել ամեն նոր endpoint / մոդել / փուլի ավարտից հետո։*
