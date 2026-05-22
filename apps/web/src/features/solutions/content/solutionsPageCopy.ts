export type SolutionsSubtitleSegment = {
  readonly text: string;
  readonly tone: "gold" | "accent";
};

export const SOLUTIONS_PAGE_COPY = {
  eyebrow: "SOLUTIONS",
  title: "Outcomes for every role in the deal",
  subtitleSegments: [
    { text: "Same studio, tailored deliverables — ", tone: "gold" },
    { text: "built around how you actually win.", tone: "gold" },
  ] as const satisfies readonly SolutionsSubtitleSegment[],
} as const;
