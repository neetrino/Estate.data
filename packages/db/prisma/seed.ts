import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaClient } from "@prisma/client";
import { ASSET_KEYS } from "../src/asset-keys";
import type { PortfolioMediaCategory } from "../src/portfolio-category";
import { seedStudioCms } from "./seed-studio";

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
    relativePath: "assets/hero-villa-BcD5T4f7.webp",
    mimeType: "image/jpeg",
  },
  {
    key: ASSET_KEYS.navPhoneIcon,
    relativePath: "icons/phone.svg",
    mimeType: "image/svg+xml",
  },
  {
    key: ASSET_KEYS.whatWeDoPhotographyIcon,
    relativePath: "icons/what-we-do/photography.svg",
    mimeType: "image/svg+xml",
  },
  {
    key: ASSET_KEYS.whatWeDoCinematicVideoIcon,
    relativePath: "icons/what-we-do/cinematic-video.svg",
    mimeType: "image/svg+xml",
  },
  {
    key: ASSET_KEYS.whatWeDoDroneAerialIcon,
    relativePath: "icons/what-we-do/drone-aerial.svg",
    mimeType: "image/svg+xml",
  },
  {
    key: ASSET_KEYS.whatWeDoToursFloorplansIcon,
    relativePath: "icons/what-we-do/tours-floorplans.svg",
    mimeType: "image/svg+xml",
  },
  {
    key: ASSET_KEYS.whatWeDoMarketIntelligenceIcon,
    relativePath: "icons/what-we-do/market-intelligence.svg",
    mimeType: "image/svg+xml",
  },
  {
    key: ASSET_KEYS.propertyIntelligenceHero,
    relativePath: "assets/scan-bim-gjdfWRdw.webp",
    mimeType: "image/jpeg",
  },
  {
    key: ASSET_KEYS.recentWorkPlaceholder,
    relativePath: "assets/portfolio-1-DsFekI_2.webp",
    mimeType: "image/jpeg",
  },
  {
    key: ASSET_KEYS.clientVoicesQuoteMarks,
    relativePath: "images/client-voices/quote-marks.png",
    mimeType: "image/png",
  },
  {
    key: ASSET_KEYS.aboutTeamCollaboration,
    relativePath: "assets/team-zk6Ayjl0.webp",
    mimeType: "image/jpeg",
  },
  {
    key: ASSET_KEYS.contactLocationIcon,
    relativePath: "icons/contact/location.png",
    mimeType: "image/png",
  },
  {
    key: ASSET_KEYS.contactPhoneIcon,
    relativePath: "icons/contact/phone.png",
    mimeType: "image/png",
  },
  {
    key: ASSET_KEYS.contactEmailIcon,
    relativePath: "icons/contact/mail.png",
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

type SeedPortfolioProject = {
  id: string;
  category: PortfolioMediaCategory;
  sortOrder: number;
  featuredOnHome?: boolean;
  imageUrl: string;
  imageAlt: string;
};

const SEED_PORTFOLIO_PROJECTS: readonly SeedPortfolioProject[] = [
  {
    id: "portfolio-1",
    category: "photo",
    sortOrder: 1,
    featuredOnHome: true,
    imageUrl: "/assets/portfolio-1-DsFekI_2.webp",
    imageAlt: "Modern Beverly Hills Residence in Beverly Hills, CA — Photography, Cinematic Video, Drone, Matterport",
  },
  {
    id: "portfolio-2",
    category: "photo",
    sortOrder: 2,
    featuredOnHome: true,
    imageUrl: "/assets/portfolio-2-uY8hxEf-.webp",
    imageAlt: "Wilshire Corporate Lobby in Downtown Los Angeles, CA — Architectural Photography, 3D Laser Scanning, Scan-to-BIM",
  },
  {
    id: "portfolio-3",
    category: "video",
    sortOrder: 3,
    featuredOnHome: true,
    imageUrl: "/assets/portfolio-3-fLsZycgA.webp",
    imageAlt: "Venice Architectural Loft in Venice, CA — Photography, Cinematic Video, Virtual Staging",
  },
  {
    id: "portfolio-4",
    category: "drone",
    sortOrder: 4,
    featuredOnHome: true,
    imageUrl: "/assets/drone-DM_DRS7C.webp",
    imageAlt: "Point Dume Cliffside Estate in Malibu, CA — Drone Photo + Video, Photography, Matterport",
  },
  {
    id: "portfolio-5",
    category: "video",
    sortOrder: 5,
    featuredOnHome: true,
    imageUrl: "/assets/hero-villa-BcD5T4f7.webp",
    imageAlt: "Sunset Plaza Glass House in West Hollywood, CA — Cinematic Film, Twilight Photography, Drone",
  },
  {
    id: "portfolio-6",
    category: "3d-tour",
    sortOrder: 6,
    featuredOnHome: true,
    imageUrl: "/assets/scan-bim-gjdfWRdw.webp",
    imageAlt: "Vernon Industrial As-Built in Vernon, CA — 3D Laser Scanning, Point Cloud, Revit LOD 300",
  },
];

async function seedPortfolioProject(entry: SeedPortfolioProject): Promise<void> {
  await prisma.portfolioProject.upsert({
    where: { id: entry.id },
    create: {
      id: entry.id,
      imageUrl: entry.imageUrl,
      imageAlt: entry.imageAlt,
      category: entry.category,
      sortOrder: entry.sortOrder,
      featuredOnHome: entry.featuredOnHome ?? false,
      published: true,
    },
    update: {
      imageUrl: entry.imageUrl,
      imageAlt: entry.imageAlt,
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
    id: "photo-turnaround",
    question: "How quickly can I receive my photos?",
    answer: "Average photo delivery is 24 hours. Rush options are available for many shoots.",
    sortOrder: 1,
  },
  {
    id: "same-day",
    question: "Do you provide same-day delivery?",
    answer: "Same-day is available on request when scheduling and post-production capacity allow.",
    sortOrder: 2,
  },
  {
    id: "drone-photo",
    question: "Do you provide drone photography?",
    answer:
      "Yes. Licensed aerial photography and video from $199, subject to FAA rules, airspace and weather.",
    sortOrder: 3,
  },
  {
    id: "faa",
    question: "Are your drone operators FAA compliant?",
    answer: "Yes. Drone operations are conducted under FAA Part 107.",
    sortOrder: 4,
  },
  {
    id: "matterport-how",
    question: "How does Matterport work?",
    answer:
      "We capture the property with professional 3D scanning and deliver an interactive digital twin — dollhouse, measurements and a shareable MLS-ready link.",
    sortOrder: 5,
  },
  {
    id: "embed-tour",
    question: "Can I embed my Matterport tour on my website?",
    answer: "Yes. Tours are website-embeddable and mobile/desktop optimized.",
    sortOrder: 6,
  },
  {
    id: "floor-plans",
    question: "Can you create floor plans?",
    answer: "Yes. Floor plans are included with Matterport 3D tours and available as add-ons.",
    sortOrder: 7,
  },
  {
    id: "virtual-staging",
    question: "Do you offer virtual staging?",
    answer: "Yes. Virtual staging starts from $35 per image.",
    sortOrder: 8,
  },
  {
    id: "ai-media",
    question: "Do you offer AI-generated property media?",
    answer:
      "Yes. AI social video, reels and creative packages — clearly identified for marketing and visualization.",
    sortOrder: 9,
  },
  {
    id: "commercial",
    question: "Do you provide commercial real estate photography?",
    answer: "Yes. We shoot commercial, office, retail, industrial, hospitality and multifamily.",
    sortOrder: 10,
  },
  {
    id: "aec",
    question: "Do you work with architects and developers?",
    answer: "Yes. Scan-to-BIM, point clouds and Revit delivery are built for AEC teams.",
    sortOrder: 11,
  },
  {
    id: "scan-to-bim",
    question: "What is Scan-to-BIM?",
    answer:
      "We laser-scan the real space, register a point cloud, then model it in Revit for as-built documentation.",
    sortOrder: 12,
  },
  {
    id: "revit",
    question: "Can you deliver Revit files?",
    answer: "Yes. Deliverables include RVT models, plus E57 / RCP / RCS point clouds as specified.",
    sortOrder: 13,
  },
  {
    id: "quote-info",
    question: "What information do you need for a quote?",
    answer:
      "Property address or area, type, approximate square footage, desired date and the services you need.",
    sortOrder: 14,
  },
  {
    id: "book-shoot",
    question: "How do I book a shoot?",
    answer: "Use the contact form on this page. We return a scoped quote the same business day.",
    sortOrder: 15,
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
        faqItemId: "photo-turnaround",
        locale: "es",
      },
    },
    create: {
      faqItemId: "photo-turnaround",
      locale: "es",
      question: "¿Qué tan rápido recibo las fotos?",
      answer: "La entrega promedio es 24 horas. Opciones urgentes disponibles.",
    },
    update: {
      question: "¿Qué tan rápido recibo las fotos?",
      answer: "La entrega promedio es 24 horas. Opciones urgentes disponibles.",
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

const ARGON2_OPTIONS = {
  memoryCost: 19456,
  timeCost: 2,
  parallelism: 1,
} as const;

async function seedAdminUser(): Promise<void> {
  const { hash } = await import("@node-rs/argon2");
  const email = (process.env.ADMIN_EMAIL ?? "admin@estate.data").toLowerCase();
  const password = process.env.ADMIN_PASSWORD ?? "admin-change-me";
  const passwordHash = await hash(password, ARGON2_OPTIONS);

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
  if (process.argv.includes("--admin-only")) {
    await seedAdminUser();
    return;
  }

  for (const entry of SEED_ASSETS) {
    await seedAsset(entry);
  }

  for (const entry of SEED_PORTFOLIO_PROJECTS) {
    await seedPortfolioProject(entry);
  }

  for (const entry of SEED_ARTICLES) {
    await seedArticle(entry);
  }

  const faqIds = SEED_FAQ_ITEMS.map((entry) => entry.id);
  await prisma.faqItem.deleteMany({
    where: { id: { notIn: [...faqIds] } },
  });

  for (const entry of SEED_FAQ_ITEMS) {
    await seedFaqItem(entry);
  }

  await seedTranslations();
  await seedPricing();
  await seedHomeHero();
  await seedStudioCms(prisma);
  await seedAdminUser();
}

const HOME_HERO_SEED = {
  key: "home",
  title: "Make your property impossible to ignore.",
  description:
    "Premium real estate photography, cinematic video, drone, AI-powered media, Matterport 3D tours and professional reality capture — all under one roof.",
  primaryButtonLabel: "Book a Shoot",
  primaryButtonHref: "/#contact",
  secondaryButtonLabel: "Explore Services",
  secondaryButtonHref: "/#photography",
  desktopImageUrl: "/assets/hero-villa-BcD5T4f7.webp",
  desktopImageKey: null,
  mobileImageUrl: "/assets/hero-villa-BcD5T4f7.webp",
  mobileImageKey: null,
} as const;

async function seedHomeHero(): Promise<void> {
  await prisma.homeHero.upsert({
    where: { key: HOME_HERO_SEED.key },
    create: {
      key: HOME_HERO_SEED.key,
      title: HOME_HERO_SEED.title,
      description: HOME_HERO_SEED.description,
      primaryButtonLabel: HOME_HERO_SEED.primaryButtonLabel,
      primaryButtonHref: HOME_HERO_SEED.primaryButtonHref,
      secondaryButtonLabel: HOME_HERO_SEED.secondaryButtonLabel,
      secondaryButtonHref: HOME_HERO_SEED.secondaryButtonHref,
      desktopImageUrl: HOME_HERO_SEED.desktopImageUrl,
      desktopImageKey: HOME_HERO_SEED.desktopImageKey,
      mobileImageUrl: HOME_HERO_SEED.mobileImageUrl,
      mobileImageKey: HOME_HERO_SEED.mobileImageKey,
    },
    update: {
      title: HOME_HERO_SEED.title,
      description: HOME_HERO_SEED.description,
      primaryButtonLabel: HOME_HERO_SEED.primaryButtonLabel,
      primaryButtonHref: HOME_HERO_SEED.primaryButtonHref,
      secondaryButtonLabel: HOME_HERO_SEED.secondaryButtonLabel,
      secondaryButtonHref: HOME_HERO_SEED.secondaryButtonHref,
      desktopImageUrl: HOME_HERO_SEED.desktopImageUrl,
      desktopImageKey: HOME_HERO_SEED.desktopImageKey,
      mobileImageUrl: HOME_HERO_SEED.mobileImageUrl,
      mobileImageKey: HOME_HERO_SEED.mobileImageKey,
    },
  });

  console.info("Seeded home hero");
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
    sectionTitle: "Choose how far you want to go.",
    priceSuffix: "",
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
    price: "$349",
    priceSuffixOverride: "",
    features: [
      "Professional photography",
      "Interior & exterior",
      "Professional editing",
      "20+ final images",
    ],
    bookLabel: "Book Essential",
    bookHref: "/#contact",
    cardAccent: "blue",
    sortOrder: 1,
  },
  {
    id: "digital",
    categoryKey: "media",
    name: "Digital",
    price: "$499",
    priceSuffixOverride: "",
    features: [
      "Professional photography",
      "3D Matterport tour",
      "Professional editing",
      "Digital floor plan",
    ],
    bookLabel: "Book Digital",
    bookHref: "/#contact",
    cardAccent: "purple",
    sortOrder: 2,
  },
  {
    id: "cinematic",
    categoryKey: "media",
    name: "Cinematic",
    price: "$799",
    priceSuffixOverride: "",
    features: [
      "Professional photography",
      "Cinematic property video",
      "Drone photography",
      "Professional editing",
      "Social media version",
    ],
    bookLabel: "Book Cinematic",
    bookHref: "/#contact",
    cardAccent: "orange",
    sortOrder: 3,
  },
  {
    id: "complete",
    categoryKey: "media",
    name: "Complete",
    price: "$999",
    priceSuffixOverride: "",
    features: [
      "Professional photography",
      "Cinematic 4K video",
      "Drone photography",
      "Drone video",
      "Matterport 3D tour",
      "Floor plan",
      "Social media vertical video",
      "Professional editing",
    ],
    bookLabel: "Book Complete",
    bookHref: "/#contact",
    cardAccent: "purple",
    highlighted: true,
    badgeLabel: "Most complete",
    sortOrder: 4,
  },
  {
    id: "luxury-development",
    categoryKey: "media",
    name: "Luxury / Development",
    price: "Custom",
    priceSuffixOverride: "",
    features: [
      "Custom production planning",
      "Dedicated creative direction",
      "Multi-day capture",
      "Luxury estates",
      "Commercial properties",
      "New developments",
      "Hotels & multifamily",
      "Architectural projects",
    ],
    bookLabel: "Request Custom Proposal",
    bookHref: "/#contact",
    cardAccent: "orange",
    sortOrder: 5,
  },
  {
    id: "insights",
    categoryKey: "analytics",
    name: "Insights",
    price: "$199",
    features: ["Neighborhood reports", "Listing analytics", "Email digest"],
    bookLabel: "Talk to sales",
    bookHref: "/#contact",
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
    bookHref: "/#contact",
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
    bookHref: "/#contact",
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
  await prisma.pricingPackage.deleteMany({
    where: { id: { in: ["signature", "cinematic-plus"] } },
  });

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
