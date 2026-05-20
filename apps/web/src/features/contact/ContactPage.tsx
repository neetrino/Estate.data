import { ContactRequestForm } from "@/features/contact/components/ContactRequestForm";
import { CONTACT_PAGE_COPY } from "@/features/contact/content/contactCopy";
import { Navbar } from "@/shared/components/navbar";
import {
  CLIENT_VOICES_EYEBROW_CLASS,
  CLIENT_VOICES_SECTION_TITLE_CLASS,
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
              <p className={CLIENT_VOICES_EYEBROW_CLASS}>{eyebrow}</p>
              <h1 className={CLIENT_VOICES_SECTION_TITLE_CLASS}>{title}</h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                {subtitle}
              </p>
            </header>
            <div className="w-full lg:ml-auto lg:max-w-xl">
              <ContactRequestForm />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
