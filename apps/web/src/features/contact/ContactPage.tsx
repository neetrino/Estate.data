import { ContactStudioDetails } from "@/features/contact/components/ContactStudioDetails";
import {
  LazyContactRequestForm,
  LazyContactStudioMap,
} from "@/features/contact/lib/lazyContactComponents";
import { CONTACT_PAGE_COPY } from "@/features/contact/content/contactCopy";
import { FooterPageBridge } from "@/shared/components/footer/FooterPageBridge";
import { ScrollRevealBlock } from "@/shared/components/reveal/ScrollRevealBlock";
import {
  CONTACT_PAGE_EYEBROW_CLASS,
  CONTACT_PAGE_SUBTITLE_CLASS,
  CONTACT_PAGE_TITLE_CLASS,
  SITE_PAGE_SHELL_CLASS,
  INNER_PAGE_MAIN_SPACING_CLASS,
} from "@/shared/lib/constants";

export function ContactPage() {
  const { eyebrow, title, subtitle } = CONTACT_PAGE_COPY;

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
          <div className="flex flex-col gap-10 lg:gap-12">
            <header>
              <p className={CONTACT_PAGE_EYEBROW_CLASS}>{eyebrow}</p>
              <h1 className={CONTACT_PAGE_TITLE_CLASS}>{title}</h1>
              <p className={CONTACT_PAGE_SUBTITLE_CLASS}>{subtitle}</p>
            </header>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-12 xl:gap-16">
              <ScrollRevealBlock className="min-h-0" index={0}>
                <div className="flex min-h-0 flex-col gap-8 lg:h-full">
                  <ContactStudioDetails />
                  <LazyContactStudioMap />
                </div>
              </ScrollRevealBlock>
              <ScrollRevealBlock className="min-h-0" index={1}>
                <LazyContactRequestForm />
              </ScrollRevealBlock>
            </div>
          </div>
        </div>
        <FooterPageBridge from="surface" />
    </main>
  );
}
