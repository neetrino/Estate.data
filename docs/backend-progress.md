# Backend — առաջընթաց (Estate.data)

> Վերջին թարմացում. 2026-05-25  
> Մանրամասն պլան. [backend-doc.md](./backend-doc.md)

---

## Ընդհանուր առաջընթաց

| Մետրիկա | Արժեք |
|---------|-------|
| **Ընդհանուր backend completion** | **~12%** |
| P0 առաջադրանքներ (0–6) | ~15% միջին |
| P1 (7–11, 22) | ~0% |
| P2+ (12–21) | 0% (պլանավորված) |
| Վերջին verification run | 2026-05-25 — codebase audit (տե՛ս ստորև) |

**Ինչպես հաշվարկել.** Յուրաքանչյուր տողի `%` × կշիռ (P0=3, P1=2, P2=1, P3/P4=0.5) — կամ պարզապես միջին `#` սյունակից (ստորև աղյուսակ)։

---

## Առաջադրանքների աղյուսակ

Ստատուսներ. ✅ Done · 🟡 Partial · ⬜ Not started · 🔒 Blocked (պետք է մշակող/TECH_CARD)

| # | Առաջադրանք | % | Ստատուս | Ինչ է արված | Ինչ չի արված | Ինչպես ստուգել (acceptance) |
|---|------------|---|---------|-------------|--------------|---------------------------|
| 0 | BRIEF + TECH_CARD | 0% | ⬜ | Template `docs/BRIEF.md` կա | Լրացված բիզնես-պահանջներ, stack հաստատում | `docs/BRIEF.md` և `docs/TECH_CARD.md` լրացված, հաստատված chat-ում |
| 1 | `apps/api` scaffold | 0% | ⬜ | `apps/api/README.md`, placeholder `package.json` | Next.js app, `dev` on :3001, build | `pnpm dev:api` բացում է server, `curl localhost:3001/api/v1/health` |
| 2 | Env / secrets | 5% | 🟡 | Root `.env.example` (DATABASE, JWT, Resend, R2, Redis) | Լրացված `.env`, Neon connected | `DATABASE_URL` set → `pnpm db:migrate` success |
| 3 | DB in API | 30% | 🟡 | `@estate/db`, Prisma schema `Asset`, migration, seed script | API app doesn't use db yet | `pnpm db:seed` + row in `assets` table |
| 4 | `GET /v1/health` | 0% | ⬜ | Frontend `fetchHealth()` + mock | Real endpoint in `apps/api` | `curl -s $API_URL/api/v1/health` → 200 + `status: ok`; web with `USE_MOCK_API=false` same |
| 5 | `GET /v1/assets/:key` | 45% | 🟡 | Full handler in **web** `apps/web/src/app/api/v1/assets/[key]/route.ts` (DB + public fallback) | Not in `apps/api`; duplicate risk | `curl -I http://localhost:3000/api/v1/assets/home-hero` → 200 image; after move: :3001 |
| 6 | Web ↔ API wiring | 10% | 🟡 | `apiClient`, `API_ROUTES`, env schema | `NEXT_PUBLIC_USE_MOCK_API` default **true**; API app empty | Set mock false → home health hits :3001; assets URL points to API base |
| 7 | API standards (Zod, envelope, errors) | 5% | 🟡 | Types in `shared/api/types.ts` | Server-side Zod, consistent errors in api | POST invalid body → 400 + `{ error }`; success → `{ data }` |
| 8 | Rate limiting | 0% | ⬜ | Security docs only | Middleware / Upstash | 11+ rapid POST `/v1/contact` → 429 |
| 9 | Contact `POST /v1/contact` | 0% | ⬜ | Form UI complete | Handler, validation, persistence | Submit form → 201 + row in DB or logged payload |
| 10 | Contact email (Resend) | 0% | ⬜ | Env placeholders | Send on submit | Test inbox receives email; API key in env only |
| 11 | Observability | 0% | ⬜ | — | Health DB check, logging | `/health` shows `db: ok` when DB up; errors in log sink |
| 12 | Admin asset upload | 0% | ⬜ | Seed CLI only | Authenticated upload endpoint | Admin POST replaces asset; GET returns new bytes |
| 13 | Portfolio CMS | 0% | ⬜ | Static `PORTFOLIO_PAGE_COPY.projects` | DB + `GET /v1/portfolio` | Change in admin → web portfolio updates without deploy |
| 14 | Recent work API | 0% | ⬜ | Static `HOME_RECENT_WORK_COPY` | API feed | `GET /v1/projects/recent` drives home section |
| 15 | Articles / FAQ CMS | 0% | ⬜ | Static lists in copy | Models + slug pages | `/resources/[slug]` renders from DB |
| 16 | Dynamic pricing | 0% | ⬜ | All pricing in TS files | Optional API | Admin edit → pricing page reflects |
| 17 | Admin auth | 0% | ⬜ | `JWT_*` in `.env.example` | Login, guards | Without token → 401 on `/v1/admin/*` |
| 18 | R2 storage | 0% | ⬜ | Env placeholders | Upload/serve large media | File in R2 bucket; URL loads in browser |
| 19 | Redis cache | 0% | ⬜ | Env placeholders | Client + usage | Rate limit or cache hit measurable |
| 20 | Payments | 0% | ⬜ | Reference docs in `docs/reference/payment integration/` | No code | Provider sandbox callback updates order status |
| 21 | i18n API | 0% | ⬜ | — | — | N/A until BRIEF requires |
| 22 | CI backend | 0% | ⬜ | Root `pnpm build` may skip api | Workflow builds `apps/api`, tests health | PR CI green including api job |

