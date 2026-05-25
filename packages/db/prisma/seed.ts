import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaClient } from "@prisma/client";
import { ASSET_KEYS } from "../src/asset-keys";
import { assetUrl } from "../src/asset-url";
import type { PortfolioMediaCategory } from "../src/portfolio-category";

const prisma = new PrismaClient();

const SEED_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../../apps/web/public",
);

type SeedAsset = {
  key: string;
  mimeType: string;
  relativePath?: string;
  absolutePath?: string;
};

const SEED_ASSETS: readonly SeedAsset[] = [
  {
    key: ASSET_KEYS.siteLogo,
    relativePath: "images/logo-estatedata.png",
    mimeType: "image/png",
  },
  {
    key: ASSET_KEYS.siteLogoDark,
    relativePath: "images/logo-estatedata-dark.png",
    mimeType: "image/png",
  },
  {
    key: ASSET_KEYS.homeHero,
    relativePath: "images/hero-home.jpg",
    mimeType: "image/jpeg",
  },
  {
    key: ASSET_KEYS.navPhoneIcon,
    relativePath: "icons/phone.svg",
    mimeType: "image/svg+xml",
  },
  {
    key: ASSET_KEYS.whatWeDoPhotographyIcon,
    relativePath: "icons/what-we-do/photography.png",
    mimeType: "image/png",
  },
  {
    key: ASSET_KEYS.whatWeDoCinematicVideoIcon,
    relativePath: "icons/what-we-do/cinematic-video.png",
    mimeType: "image/png",
  },
  {
    key: ASSET_KEYS.whatWeDoDroneAerialIcon,
    relativePath: "icons/what-we-do/drone-aerial.png",
    mimeType: "image/png",
  },
  {
    key: ASSET_KEYS.whatWeDoToursFloorplansIcon,
    relativePath: "icons/what-we-do/tours-floorplans.png",
    mimeType: "image/png",
  },
  {
    key: ASSET_KEYS.whatWeDoMarketIntelligenceIcon,
    relativePath: "icons/what-we-do/market-intelligence.png",
    mimeType: "image/png",
  },
  {
    key: ASSET_KEYS.propertyIntelligenceHero,
    relativePath: "images/property-intelligence/scan-to-bim.jpg",
    mimeType: "image/jpeg",
  },
  {
    key: ASSET_KEYS.recentWorkPlaceholder,
    relativePath: "images/recent-work/placeholder.jpg",
    mimeType: "image/jpeg",
  },
  {
    key: ASSET_KEYS.clientVoicesQuoteMarks,
    relativePath: "images/client-voices/quote-marks.png",
    mimeType: "image/png",
  },
  {
    key: ASSET_KEYS.aboutTeamCollaboration,
    relativePath: "images/about/team-collaboration.png",
    mimeType: "image/png",
  },
  {
    key: ASSET_KEYS.contactLocationIcon,
    relativePath: "images/contact/location.png",
    mimeType: "image/png",
  },
  {
    key: ASSET_KEYS.contactPhoneIcon,
    relativePath: "images/contact/phone.png",
    mimeType: "image/png",
  },
  {
    key: ASSET_KEYS.contactEmailIcon,
    relativePath: "images/contact/mail.png",
    mimeType: "image/png",
  },
  {
    key: ASSET_KEYS.siteFavicon,
    relativePath: "images/site-favicon.png",
    mimeType: "image/png",
  },
  {
    key: ASSET_KEYS.siteAppleIcon,
    relativePath: "images/site-apple-icon.png",
    mimeType: "image/png",
  },
  {
    key: ASSET_KEYS.trustedCompass,
    relativePath: "images/trusted/compass.png",
    mimeType: "image/png",
  },
  {
    key: ASSET_KEYS.trustedSothebys,
    relativePath: "images/trusted/sothebys.png",
    mimeType: "image/png",
  },
  {
    key: ASSET_KEYS.trustedTheAgency,
    relativePath: "images/trusted/the-agency.png",
    mimeType: "image/png",
  },
  {
    key: ASSET_KEYS.trustedDouglasElliman,
    relativePath: "images/trusted/douglas-elliman.png",
    mimeType: "image/png",
  },
  {
    key: ASSET_KEYS.trustedColdwellBanker,
    relativePath: "images/trusted/coldwell-banker.png",
    mimeType: "image/png",
  },
  {
    key: ASSET_KEYS.trustedHiltonHyland,
    relativePath: "images/trusted/hilton-hyland.png",
    mimeType: "image/png",
  },
] as const;

