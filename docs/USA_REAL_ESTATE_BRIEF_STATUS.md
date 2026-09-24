# USA real estate brief — completion

**Source:** [Copy of USA real estate](https://docs.google.com/document/d/1hCiDqlP4H_PVSEE9Ue8S2EGv0tM6dZ55hZUSUw0Ls8s/edit?usp=sharing)  
**Date:** 2026-09-15  
**Overall:** **9 / 10 complete** — item 4 is intentionally out of scope.

---

## Summary

| # | Task | Status |
|---|---|---|
| 1 | Main Navigation — Services dropdown + in-page scroll | Done |
| 2 | One Contact / Request Service form, property optional | Done |
| 3 | Rename Landing Pages → Web Pages | Done |
| 4 | View More popup to browse images | **Skipped** (kept the existing View Example popup) |
| 5 | Hero image slider + admin | Done |
| 6 | Admin CMS for site content | Done |
| 7 | Admin images / media (upload, replace, delete, multiple) | Done |
| 8 | User / website statistics | Done via item 9 |
| 9 | Google Analytics instead of a duplicate stats system | Done |
| 10 | Web Pages as the only extra route | Done (final design still pending from the client) |

---

## 1. Main Navigation — Services — Done

- Services is in the main nav (desktop dropdown, mobile accordion).
- Items: Photography, Video Production, Drone Services, Floor Plans / 2D–3D, AI Media, Scan-to-BIM.
- Click scrolls to the matching homepage section. No extra service pages.
- Floor Plans has its own `#floor-plans` block.

## 2. Contact Us / Request Service — Done

- One request form at the bottom (`#quote` / `#contact`).
- Required by default: Name, Email, Service, Message / Notes.
- Property address, type, square footage, date are optional.
- Rooms / floor / price are not on the form.
- No second submit form.

## 3. Landing Pages → Web Pages — Done

- Nav, 404, and `/web-pages` use **Web Pages**.
- Public title: “A Web Page Built to Sell One Property.”

## 4. CTA “View More” — Skipped

Left as the existing **View Example** popup (one example + copy + CTA), not an image-browsing gallery.

## 5. Hero Section — Done

- Hero is a slider.
- Admin: add / replace / delete / reorder / publish slides.
- Admin: hero title, description, CTA labels and hrefs.

## 6. Admin Panel CMS — Done

Admin can edit:

- Hero images, slider, titles, descriptions, CTA buttons
- Services: titles, descriptions, images, order, primary CTA
- What We Do: copy, CTA labels and hrefs
- Web Pages: copy, included list, pricing, CTA
- Contact: heading copy, phone, email, hours, area, social links
- Contact form field required / optional / hidden
- Portfolio, pricing, FAQ, inquiries

Main nav labels stay in code (`navConfig`). That is the site chrome, not a marketing block.

## 7. Admin — Images / Media — Done

- Upload, replace, delete on hero slides, services, and portfolio.
- Multiple hero slides.
- Service cover + extra gallery URLs with per-image Delete (admin only; public gallery is item 4).

No separate DAM (one bucket UI). Assets are managed on the content they belong to.

## 8 + 9. Statistics / Google Analytics — Done

Per item 9, traffic stats are not rebuilt in-app.

Admin **Insights → Analytics** shows:

- All service requests, last 7 days, last 30 days
- Most requested services (from the contact form)
- **Open Google Analytics** for users, sessions, page views, traffic, device, country, conversion
- GTM status (`NEXT_PUBLIC_GTM_ID`)
- Public site pushes `service_view` and `service_click` to `dataLayer`
- GA4 Google tag `G-B9B7P2G10R` loads on every page via `GoogleAnalytics` (override with `NEXT_PUBLIC_GA_MEASUREMENT_ID`)

Set optional `NEXT_PUBLIC_GTM_ID` and `NEXT_PUBLIC_GOOGLE_ANALYTICS_URL`. The GA4 measurement id is installed in `apps/web/src/shared/analytics/gaConfig.ts`.

## 10. Web Pages as a separate page — Done

- `/web-pages` is the only extra public route.
- Home has a compact teaser; the full included list and pricing are on `/web-pages`.
- Copy is CMS-editable. Final visual design can still replace this page when delivered.
