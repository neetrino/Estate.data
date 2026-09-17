# Estate Data Cloud — bugs & improvements

**Source:** [Estate_Data_Cloud_Bugs_Improvements](https://docs.google.com/spreadsheets/d/1mA34-lLwxhoFkHeIA1JmawnAgibNFBnx1dcGx9jkX-0/edit?gid=0#gid=0)  
**Date:** 2026-09-17  
**Overall:** **99%**

Eight sheet items are implemented in code. Image uploads go to Cloudflare R2 (`R2_*` env). There is no local-disk fallback.

Sheet columns: **Section** · **Area** · **Actual Result** · **Expected Result** · **image/link**. Some rows leave Expected empty; expected behavior is inferred from Actual + screenshot context.

---

## Summary

| # | Section | Status | Done |
|---|---|---|-----:|
| 1 | Admin — image upload (R2) | Uploads go to Cloudflare R2; format/size limits shown in admin | 100% |
| 2 | Portfolio — add project | Modal opens; image marked required; field error; Save not blocked silently | 100% |
| 3 | Portfolio — edit title on the public site | Title field overlays catalog cards on the public grid | 100% |
| 4 | Admin navigation — several tabs active | Longest-prefix match — one sidebar item | 100% |
| 5 | Pricing — add package | Validation + errors inside the modal and under fields | 100% |
| 6 | Home Hero slider | Public carousel with interval, crossfade, progress bar | 100% |
| 7 | Public header tabs | Hash sync on click + scroll; Services vs Scan-to-BIM exclusive | 100% |
| 8 | Watch the reel | Portal to `document.body`, z-300, body lock | 100% |

---

## 1. Admin panel — image upload — 100%

**Sheet**

- **Section:** admin panel  
- **Area:** every admin screen that attaches an image  
- **Actual:** upload fails with **R2 Storage is not configured** (server / R2 config).  
- **Expected:** upload must work. If format or size is limited, show allowed formats and max size.  
- **Evidence:** [Drive screenshot](https://drive.google.com/file/d/1KP0F57lbz66QSOPqedhiBGg36rB5tdJ1/view)

**What is true in code**

- Upload route: `apps/web/src/app/api/v1/admin/upload/route.ts` throws `R2 storage is not configured` when env is empty.  
- Limits exist only on the server: JPEG/PNG/WebP/GIF, max **10 MB** (`MAX_R2_UPLOAD_BYTES` in `upload-media.ts`).  
- `AdminImageUploader` has `accept` on the file input but **no visible hint** for format/size.

**What to do**

1. Configure Cloudflare R2 in `.env` / `.env.local` (`R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`, `R2_PUBLIC_URL`). Do not invent credentials.  
2. After R2 works, show a permanent hint on every uploader: e.g. `JPEG, PNG, WebP or GIF · max 10 MB`.  
3. Map API errors to that same copy (config missing vs file too large vs unsupported type).  
4. Reuse the same hint on hero slides, services, portfolio, and any other upload field.

**How to verify**

- [ ] With R2 unset: message is human-readable (not a raw stack), and the hint still lists format/size.  
- [ ] With R2 set: upload a JPEG under 10 MB on Hero slides, Studio services, and Portfolio — preview appears, save persists, public URL loads.  
- [ ] Reject a `.pdf` and a file over 10 MB; error names the rule.  
- [ ] Repeat on at least two different admin pages that attach images.

---

## 2. Portfolio — add project — 100%

**Sheet**

- **Section:** portfolio — add projects  
- **Area:** New project does not open / cannot be created  
- **Expected:** it must be possible to create a project. If image upload is required, mark that field **Mandatory**.  
- **Evidence:** [Drive screenshot](https://drive.google.com/file/d/1J9GnXU1sjFrqSQkJPGgNGvG75aMgJUyC/view)

**What is true in code**

- `/supersudo/panel/portfolio` has **Add project** and a **New project** modal.  
- Save is blocked without `imageUrl` (`IMAGE_REQUIRED_MESSAGE`). The image field is not labeled Mandatory.  
- If task 1 fails, the user never gets an image, so create never succeeds.

**What to do**

1. Keep the modal opening even when R2 is down (do not couple “open form” to upload).  
2. Mark the image control as required (label + asterisk + inline error under the uploader).  
3. After task 1, a user can upload → save → see the row in the table.  
4. Optional: allow save without image only if product agrees it is not mandatory; otherwise keep required and say so in the UI.

**How to verify**

- [ ] Click **Add project** — modal opens with empty fields.  
- [ ] Save with no image — error is under the image field, not a silent no-op.  
- [ ] Upload + fill alt/category + Save — row appears; **Published** tile can show on `/#portfolio` after task 3 is also fixed.  
- [ ] Cancel / overlay click closes without creating a row.

---

## 3. Portfolio — edit title not on the website — 100%

**Sheet**

- **Section:** portfolio — edit existing one  
- **Actual:** title was edited in admin but does not appear on the public site.  
- **Expected (inferred):** the public portfolio card title equals the admin title after save.  
- **Evidence:** [Drive screenshot](https://drive.google.com/file/d/1sxOVEc4p8BaVztpcvQx57Bj5etd4ACr0/view)

**What is true in code**

- Admin form stores **image alt**, not a dedicated `title` field.  
- Public grid (`mergeStudioPortfolioProjects`) always starts from `STUDIO_PORTFOLIO_CATALOG` titles. CMS overlay updates **image src/alt only**, not `title`.  
- Extra CMS-only projects are appended; catalog cards keep hardcoded titles.

**What to do**

1. Add a real **Title** field on the portfolio CMS model/API (or document that `imageAlt` is parsed as `Title in Location — services` via `parseRecentWorkAlt`).  
2. Public cards must render CMS title (and location/services if those are edited).  
3. Catalog overlay should prefer CMS title when the project matches by id.  
4. Admin table should show Title, not only alt text under the thumb.

**How to verify**

- [ ] Edit an existing published project title → Save.  
- [ ] Hard refresh `/` → `#portfolio` card heading matches admin.  
- [ ] Change image only — title stays. Change title only — image stays.  
- [ ] Draft / unpublished project does not appear on the public grid.

---

## 4. Admin navigation — several tabs highlighted — 100%

**Sheet**

- **Section:** navigation panel  
- **Actual:** several tabs are marked active at once.  
- **Expected (inferred):** exactly one sidebar item matches the current page.  
- **Evidence:** [Drive screenshot](https://drive.google.com/file/d/1Yg1QZNeJB07r-gF8JVHygVK347iwhLwY/view)

**What is true in code**

- `isNavItemActive` in `AdminSidebar.tsx`: Dashboard is exact `/supersudo/panel`. Other items use `pathname.startsWith(href + "/")`.  
- **Site content** href is `/supersudo/panel/site-content`, so it stays active on Home Hero, Hero slides, Studio services, Contact fields, Marketing copy.  
- **Home Hero** is also under that path, so two items light up together.

**What to do**

1. Treat **Site content** as active only on the hub (`/supersudo/panel/site-content`) **or** introduce a nested group without highlighting the parent as a page.  
2. Child routes (home-hero, hero-slides, studio-services, …) must activate only their own item.  
3. Prefer longest-prefix / exact match so `/panel` never matches `/panel/portfolio`.

**How to verify**

- [ ] Open Dashboard, Portfolio, Pricing, FAQ, Inquiries, Analytics — only that item is active.  
- [ ] Open Site content hub — only Site content.  
- [ ] Open Home Hero, Hero slides, Studio services — only that child (Site content not also “current page”, unless designed as a group label).  
- [ ] Screenshot: never two `aria-current` / active styles on sibling page links.

---

## 5. Pricing — cannot add package — 100%

**Sheet**

- **Section:** pricing  
- **Actual:** cannot add a Package. The reason is unclear; the error is not under the field / modal.  
- **Expected:** if there is a count limit or a mandatory field, say so. Error must appear under the field or at the bottom of the open modal.  
- **Evidence:** [Drive screenshot](https://drive.google.com/file/d/1m7qKZdmKyTrhV59j9Po4hAU25LPM9UU5/view)

**What is true in code**

- **Add package** opens **New package**. Create requires `id` (slug), `name`, `price`.  
- `actionError` renders on the **page**, behind/outside the modal (`AdminPricingPage`).  
- `handleSave` does not clear the previous error or attach it to `id` / `name`. Duplicate slug or validation from the API is easy to miss.

**What to do**

1. Render save/validation errors **inside** `AdminModal` (footer or top of the form).  
2. Mark required fields (Package id, Name, Price) and show per-field messages.  
3. If the API rejects duplicate `id`, say “This package id already exists”.  
4. If there is a max package count, state it on the button or in the modal — do not fail silently.

**How to verify**

- [ ] Add package with empty id/name/price — inline errors, modal stays open.  
- [ ] Add a valid unique slug — row appears; public `#packages` shows it when published.  
- [ ] Reuse an existing id — modal shows a clear duplicate error.  
- [ ] Error is visible without closing the modal.

---

## 6. Home Hero — slider — 100%

**Sheet**

- **Section:** home hero — hero slider  
- **Actual:** cannot tell the slider works: the same image was added, cannot replace it to test. There should be a few seconds between slides. Even with the same file, a transition would prove it is a slider.  
- **Expected (inferred):** multiple distinct slides rotate on an interval; admin can replace images; transition is visible.  
- **Evidence:** [Drive screenshot](https://drive.google.com/file/d/1tRVwEmKuOGV518xxczXoVQ33iB9tbvka/view)

**What is true in code**

- Admin Hero slides: upload, replace, delete, reorder, publish.  
- Public `StudioHeroSection` uses **`slides[0]` only** — no index, no timer, no crossfade. Ken Burns on a single image is not a slider.

**What to do**

1. On `/`, cycle **published** slides in `sortOrder` (named interval constant, e.g. 5–7 seconds). Pause on hover/focus if useful.  
2. Crossfade (or equivalent) so a repeat image still reads as a change.  
3. After task 1, replacing a slide in admin must show a different file on the next load.  
4. One published slide → static hero (no broken empty rotation).

**How to verify**

- [ ] Two published slides with **different** images: auto-advance within the interval; both appear.  
- [ ] Replace slide 2 in admin → public hero shows the new file after refresh.  
- [ ] Unpublish all but one → no empty flash, no console errors.  
- [ ] Reduced-motion: no aggressive Ken Burns if the design tokens already respect it.

---

## 7. Public header tabs — 100%

**Sheet**

- **Section:** web / header  
- **Actual:** clicking a header tab sometimes highlights it, sometimes not. Sometimes two tabs are highlighted.  
- **Expected (inferred):** the tab for the current section/page is always the only active tab.  
- **Evidence:** [Drive screenshot](https://drive.google.com/file/d/1we-pb3Gsk-qPhtFoYq8_GRwFGyHqt_jY/view)

**What is true in code**

- Active state is `isNavbarActivePath(pathname, href, hash)` plus `useLocationHash()`.  
- Home items are `/#section`. If hash is missing after scroll-only navigation, **no** section tab is active.  
- **Services** href is `/#photography`. On that hash, Services is active; another in-page link with a related hash must not also be active.  
- Scroll without updating hash = flaky highlight.

**What to do**

1. Keep hash in sync on every in-page nav click (`/#photography`, `/#tours`, …).  
2. Optional scroll-spy: set hash (or active id) from the section in view so highlight survives scroll without click.  
3. Exactly one top-level item active: Services vs 3D Tours vs Scan-to-BIM vs Web Pages vs Packages vs …  
4. `/web-pages` activates only Web Pages.

**How to verify**

- [ ] Click each desktop item — that item only is `aria-current="page"`.  
- [ ] Repeat in the mobile drawer.  
- [ ] Scroll from Photography to Drone without clicking — active tab follows (if scroll-spy is in scope) or at least click path is 100% reliable.  
- [ ] Open `/web-pages` — Web Pages only; home hashes are not active.  
- [ ] Refresh on `/#packages` — Packages is active on first paint.

---

## 8. Watch the reel — hero title over the video — 100%

**Sheet**

- **Section:** watch the reel  
- **Actual:** when the video is enlarged, the Hero title appears on top of the video and blocks viewing.  
- **Expected (inferred):** the reel overlay is above all page chrome (hero title, navbar); video is unobstructed.  
- **Evidence:** [Drive screenshot](https://drive.google.com/file/d/1XLTeu7npSiJOf0VtMXAhRHm5svf5sUfP/view)

**What is true in code**

- `StudioReelDialog` is `fixed inset-0 z-[200]` **inside** `StudioWhatWeDo` (section has `overflow-hidden`).  
- Hero title sits in a `relative z-10` stack on a full-viewport hero. A transformed/overflow parent can trap the dialog below the hero stacking context.  
- Dialog is not portaled to `document.body` (unlike `StudioExampleModal`).

**What to do**

1. Render the reel overlay with `createPortal(..., document.body)` (same pattern as the example modal).  
2. Overlay z-index above navbar (navbar uses ~101) and hero; keep a full-screen scrim.  
3. Lock body scroll while open; Escape / Close dismisses.  
4. Native video fullscreen should still not show page titles (portal + high z-index).

**How to verify**

- [ ] From `#what-we-do`, open **Watch the reel** — video is fully visible; hero H1 is not on top.  
- [ ] Navbar and page copy are dimmed/covered by the scrim.  
- [ ] Close restores scroll; no leftover `overflow: hidden` on `body`.  
- [ ] Desktop and a mobile viewport.

---

## Implementation (2026-09-17)

Shipped in this pass, in sheet order:

1. Visible format/size hint on every `AdminImageUploader`; client + server validation; 503 if `R2_*` is missing. Uploads are stored in Cloudflare R2 only.  
2. New project modal always opens; image labeled required; errors under the uploader; Save stays enabled so the required rule is visible.  
3. Admin **Title** field; `mergeStudioPortfolioProjects` overlays CMS title onto catalog cards.  
4. Admin sidebar uses longest matching href (`isAdminNavItemActive`).  
5. Pricing validation + `AdminErrorState` inside the modal + per-field errors (including duplicate id).  
6. `StudioHeroSlideshow` — 6s interval, crossfade, progress bar (visible even if two slides share a file).  
7. `replaceState` notifies the navbar; scroll-spy updates hash; Services trigger does not share active state with Scan-to-BIM.  
8. Reel dialog portaled to `document.body` at `z-[300]`, Escape / scrim / Close, body scroll lock.

---

## Out of scope here

- Product brief item 4 (View More gallery) — tracked in `docs/USA_REAL_ESTATE_BRIEF_STATUS.md`.  
- Inventing R2 / GA credentials.

When an item ships, update the **Done** column and the overall % in this file.
