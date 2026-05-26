# Estate.data — նախագծի տեխզադրանք

> Լրացված՝ 2026-05-25 · հաստատված chat-ում

---

## Նկարագրություն

Estate.data-ն անշարժ գույքի մարքեթինգային ստուգիա է (ֆոտո, վIDEO, drone, 3D турեր)։
Նախագիծը ներառում է marketing frontend (`apps/web`) և առանձին REST API backend (`apps/api`, port 3001) CMS-ի, contact form-ի և ապագա վճարումների համար։

## Թիրախային լսարան

- Real estate agents և brokerages (ԱՄՆ / հայկական շուկա)
- Property developers և marketing teams
- Օգտատերեր, ովքեր փնտրում են portfolio, pricing, resources և contact

## Հիմնական ֆունկցիաներ (առաջնայնացված)

1. **Marketing site** — home, portfolio, pricing, resources, contact — առաջնայնություն. բարձր
2. **Contact form + email notification** — POST API + Resend — առաջնայնություն. բարձր
3. **Admin CMS** — portfolio, articles, FAQ, pricing, assets — JWT auth — առաջնայնություն. միջին
4. **i18n content** — articles/FAQ/portfolio/pricing (en + es) — առաջնայնություն. միջին
5. **Payments (AM providers)** — sandbox init + webhooks — առաջնայնություն. ցածր (post-MVP)

## Stack

- **Monorepo** — pnpm workspaces
- **Frontend** — Next.js 16 App Router (`apps/web`, port 3000)
- **Backend** — Next.js Route Handlers (`apps/api`, port 3001)
- **DB** — PostgreSQL 17 (Neon) + Prisma 7
- **Cache / rate limit** — Upstash Redis

## Դիզայն

- Figma design system (plugin MCP)
- Tailwind CSS 4, custom components

## Ինտեգրացիաներ

- [x] Email — Resend (contact notifications)
- [x] Auth — JWT HS256 admin (argon2 passwords)
- [x] Ֆайлերի պահոց — Cloudflare R2 (portfolio media)
- [x] Cache — Upstash Redis
- [ ] Վճարային համակարգ — Idram/Ameriabank sandbox (reference docs, minimal API stub)
- [ ] Error tracking — Sentry (optional env)

## Կոնտենտի լեզու

- UI հիմնական լեզու. **en**
- i18n. **այո** — en, es (CMS translations API)

## Սահմանափակումներ

- Ժամկետներ. առանց դедлайնի
- Dev. Neon free tier, mock API optional for zero-setup
- Prod. Vercel (web + api), Neon, R2, Upstash, Resend

## Լրացուցիչ

- Asset bytes (icons/logos) — PostgreSQL; large media — R2 CDN
- Admin UI — future phase; dev uses `pnpm admin:token` + API scripts
