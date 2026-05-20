import { ContactRequestForm } from "@/features/contact/components/ContactRequestForm";
import { ContactStudioDetails } from "@/features/contact/components/ContactStudioDetails";
import { ContactStudioMap } from "@/features/contact/components/ContactStudioMap";
import { CONTACT_PAGE_COPY } from "@/features/contact/content/contactCopy";
import { Navbar } from "@/shared/components/navbar";
import {
  CONTACT_PAGE_EYEBROW_CLASS,
  CONTACT_PAGE_SUBTITLE_CLASS,
  CONTACT_PAGE_TITLE_CLASS,
  PAGE_CONTAINER_CLASS,
  PAGE_GUTTER_CLASS,
  WHAT_WE_DO_SECTION_SURFACE_CLASS,
} from "@/shared/lib/constants";

export function ContactPage() {
  const { eyebrow, title, subtitle } = CONTACT_PAGE_COPY;

  return (
    <>
      <Navbar />
      <main className={WHAT_WE_DO_SECTION_SURFACE_CLASS}>
        <div className={`${PAGE_CONTAINER_CLASS} ${PAGE_GUTTER_CLASS}`}>
          <div className="flex flex-col gap-10 lg:gap-12">
            <header>
              <p className={CONTACT_PAGE_EYEBROW_CLASS}>{eyebrow}</p>
              <h1 className={CONTACT_PAGE_TITLE_CLASS}>{title}</h1>
              <p className={CONTACT_PAGE_SUBTITLE_CLASS}>{subtitle}</p>
            </header>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-12 xl:gap-16">
              <div className="flex min-h-0 flex-col gap-8 lg:h-full">
                <ContactStudioDetails />
                <ContactStudioMap />
              </div>
              <ContactRequestForm />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