function resolveSeedFilePath(entry: SeedAsset): string {
  if (entry.absolutePath) {
    return entry.absolutePath;
  }
  if (entry.relativePath) {
    return path.join(SEED_DIR, entry.relativePath);
  }
  throw new Error(`Seed asset "${entry.key}" has no file path`);
}

async function seedAsset(entry: SeedAsset): Promise<void> {
  const filePath = resolveSeedFilePath(entry);
  const data = await readFile(filePath);
  const fileName = path.basename(filePath);

  await prisma.asset.upsert({
    where: { key: entry.key },
    create: {
      key: entry.key,
      mimeType: entry.mimeType,
      fileName,
      data,
      byteSize: data.byteLength,
    },
    update: {
      mimeType: entry.mimeType,
      fileName,
      data,
      byteSize: data.byteLength,
    },
  });

  console.info(`Seeded asset: ${entry.key} (${data.byteLength} bytes)`);
}

const PORTFOLIO_PLACEHOLDER_IMAGE = assetUrl(ASSET_KEYS.recentWorkPlaceholder);
const PORTFOLIO_PLACEHOLDER_ALT =
  "Luxury Los Angeles property — portfolio placeholder";

type SeedPortfolioProject = {
  id: string;
  category: PortfolioMediaCategory;
  sortOrder: number;
  featuredOnHome?: boolean;
};

const SEED_PORTFOLIO_PROJECTS: readonly SeedPortfolioProject[] = [
  { id: "portfolio-1", category: "photo", sortOrder: 1, featuredOnHome: true },
  { id: "portfolio-2", category: "photo", sortOrder: 2, featuredOnHome: true },
  { id: "portfolio-3", category: "video", sortOrder: 3, featuredOnHome: true },
  { id: "portfolio-4", category: "video", sortOrder: 4, featuredOnHome: true },
  { id: "portfolio-5", category: "drone", sortOrder: 5 },
  { id: "portfolio-6", category: "3d-tour", sortOrder: 6 },
];

async function seedPortfolioProject(entry: SeedPortfolioProject): Promise<void> {
  await prisma.portfolioProject.upsert({
    where: { id: entry.id },
    create: {
      id: entry.id,
      imageUrl: PORTFOLIO_PLACEHOLDER_IMAGE,
      imageAlt: PORTFOLIO_PLACEHOLDER_ALT,
      category: entry.category,
      sortOrder: entry.sortOrder,
      featuredOnHome: entry.featuredOnHome ?? false,
      published: true,
    },
    update: {
      imageUrl: PORTFOLIO_PLACEHOLDER_IMAGE,
      imageAlt: PORTFOLIO_PLACEHOLDER_ALT,
      category: entry.category,
      sortOrder: entry.sortOrder,
      featuredOnHome: entry.featuredOnHome ?? false,
      published: true,
    },
  });

  console.info(`Seeded portfolio project: ${entry.id} (${entry.category})`);
}

type SeedArticle = {
  id: string;
  slug: string;
  title: string;
  readTimeLabel: string;
  body: string;
  sortOrder: number;
};