---

## Իրականացված կոմպոնենտներ (audit 2026-05-25)

### ✅ / 🟡 Կոդում կա

| Կոմպոնենտ | Տեղ | Real prod-ready? |
|-----------|-----|------------------|
| Prisma `Asset` + migration | `packages/db/prisma/` | 🟡 Այո, եթե DB connected |
| Seed assets from `public/` | `packages/db/prisma/seed.ts` | ✅ Dev workflow |
| Asset GET handler | `apps/web/.../assets/[key]/route.ts` | 🟡 Works on **web** host, not separate API |
| `assetUrl()`, `ASSET_KEYS` | `packages/db/src/` | ✅ |
| API client + routes registry | `apps/web/src/shared/api/` | 🟡 Client ready; backend missing |
| Contact form UI | `ContactRequestForm.tsx` | ⬜ No network on submit |
| Mock health | `health.ts` when `USE_MOCK_API=true` | ✅ Dev only |

### ⬜ Բացակայում

- `apps/api` Next.js application
- `GET /v1/health` on API host
- Բոլոր mutating endpoints (contact, admin, payments)
- Auth, Resend, R2, Redis ինտեգրացիա
- CMS մոդելներ (portfolio, articles, …)
- `docs/TECH_CARD.md`, լրացված `BRIEF.md`

---

## Verification checklist (copy-paste sprint)

Նշել ✅ միայն եթե հրամանը **հենց այս պահին** հաջող է (ոչ թե «կարծես աշխատում է»)։

### Infrastructure

```bash
# 1) DB
pnpm db:generate && pnpm db:migrate && pnpm db:seed
# Ստուգում: seed-ը տպում է "Seeded asset: ..." առանց error
```

```bash
# 2) API server (after task #1)
pnpm dev:api
curl -s http://localhost:3001/api/v1/health
# Սպասվող: HTTP 200, JSON-ում status ok
```

### Assets

```bash
# Web fallback (ներկայիս)
curl -sI http://localhost:3000/api/v1/assets/site-logo | findstr /i "HTTP content-type"
# Սպասվող: 200, image/*

# After migration to apps/api
curl -sI http://localhost:3001/api/v1/assets/site-logo
```

```bash
# DB-backed (պետք է DATABASE_URL)
# psql or Prisma Studio: SELECT key, byte_size FROM assets LIMIT 3;
```

### Frontend integration

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_USE_MOCK_API=false
```

- Բացել home — network tab-ում **չպետք է** mock-only; եթե health call կա → `:3001`
- Contact form submit → `POST` `:3001/api/v1/contact` (այս փուլում դեռ ⬜)

---

## Sprint առաջնայնություն (առաջարկված)

| Փուլ | # tasks | Նպատակ | Target % (cumulative) |
|------|---------|--------|------------------------|
| Sprint 1 | 0–6 | API app + health + assets move + env | ~40% |
| Sprint 2 | 7–11, 22 | Standards, contact, CI | ~55% |
| Sprint 3 | 12–18 | Admin, portfolio, R2 | ~75% |
| Sprint 4 | 19–21 | Cache, articles, i18n | ~85% |
| Sprint 5 | 20 | Payments (if in scope) | 100% |

---

## Թարմացման կանոն

1. Ամեն առաջադրանքի ավարտից հետո թարմացնել **%** և **Ստատուս**։
2. «Ինչ է արված» մեջ միայն **merge-ված / deploy-ված** իրեր (ոչ միայն plan)։
3. Verification սյունակում թողնել հրամանը, որը մշակողը կարող է կրկնել։
4. Ընդհանուր % — միջին կամ կշռված; փոխել **Ամսաթիվ** վերևում։

---

## Արագ կապեր

- Պլան և «ինչպես». [backend-doc.md](./backend-doc.md)
- Onboarding checklist. [../list.md](../list.md)
- API README. [../apps/api/README.md](../apps/api/README.md)
