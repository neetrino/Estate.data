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