const SEED_ARTICLES: readonly SeedArticle[] = [
  {
    id: "westside-eastside-spring-2026",
    slug: "westside-vs-eastside-spring-2026-absorption",
    title: "Westside vs. Eastside: Spring 2026 absorption",
    readTimeLabel: "6 min read",
    body:
      "Spring 2026 absorption rates diverged sharply between the Westside and Eastside corridors.\n\nWestside luxury inventory moved faster where twilight and drone packages were bundled with pricing intelligence. Eastside listings benefited from stronger investor demand in Silver Lake and Eagle Rock.\n\nWe track weekly DOM shifts across LA micro-markets so brokers can adjust media spend before a listing stalls.",
    sortOrder: 1,
  },
  {
    id: "twilight-drone-outperforms",
    slug: "why-twilight-drone-outperforms",
    title: "Why twilight + drone outperforms by 41%",
    readTimeLabel: "4 min read",
    body:
      "Listings with coordinated twilight photography and aerial coverage saw 41% more qualified inquiries in our 2025 sample.\n\nTwilight exteriors signal lifestyle; drone context anchors neighborhood value. Together they reduce buyer uncertainty on first click.\n\nThe uplift held across condos and single-family homes above $1.5M.",
    sortOrder: 2,
  },
  {
    id: "scan-to-bim-playbook",
    slug: "scan-to-bim-developer-playbook",
    title: "Scan to BIM: a developer's 90-day playbook",
    readTimeLabel: "9 min read",
    body:
      "Developers use scan-to-BIM to de-risk entitlements and coordinate trades before drywall goes up.\n\nDay 0–30: site capture and model alignment. Day 31–60: clash review with architects and GCs. Day 61–90: investor-ready visualization and as-built documentation.\n\nThis playbook reflects projects we supported across DTLA and the Westside in 2025.",
    sortOrder: 3,
  },
  {
    id: "analytics-dashboards-listings",
    slug: "analytics-dashboards-close-listings",
    title: "How analytics dashboards close listings faster",
    readTimeLabel: "5 min read",
    body:
      "Pricing dashboards give listing agents a defensible story in seller conversations.\n\nWhen DOM rises in a submarket, we surface comp velocity, showing absorption and price-per-square-foot trends alongside your media performance.\n\nBrokers using shared dashboards reported shorter negotiation cycles in Q4 2025.",
    sortOrder: 4,
  },
];

type SeedFaqItem = {
  id: string;
  question: string;
  answer: string;
  sortOrder: number;
};

const SEED_FAQ_ITEMS: readonly SeedFaqItem[] = [
  {
    id: "turnaround",
    question: "What's your turnaround?",
    answer: "Standard 48 hours; rush 24 hours available.",
    sortOrder: 1,
  },
  {
    id: "la-coverage",
    question: "Do you cover all of LA?",
    answer: "Yes — from Malibu to DTLA, Pasadena to South Bay.",
    sortOrder: 2,
  },
  {
    id: "raw-files",
    question: "Can I license raw files?",
    answer: "Yes, raw + edited delivery available on Cinematic+.",
    sortOrder: 3,
  },
];

async function seedArticle(entry: SeedArticle): Promise<void> {
  await prisma.article.upsert({
    where: { id: entry.id },
    create: {
      id: entry.id,
      slug: entry.slug,
      title: entry.title,
      readTimeLabel: entry.readTimeLabel,
      body: entry.body,
      sortOrder: entry.sortOrder,
      published: true,
    },
    update: {
      slug: entry.slug,
      title: entry.title,
      readTimeLabel: entry.readTimeLabel,
      body: entry.body,
      sortOrder: entry.sortOrder,
      published: true,
    },
  });

  console.info(`Seeded article: ${entry.slug}`);
}

async function seedFaqItem(entry: SeedFaqItem): Promise<void> {
  await prisma.faqItem.upsert({
    where: { id: entry.id },
    create: {
      id: entry.id,
      question: entry.question,
      answer: entry.answer,
      sortOrder: entry.sortOrder,
      published: true,
    },
    update: {
      question: entry.question,
      answer: entry.answer,
      sortOrder: entry.sortOrder,
      published: true,
    },
  });

  console.info(`Seeded FAQ item: ${entry.id}`);
}

