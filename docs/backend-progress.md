# Backend — առաջընթաց (Estate.data)

> Վերջին թարմացում. 2026-05-25  
> Մանրամասն պլան. [backend-doc.md](./backend-doc.md)

---

## Ընդհանուր առաջընթաց

| Մետրիկա | Արժեք |
|---------|-------|
| **Ընդհանուր backend completion** | **100%** |
| P0 առաջադրանքներ (0–6) | 100% |
| P1 (7–11, 22) | 100% |
| P2+ (12–21) | 100% |
| Վերջին verification run | 2026-05-25 — auth, payments, CMS, i18n, contact |

**Ինչպես հաշվարկել.** Յուրաքանչյուր տողի `%` × կշիռ (P0=3, P1=2, P2=1, P3/P4=0.5) — կամ պարզապես միջին `#` սյունակից (ստորև աղյուսակ)։

---

## Առաջադրանքների աղյուսակ

Ստատուսներ. ✅ Done · 🟡 Partial · ⬜ Not started · 🔒 Blocked (պետք է մշակող/TECH_CARD)

| # | Առաջադրանք | % | Ստատուս | Ինչ է արված | Ինչ չի արված | Ինչպես ստուգել (acceptance) |
|---|------------|---|---------|-------------|--------------|---------------------------|
| 0 | BRIEF + TECH_CARD | 100% | ✅ | `docs/BRIEF.md`, `docs/TECH_CARD.md` լրացված; Size B `00-core.mdc` | — | Փաստաթղթերը կարդալ chat-ում հաստատված |
| 1 | `apps/api` scaffold | 100% | ✅ | Next.js :3001, CORS, 25+ routes, `vercel.json` | — | `pnpm dev:api` → `curl localhost:3001/api/v1/health` |
| 2 | Env / secrets | 100% | ✅ | Root `.env`, per-app examples, `pnpm env:check`, Prisma dotenv | Prod keys (Resend/R2) — մշակողի env | `pnpm env:check` OK |
| 3 | DB in API | 100% | ✅ | `@estate/db`, pool limits, boot ping, assets DB-first | Neon `app_user` prod split (ops) | `pnpm health:check` → `db: ok` |
| 4 | `GET /v1/health` | 100% | ✅ | Health + DB ping, 503 when down, `pnpm health:check` | — | `pnpm health:check` |
| 5 | `GET /v1/assets/:key` | 100% | ✅ | `serveAssetByKey`, DB + fallback, `pnpm assets:check` | — | `pnpm assets:check` |
| 6 | Web ↔ API wiring | 100% | ✅ | `resolveAssetUrl`, `API_ROUTES`, mock mode documented | Web locale routing (frontend phase) | `USE_MOCK_API=false` + both apps |
| 7 | API standards (Zod, envelope, errors) | 100% | ✅ | `handleApiRoute`, `ApiError`, `x-request-id`, `pnpm standards:check` | — | `pnpm standards:check` |
| 8 | Rate limiting | 100% | ✅ | Contact + admin limits; Upstash + memory; `pnpm rate-limit:check` | — | `pnpm rate-limit:check` |
| 9 | Contact `POST /v1/contact` | 100% | ✅ | Prisma persist, 201, form wired, `pnpm contact:check` | — | `pnpm contact:check` |
| 10 | Contact email (Resend) | 100% | ✅ | `sendContactNotification()` on submit; skip if env missing | Prod Resend domain verify | Set `RESEND_*` → inbox receives mail |
| 11 | Observability | 100% | ✅ | Structured JSON logs, access/error + requestId | Sentry optional (`SENTRY_DSN`) | `pnpm health:check`; API stderr JSON |
| 12 | Admin asset upload | 100% | ✅ | POST multipart → DB; JWT; R2 media POST `/admin/media`; `pnpm admin-assets:check` | Admin UI | `pnpm admin-assets:check` |
| 13 | Portfolio CMS | 100% | ✅ | Model, GET, admin CRUD, i18n, seed, `pnpm portfolio:check` | Admin UI | `pnpm portfolio:check` |
| 14 | Recent work API | 100% | ✅ | `featuredOnHome` filter, `?limit=`, `pnpm recent-work:check` | — | `pnpm recent-work:check` |
| 15 | Articles / FAQ CMS | 100% | ✅ | Models, GET/slug, admin, resources pages, `pnpm resources:check` | Rich editor UI | `pnpm resources:check` |
| 16 | Dynamic pricing | 100% | ✅ | Categories/packages, GET, admin PATCH, i18n category titles, `pnpm pricing:check` | Admin UI | `pnpm pricing:check` |
| 17 | Admin auth | 100% | ✅ | `User` model, argon2, login + refresh, JWT guard, `pnpm auth:check`, seed admin | Admin login UI | `pnpm auth:check` |
| 18 | R2 storage | 100% | ✅ | S3 client, `POST /admin/media`, `GET /media/[...path]`, public URL | Prod bucket + CDN | Upload → `R2_PUBLIC_URL` or API media path |
| 19 | Redis cache | 100% | ✅ | Upstash GET cache (portfolio/pricing); rate limit; `pnpm cache:check` | — | `pnpm cache:check` (with Upstash env) |
| 20 | Payments | 100% | ✅ | `Order`/`Payment`, orders POST, Idram sandbox init/callback, `pnpm payments:check` | Live provider credentials | `pnpm payments:check` |
| 21 | i18n API | 100% | ✅ | Locales, article/FAQ/portfolio/pricing `?locale=`, admin PUT translations, `pnpm i18n:check` | Web `next-intl` routing | `pnpm i18n:check` |
| 22 | CI backend | 100% | ✅ | `.github/workflows/ci.yml` — install, generate, typecheck, lint, build | Integration tests in CI (optional) | PR → CI green |

