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
  ABOUT_PAGE_MAIN_CLASS,
  SITE_PAGE_SHELL_CLASS,
} from "@/shared/lib/constants";
import "@/features/resources/styles/resources-page.css";

export function ContactPage() {
  const { eyebrow, title, subtitle } = CONTACT_PAGE_COPY;

  return (
    <main className={`${ABOUT_PAGE_MAIN_CLASS} relative isolate resources-page-background`}>
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