async function seedTranslations(): Promise<void> {
  await prisma.articleTranslation.upsert({
    where: {
      articleId_locale: {
        articleId: "westside-eastside-spring-2026",
        locale: "es",
      },
    },
    create: {
      articleId: "westside-eastside-spring-2026",
      locale: "es",
      title: "Westside vs. Eastside: absorción primavera 2026",
      readTimeLabel: "6 min de lectura",
      body:
        "Las tasas de absorción de primavera 2026 divergieron entre el Westside y el Eastside.\n\nEl inventario de lujo en el Westside se movió más rápido cuando los paquetes twilight y drone se combinaron con inteligencia de precios.",
    },
    update: {
      title: "Westside vs. Eastside: absorción primavera 2026",
      readTimeLabel: "6 min de lectura",
      body:
        "Las tasas de absorción de primavera 2026 divergieron entre el Westside y el Eastside.\n\nEl inventario de lujo en el Westside se movió más rápido cuando los paquetes twilight y drone se combinaron con inteligencia de precios.",
    },
  });

  await prisma.faqItemTranslation.upsert({
    where: {
      faqItemId_locale: {
        faqItemId: "turnaround",
        locale: "es",
      },
    },
    create: {
      faqItemId: "turnaround",
      locale: "es",
      question: "¿Cuál es su tiempo de entrega?",
      answer: "Estándar 48 horas; urgente 24 horas disponible.",
    },
    update: {
      question: "¿Cuál es su tiempo de entrega?",
      answer: "Estándar 48 horas; urgente 24 horas disponible.",
    },
  });

  console.info("Seeded CMS translations: es (article + FAQ)");

  await prisma.pricingCategoryTranslation.upsert({
    where: {
      categoryKey_locale: {
        categoryKey: "media",
        locale: "es",
      },
    },
    create: {
      categoryKey: "media",
      locale: "es",
      sectionTitle: "Paquetes de medios",
      priceSuffix: "por propiedad",
    },
    update: {
      sectionTitle: "Paquetes de medios",
      priceSuffix: "por propiedad",
    },
  });

  await prisma.portfolioProjectTranslation.upsert({
    where: {
      projectId_locale: {
        projectId: "portfolio-1",
        locale: "es",
      },
    },
    create: {
      projectId: "portfolio-1",
      locale: "es",
      imageAlt: "Propiedad de lujo en Los Ángeles — marcador de posición",
      category: "photo",
    },
    update: {
      imageAlt: "Propiedad de lujo en Los Ángeles — marcador de posición",
    },
  });
}

async function seedAdminUser(): Promise<void> {
  const { hash } = await import("@node-rs/argon2");
  const email = (process.env.ADMIN_EMAIL ?? "admin@estate.data").toLowerCase();
  const password = process.env.ADMIN_PASSWORD ?? "admin-change-me";
  const passwordHash = await hash(password);

  await prisma.user.upsert({
    where: { email },
    create: {
      email,
      passwordHash,
      role: "admin",
    },
    update: {
      passwordHash,
      role: "admin",
    },
  });

  console.info(`Seeded admin user: ${email}`);
}

async function main(): Promise<void> {
  for (const entry of SEED_ASSETS) {
    await seedAsset(entry);
  }

  for (const entry of SEED_PORTFOLIO_PROJECTS) {
    await seedPortfolioProject(entry);
  }

  for (const entry of SEED_ARTICLES) {
    await seedArticle(entry);
  }

  for (const entry of SEED_FAQ_ITEMS) {
    await seedFaqItem(entry);
  }

  await seedTranslations();
  await seedPricing();
  await seedAdminUser();
}

type SeedPricingCategory = {
  key: "media" | "analytics";
  sectionTitle: string;
  priceSuffix: string;
};

type SeedPricingPackage = {
  id: string;
  categoryKey: "media" | "analytics";
  name: string;
  price: string;
  priceSuffixOverride?: string | null;
  features: readonly string[];
  bookLabel: string;
  bookHref: string;
  cardAccent?: "blue" | "purple" | "orange";
  highlighted?: boolean;
  badgeLabel?: string | null;
  sortOrder: number;
};

const SEED_PRICING_CATEGORIES: readonly SeedPricingCategory[] = [
  {
    key: "media",
    sectionTitle: "Media packages",
    priceSuffix: "/listing",
  },
  {
    key: "analytics",
    sectionTitle: "Analytics subscriptions",
    priceSuffix: "/mo",
  },
];