---

## Իրականացված կոմպոնենտներ (audit 2026-05-25)

### ✅ Production-ready backend

| Կոմպոնենտ | Տեղ |
|-----------|-----|
| Prisma models (Asset → Payment) | `packages/db/prisma/schema.prisma` |
| API routes (public + admin) | `apps/api/src/app/api/v1/` |
| Auth (login/refresh/JWT) | `apps/api/src/features/auth/`, `lib/auth/` |
| Resend contact email | `features/contact/send-contact-notification.ts` |
| R2 upload/serve | `lib/r2/`, `admin/media`, `media/[...path]` |
| Redis cache + rate limit | `lib/cache/`, `lib/rate-limit/` |
| Payments sandbox | `features/payments/`, `payments/*` |
| Verification scripts | `scripts/check-*.mjs`, root `package.json` |
| CI | `.github/workflows/ci.yml` |
| BRIEF + TECH_CARD | `docs/BRIEF.md`, `docs/TECH_CARD.md` |

### Օպերացիոն նշումներ (ոչ backend code gaps)

- **Admin UI** — API պատրաստ է; frontend admin panel ապագա փուլ
- **Prod secrets** — Resend, R2, Upstash, payment live keys — միայն deploy env
- **Neon `app_user`** — production DB role split ըստ ops checklist

---

## Verification checklist (copy-paste sprint)

Նշել ✅ միայն եթե հրամանը **հենց այս պահին** հաջող է։

```bash
pnpm env:check
pnpm health:check
pnpm db:migrate && pnpm db:seed
pnpm dev:api   # terminal 1
```

```bash
pnpm standards:check
pnpm rate-limit:check
pnpm assets:check
pnpm contact:check
pnpm auth:check
pnpm admin-assets:check
pnpm portfolio:check
pnpm recent-work:check
pnpm resources:check
pnpm pricing:check
pnpm i18n:check
pnpm payments:check
pnpm cache:check   # optional — needs UPSTASH_REDIS_REST_*
```

---

## Sprint առաջնայնություն (ավարտված)

| Փուլ | # tasks | Target % | Actual |
|------|---------|----------|--------|
| Sprint 1 | 0–6 | ~40% | ✅ 100% |
| Sprint 2 | 7–11, 22 | ~55% | ✅ 100% |
| Sprint 3 | 12–18 | ~75% | ✅ 100% |
| Sprint 4 | 19–21 | ~85% | ✅ 100% |
| Sprint 5 | 20 | 100% | ✅ 100% |

---

## Թարմացման կանոն

1. Ամեն առաջադրանքի ավարտից հետո թարմացնել **%** և **Ստատուս**։
2. «Ինչ է արված» մեջ միայն **merge-ված / verify-ված** իրեր։
3. Verification սյունակում թողնել հրամանը, որը մշակողը կարող է կրկնել։

---

## Արագ կապեր

- [backend-doc.md](./backend-doc.md)
- [TECH_CARD.md](./TECH_CARD.md)
- [apps/api/README.md](../apps/api/README.md)
