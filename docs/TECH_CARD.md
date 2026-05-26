# Estate.data — տեխնոլոգիական քարտ

**Նախագիծ.** Estate.data  
**Չափ.** B — medium, layout: feature-based monorepo  
**Ամսաթիվ.** 2026-05-25  
**Ստատուս.** հաստատված

---

## 1. Հիմք

| # | Պարամետր | Որոշում | Ստատուս |
|---|----------|---------|---------|
| 1.1 | Նախագծի չափ | B | ✅ |
| 1.2 | Ճարտարապետություն | Monorepo (pnpm workspaces) | ✅ |
| 1.3 | Package manager | pnpm | ✅ |
| 1.4 | Node.js | ≥20 (24.x LTS target) | ✅ |
| 1.5 | TypeScript | 5.x, strict: true | ✅ |
| 1.6 | Git | feature branches | ✅ |
| 1.7 | Commits | Conventional Commits | ✅ |

---

## 2. Frontend

| # | Պարամետր | Որոշում | Ստատուս |
|---|----------|---------|---------|
| 2.1 | Framework | Next.js 16 App Router | ✅ |
| 2.2 | Styles | Tailwind CSS 4 | ✅ |
| 2.3 | Forms | React Hook Form + Zod | ✅ |
| 2.4 | Data fetching | Server Components + client fetch | ✅ |
| 2.5 | i18n | CMS API `?locale=` (web routing TBD) | 🟡 |

---

## 3. Backend

| # | Պարամետր | Որոշում | Ստատուս |
|---|----------|---------|---------|
| 3.1 | Տիպ | Next.js API Routes (`apps/api`) | ✅ |
| 3.2 | Validation | Zod | ✅ |
| 3.3 | API format | REST JSON envelope | ✅ |
| 3.4 | Rate limiting | Upstash + in-memory fallback | ✅ |
| 3.5 | File upload | Multipart → DB bytes / R2 | ✅ |

---

## 4. Database

| # | Պարամետր | Որոշում | Ստատուս |
|---|----------|---------|---------|
| 4.1 | DB | PostgreSQL (Neon) | ✅ |
| 4.2 | ORM | Prisma | ✅ |
| 4.3 | Roles | owner (dev); app_user split prod | 🟡 |
| 4.4 | Connection limit | 10 (env `DATABASE_CONNECTION_LIMIT`) | ✅ |
| 4.5 | Seed | `pnpm db:seed` | ✅ |
| 4.6 | Cache | Upstash Redis | ✅ |

---

## 5. Authentication

| # | Պարամետր | Որոշում | Ստատուս |
|---|----------|---------|---------|
| 5.1 | Admin auth | JWT HS256 + argon2 passwords | ✅ |
| 5.2 | Roles | `admin` | ✅ |
| 5.3 | Login | POST `/api/v1/admin/auth/login` | ✅ |
| 5.4 | Refresh | POST `/api/v1/admin/auth/refresh` | ✅ |

---

## 6. Storage

| # | Պարամետր | Որոշում | Ստատուս |
|---|----------|---------|---------|
| 6.1 | Small assets | PostgreSQL bytes | ✅ |
| 6.2 | Large media | Cloudflare R2 (S3-compatible) | ✅ |
| 6.3 | CDN | R2 public URL | ✅ |

---

## 7. External services

| # | Պարամետր | Որոշում | Ստատուս |
|---|----------|---------|---------|
| 7.1 | Email | Resend | ✅ |
| 7.2 | Payments | Idram sandbox stub (+ docs for AM providers) | 🟡 |
| 7.3 | Error tracking | Sentry (optional `SENTRY_DSN`) | 🟡 |

---

## 8. DevOps

| # | Պարամետր | Որոշում | Ստատուս |
|---|----------|---------|---------|
| 8.1 | Web hosting | Vercel | ✅ |
| 8.2 | API hosting | Vercel / Render | ✅ |
| 8.3 | CI/CD | GitHub Actions | ✅ |
| 8.4 | Logging | Structured JSON (Pino-style logger) | ✅ |
| 8.5 | Environments | dev + prod | ✅ |

---

## 9. Testing

| # | Պարամետր | Որոշում | Ստատուս |
|---|----------|---------|---------|
| 9.1 | Integration checks | Root `pnpm *:check` scripts | ✅ |
| 9.2 | Unit tests | Vitest (future) | ➖ |

---

## 10. Security

| # | Պարամետր | Ստատուս |
|---|----------|---------|
| 10.1 | CORS allowlist (`APP_URL`) | ✅ |
| 10.2 | Input validation (Zod) | ✅ |
| 10.3 | argon2 passwords | ✅ |
| 10.4 | Rate limiting | ✅ |
| 10.5 | Secrets in env only | ✅ |

---

## Adaptive values (team-aligned defaults)

| Parameter | Value | Notes |
|-----------|-------|-------|
| Contact rate limit | 10 req / 60s / IP | `RATE_LIMIT_CONTACT_*` |
| Admin rate limit | 30 req / 60s / IP | `RATE_LIMIT_ADMIN_*` |
| JWT access TTL | 7d (dev); 15m prod recommended | `JWT_EXPIRES_IN` |
| Redis cache TTL | 60s public GET lists | `CACHE_TTL_SEC` |
| DB pool timeout | 20s | `DATABASE_POOL_TIMEOUT` |
