# Public components → Admin CMS

Որտեղից է կայքի յուրաքանչյուր բլոկը խմբագրվում։ Admin մուտք՝ `/supersudo`։ Panel՝ `/supersudo/panel`։

Այս ֆայլը **կայքի բաժինների** քարտեզ է (homepage, `/web-pages`, navbar, footer)։ Ներքին UI օգնականները (`StudioReveal`, `StudioSectionLabel`, `StudioCta` և նմանները) առանձին CMS չունեն — տեքստը գալիս է իրենց parent բլոկից։

---

## Admin մենյու (աջ սյունակ)

| Sidebar | URL |
|---|---|
| Home | `/supersudo/panel` |
| Portfolio | `/supersudo/panel/portfolio` |
| Services | `/supersudo/panel/site-content/studio-services` |
| Prices | `/supersudo/panel/pricing` |
| Questions | `/supersudo/panel/faq` |
| Homepage top | `/supersudo/panel/site-content/home-hero` |
| Other homepage text | `/supersudo/panel/site-content` (hub) |
| Form messages | `/supersudo/panel/contact-inquiries` |
| Reports | `/supersudo/panel/analytics` |

Hub-ից (`Other homepage text`) բացվում են նաև.

| Card | URL |
|---|---|
| Homepage top | `/supersudo/panel/site-content/home-hero` |
| Services | `/supersudo/panel/site-content/studio-services` |
| What We Do, Web Pages, Contact | `/supersudo/panel/site-content/marketing-copy` |
| Other homepage blocks | `/supersudo/panel/site-content/homepage-sections` |

Contact form-ի դաշտերը (label / placeholder / required)՝ `/supersudo/panel/site-content/contact-fields`։ Sidebar-ում չկա, URL-ով է բացվում։

---

## Homepage (վերևից ներքև)

Կայքի գլխավոր էջը հավաքվում է `HomeLandingPage`-ում։

| Կայքի բլոկ (component) | Ինչ է երևում | Admin |
|---|---|---|
| `Navbar` + `LogoLink` | Լոգո, անուն, կարճ տող լոգոյի տակ | **Other homepage blocks → Site name** (`brand`) |
| `StudioHeroSection` | Վերևի մեծ նկարներ, վերնագիր, 2 կոճակ, small label | **Homepage top → Words & buttons** (տեքստ, small label, կոճակներ, copy mode) և **Pictures** (slides) |
| `StudioWhatWeDo` | «What we do» վերնագիր, տեքստ, 2 կոճակ, reel վիդեո | **What We Do, Web Pages, Contact → What We Do** |
| `StudioStats` (What We Do-ի տակ) | Մեծ թվեր (`40% Faster…`) | **Other homepage blocks → Numbers** |
| `StudioOfferings` | Համարակալված «what we offer» քարտեր | **Other homepage blocks → What we offer** |
| `StudioServicesSection` | Photography / Editing / Video բլոկի վերնագիրը | **Other homepage blocks → Services heading** |
| `StudioServiceBlock` × 3 | Photography, Editing, Video — տեքստ, նկար, included, գներ, View Example | **Services →** համապատասխան ծառայություն (տես ստորև) |
| `StudioAiMediaSection` | AI Media բլոկ | **Services → AI Media** |
| `StudioDroneSection` | Drone բլոկ | **Services → Drone** |
| `StudioMatterportSection` | 3D Tours + Matterport embed | **Services → Tours** (`Words`, `Picture`, **`3D tour`**, `Prices`, `Example`, `Button`) |
| `StudioFloorPlansSection` | Floor plans վերնագիր, included, նկար | **Other homepage blocks → Floor plans** (տեքստ + included + Example)։ Նկարը գալիս է **Services → Tours → Picture** |
| `StudioScanToBimSection` | Scan-to-BIM տեքստ, նկար, գներ, chain, lists | **Services → Scan-to-BIM** (տեքստ, նկար, գներ, Example) + **Other homepage blocks → Scan-to-BIM extras** (chain, workflow, deliverables, pricing chips) |
| `StudioWebPagesTeaser` | Property website offer homepage-ում | **What We Do, Web Pages, Contact → Web Pages** |
| `StudioPackages` | Փաթեթների քարտեր | **Other homepage blocks → Packages intro** (վերնագիր) + **Prices** (քարտերի անուն, գին, included) |
| `StudioPackageCompare` | «What's in each package» աղյուսակ | **Other homepage blocks → Package compare** |
| `StudioPortfolio` | Recent work ցանց + ֆիլտրեր | **Other homepage blocks → Portfolio intro** (վերնագիր) + **Portfolio** (նախագծեր, կարգ, hide/show) |
| `StudioBeforeAfter` | Before / after սլայդերներ | **Other homepage blocks → Before & after** |
| `StudioProcess` | How we work քայլեր | **Other homepage blocks → How we work** |
| `StudioWhyUs` | Why us տեքստ, tags, points | **Other homepage blocks → Why us** |
| `StudioTeam` | Studio story, նկար, թիմ | **Other homepage blocks → Studio & team** |
| `StudioServiceArea` | Քաղաքներ, CTA | **Other homepage blocks → Service area** |
| `StudioFaq` | FAQ ցանկ | **Other homepage blocks → FAQ intro** (վերնագիր) + **Questions** (հարց/պատասխան) |
| `StudioContactSection` + `StudioContactDetails` | Contact վերնագիր, հեռախոս, email, social | **What We Do, Web Pages, Contact → Contact** |
| `ContactRequestForm` | Contact form-ի դաշտերը | `/supersudo/panel/site-content/contact-fields` |
| `StudioExampleModal` / `StudioViewExampleButton` | View Example popup | Յուրաքանչյուր ծառայության **Example** tab։ Floor plans-ի popup-ը՝ **Floor plans → Example** |
| `StudioSectionViewTracker` | Analytics section views | CMS չունի (միայն tracking) |
| `SiteFooter` | Footer սյունակներ, copyright | CMS չունի (hardcoded) |

