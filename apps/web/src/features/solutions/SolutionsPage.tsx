import { SolutionsRolesSection } from "@/features/solutions/components/SolutionsRolesSection";
import { SOLUTIONS_PAGE_COPY } from "@/features/solutions/content/solutionsPageCopy";
import { Navbar } from "@/shared/components/navbar";
import {
  PAGE_CONTAINER_CLASS,
  PAGE_GUTTER_CLASS,
  SOLUTIONS_PAGE_EYEBROW_CLASS,
  SOLUTIONS_PAGE_SUBTITLE_CLASS,
  SOLUTIONS_PAGE_TITLE_CLASS,
  SOLUTIONS_SUBTITLE_ACCENT_CLASS,
  SOLUTIONS_SUBTITLE_GOLD_CLASS,
  INNER_PAGE_MAIN_CLASS,
} from "@/shared/lib/constants";

const SOLUTIONS_SUBTITLE_SEGMENT_CLASS = {
  gold: SOLUTIONS_SUBTITLE_GOLD_CLASS,
  accent: SOLUTIONS_SUBTITLE_ACCENT_CLASS,
} as const;

export function SolutionsPage() {
  const { eyebrow, title, subtitleSegments } = SOLUTIONS_PAGE_COPY;

  return (
    <>
      <Navbar />
      <main className={INNER_PAGE_MAIN_CLASS}>
        <div className={`${PAGE_CONTAINER_CLASS} ${PAGE_GUTTER_CLASS}`}>
          <header>
            <p className={SOLUTIONS_PAGE_EYEBROW_CLASS}>{eyebrow}</p>
            <h1 className={SOLUTIONS_PAGE_TITLE_CLASS}>{title}</h1>
            <p className={SOLUTIONS_PAGE_SUBTITLE_CLASS}>
              {subtitleSegments.map((segment) => (
                <span
                  key={segment.text}
                  className={SOLUTIONS_SUBTITLE_SEGMENT_CLASS[segment.tone]}
                >
                  {segment.text}
                </span>
              ))}
            </p>
          </header>
          <SolutionsRolesSection />
        </div>
      </main>
    </>
  );
}
