import { SolutionsRolesSection } from "@/features/solutions/components/SolutionsRolesSection";
import { FooterPageBridge } from "@/shared/components/footer/FooterPageBridge";
import { SITE_PAGE_SHELL_CLASS, INNER_PAGE_MAIN_SPACING_CLASS } from "@/shared/lib/constants";

export function SolutionsPage() {
  return (
    <main
      className={[
        INNER_PAGE_MAIN_SPACING_CLASS,
        "relative isolate overflow-x-hidden bg-[#f8f7ff]",
        "bg-[url('/images/solutions/solutions-page-bg-reference-v2.png')] bg-cover bg-center bg-no-repeat",
      ].join(" ")}
    >
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-28 bg-gradient-to-b from-transparent via-[#f4f1fb]/65 to-[#f4f1fb]"
        aria-hidden
      />
      <div className={`${SITE_PAGE_SHELL_CLASS} relative z-20`}>
        <SolutionsRolesSection />
      </div>
      <FooterPageBridge from="surface" />
    </main>
  );
}