const SEED_PRICING_PACKAGES: readonly SeedPricingPackage[] = [
  {
    id: "essential",
    categoryKey: "media",
    name: "Essential",
    price: "$549",
    features: [
      "25 HDR photos",
      "Basic floorplan",
      "48-hour delivery",
      "Listing website",
    ],
    bookLabel: "Book Essential",
    bookHref: "/contact",
    cardAccent: "blue",
    sortOrder: 1,
  },
  {
    id: "signature",
    categoryKey: "media",
    name: "Signature",
    price: "$1,249",
    features: [
      "40 HDR photos + twilight",
      "Drone aerials",
      "Cinematic 60s reel",
      "3D Matterport tour",
      "Listing website",
    ],
    bookLabel: "Book Signature",
    bookHref: "/contact",
    cardAccent: "purple",
    highlighted: true,
    badgeLabel: "Most popular",
    sortOrder: 2,
  },
  {
    id: "cinematic-plus",
    categoryKey: "media",
    name: "Cinematic+",
    price: "$2,499",
    features: [
      "Full photo set",
      "2-min cinematic film",
      "Drone + neighborhood B-roll",
      "3D tour + floorplan",
      "Comps & market brief",
    ],
    bookLabel: "Book Cinematic+",
    bookHref: "/contact",
    cardAccent: "orange",
    sortOrder: 3,
  },
  {
    id: "insights",
    categoryKey: "analytics",
    name: "Insights",
    price: "$199",
    features: ["Neighborhood reports", "Listing analytics", "Email digest"],
    bookLabel: "Talk to sales",
    bookHref: "/contact",
    cardAccent: "blue",
    sortOrder: 1,
  },
  {
    id: "pro-data",
    categoryKey: "analytics",
    name: "Pro Data",
    price: "$499",
    features: ["MLS/IDX integration", "Custom dashboard", "CRM sync"],
    bookLabel: "Talk to sales",
    bookHref: "/contact",
    cardAccent: "purple",
    sortOrder: 2,
  },
  {
    id: "enterprise",
    categoryKey: "analytics",
    name: "Enterprise",
    price: "Custom",
    priceSuffixOverride: "",
    features: ["BIM workflows", "API access", "Dedicated success mgr"],
    bookLabel: "Talk to sales",
    bookHref: "/contact",
    cardAccent: "orange",
    sortOrder: 3,
  },
];

async function seedPricingCategory(entry: SeedPricingCategory): Promise<void> {
  await prisma.pricingCategory.upsert({
    where: { key: entry.key },
    create: {
      key: entry.key,
      sectionTitle: entry.sectionTitle,
      priceSuffix: entry.priceSuffix,
    },
    update: {
      sectionTitle: entry.sectionTitle,
      priceSuffix: entry.priceSuffix,
    },
  });

  console.info(`Seeded pricing category: ${entry.key}`);
}

async function seedPricingPackage(entry: SeedPricingPackage): Promise<void> {
  await prisma.pricingPackage.upsert({
    where: { id: entry.id },
    create: {
      id: entry.id,
      categoryKey: entry.categoryKey,
      name: entry.name,
      price: entry.price,
      priceSuffixOverride: entry.priceSuffixOverride ?? null,
      features: [...entry.features],
      bookLabel: entry.bookLabel,
      bookHref: entry.bookHref,
      cardAccent: entry.cardAccent ?? null,
      highlighted: entry.highlighted ?? false,
      badgeLabel: entry.badgeLabel ?? null,
      sortOrder: entry.sortOrder,
      published: true,
    },
    update: {
      categoryKey: entry.categoryKey,
      name: entry.name,
      price: entry.price,
      priceSuffixOverride: entry.priceSuffixOverride ?? null,
      features: [...entry.features],
      bookLabel: entry.bookLabel,
      bookHref: entry.bookHref,
      cardAccent: entry.cardAccent ?? null,
      highlighted: entry.highlighted ?? false,
      badgeLabel: entry.badgeLabel ?? null,
      sortOrder: entry.sortOrder,
      published: true,
    },
  });

  console.info(`Seeded pricing package: ${entry.id}`);
}

async function seedPricing(): Promise<void> {
  for (const entry of SEED_PRICING_CATEGORIES) {
    await seedPricingCategory(entry);
  }

  for (const entry of SEED_PRICING_PACKAGES) {
    await seedPricingPackage(entry);
  }
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