---

## Services editor (մեկ ծառայություն)

URL՝ `/supersudo/panel/site-content/studio-services/{sectionKey}`

`sectionKey` արժեքներ՝ `photography` · `editing` · `video` · `ai-media` · `drone` · `tours` · `scan-to-bim`

| Tab | Ինչ է կառավարում |
|---|---|
| Words | Small label, title, description |
| Picture | Հիմնական նկար (չկա AI Media-ի վրա) |
| 3D tour | Matterport URL + demo label (**միայն Tours**) |
| Prices | Included list, price rows, starting price, footnote |
| Example | View Example popup |
| Button | CTA տեքստ, ուր է տանում, Position |

**Position** չի տեղաշարժում AI / Drone / Tours / Scan-to-BIM բլոկները homepage layout-ում. դրանց հերթը hardcoded է `HomeLandingPage`-ում։ Photography / Editing / Video-ն երևում են Services heading-ի տակ՝ `sortOrder`-ով։

Hide on website / Show on website — `published`։ Hidden ծառայությունը կայքում չի երևում։

---

## Այլ public էջեր

| Էջ / component | Admin |
|---|---|
| `/web-pages` · `WebPagesPage` | **What We Do, Web Pages, Contact → Web Pages** (նույն copy-ն, ինչ homepage teaser-ը)։ Included heading-ը՝ **Prices** tab |
| 404 · `NotFoundPage` | CMS չունի (`notFoundPageCopy.ts`) |

---

## Chrome (բոլոր public էջեր)

| Component | Admin | Նշում |
|---|---|---|
| Navbar brand name + kicker | **Other homepage blocks → Site name** | Լոգոյի ֆայլը և nav link-երի ցանկը hardcoded են (`navConfig.ts`) |
| Navbar CTA «Book a Shoot» | CMS չունի | `NAV_CTA_LINKS` |
| Footer | CMS չունի | `footerConfig.ts` — tagline, link labels, copyright |
| Hero «Scroll» cue | CMS չունի | `STUDIO_PAGE_COPY.hero.scrollLabel` |

---

## Admin-only էջեր (կայքի բլոկ չեն)

| Admin էջ | Նշանակություն |
|---|---|
| Home (dashboard) | Shortcuts, վերջին հայտեր |
| Form messages | Contact form-ի ուղարկված հայտեր |
| Reports | Google Analytics shortcut |

---

## CMS չունի (կոդում է մնում)

- Navbar link labels և href-եր
- Footer ամբողջությամբ
- 404 էջ
- Hero «Scroll» label
- Homepage բլոկների **հերթը** (ինչը որից հետո է գալիս)
- `/web-pages` էջի աջ նկարը (`STUDIO_MEDIA.landingPage`)
- Floor plans բլոկի նկարի alt (`STUDIO_MATTERPORT_DEMO.imageAlt`)

Եթե Save չես արել, կայքը ցույց է տալիս նույն հին տեքստերը որպես fallback։
