import { CONTACT_PATH } from "@/shared/lib/routes";

export type ResourceArticle = {
  readonly id: string;
  readonly title: string;
  readonly readTimeLabel: string;
  readonly href: string;
};

export type ResourceFaqItem = {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
};

export type ArticleDetail = ResourceArticle & {
  readonly slug: string;
  readonly body: string;
  readonly updatedAt?: string;
};

export const RESOURCES_ARTICLES_SECTION_TITLE = "Latest articles";

export const RESOURCES_FAQ_SECTION_TITLE = "FAQ";

export const RESOURCES_ASK_QUESTION_CTA = {
  label: "Ask a question",
  href: CONTACT_PATH,
} as const;

export const RESOURCES_ARTICLES = [
  {
    id: "westside-eastside-spring-2026",
    title: "Westside vs. Eastside: Spring 2026 absorption",
    readTimeLabel: "6 min read",
    href: "/resources/westside-vs-eastside-spring-2026-absorption",
  },
  {
    id: "twilight-drone-outperforms",
    title: "Why twilight + drone outperforms by 41%",
    readTimeLabel: "4 min read",
    href: "/resources/why-twilight-drone-outperforms",
  },
  {
    id: "scan-to-bim-playbook",
    title: "Scan to BIM: a developer's 90-day playbook",
    readTimeLabel: "9 min read",
    href: "/resources/scan-to-bim-developer-playbook",
  },
  {
    id: "analytics-dashboards-listings",
    title: "How analytics dashboards close listings faster",
    readTimeLabel: "5 min read",
    href: "/resources/analytics-dashboards-close-listings",
  },
] as const satisfies readonly ResourceArticle[];

export const RESOURCES_FAQ_ITEMS = [
  {
    id: "turnaround",
    question: "What's your turnaround?",
    answer: "Standard 48 hours; rush 24 hours available.",
  },
  {
    id: "la-coverage",
    question: "Do you cover all of LA?",
    answer: "Yes — from Malibu to DTLA, Pasadena to South Bay.",
  },
  {
    id: "raw-files",
    question: "Can I license raw files?",
    answer: "Yes, raw + edited delivery available on Cinematic+.",
  },
] as const satisfies readonly ResourceFaqItem[];

/** Mock article bodies keyed by slug — used when `NEXT_PUBLIC_USE_MOCK_API=true`. */
export const RESOURCES_MOCK_ARTICLE_BODIES: Readonly<Record<string, string>> = {
  "westside-vs-eastside-spring-2026-absorption":
    "Spring 2026 absorption rates diverged sharply between the Westside and Eastside corridors.\n\nWestside luxury inventory moved faster where twilight and drone packages were bundled with pricing intelligence.",
  "why-twilight-drone-outperforms":
    "Listings with coordinated twilight photography and aerial coverage saw 41% more qualified inquiries in our 2025 sample.\n\nTwilight exteriors signal lifestyle; drone context anchors neighborhood value.",
  "scan-to-bim-developer-playbook":
    "Developers use scan-to-BIM to de-risk entitlements and coordinate trades before drywall goes up.\n\nDay 0–30: site capture and model alignment.",
  "analytics-dashboards-close-listings":
    "Pricing dashboards give listing agents a defensible story in seller conversations.\n\nWhen DOM rises in a submarket, we surface comp velocity alongside your media performance.",
};
