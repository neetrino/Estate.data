import type { AdminTabItem } from "@/features/admin/components/ui/AdminTabs";

export const HOMEPAGE_COPY_TABS = [
  {
    id: "stats",
    label: "Numbers",
    hint: "The large figures in What We Do near the top of the homepage, such as “40% Faster property sales”.",
  },
  {
    id: "offerings",
    label: "What we offer",
    hint: "Numbered cards that introduce photography, video, and the other services.",
  },
  {
    id: "floorPlans",
    label: "Floor plans",
    hint: "The floor-plans block after the 3D tour. The tour itself is under Studio services → Tours.",
  },
  {
    id: "packagesIntro",
    label: "Packages intro",
    hint: "Headings above the price cards. Edit the packages themselves under Pricing.",
  },
  {
    id: "portfolioIntro",
    label: "Portfolio intro",
    hint: "Headings above Recent Work. Add or reorder projects under Portfolio.",
  },
  {
    id: "beforeAfter",
    label: "Before & after",
    hint: "The photo pairs that show a space before and after editing or staging.",
  },
  {
    id: "process",
    label: "How we work",
    hint: "The step-by-step process visitors see: Book, Capture, Create, and so on.",
  },
  {
    id: "whyUs",
    label: "Why us",
    hint: "The “why work with us” block — headline, short tags, and longer statements.",
  },
  {
    id: "studio",
    label: "Studio & team",
    hint: "Studio story, photo, and the people listed on the team block.",
  },
  {
    id: "serviceArea",
    label: "Service area",
    hint: "Cities you cover and the button at the end of that block.",
  },
  {
    id: "faqIntro",
    label: "FAQ intro",
    hint: "The heading above the questions. Edit the questions themselves under FAQ.",
  },
] as const satisfies readonly AdminTabItem<
  | "stats"
  | "offerings"
  | "floorPlans"
  | "packagesIntro"
  | "portfolioIntro"
  | "beforeAfter"
  | "process"
  | "whyUs"
  | "studio"
  | "serviceArea"
  | "faqIntro"
>[];

export type HomepageCopyTabId = (typeof HOMEPAGE_COPY_TABS)[number]["id"];
