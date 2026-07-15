import { EstatePillButtonLink } from "@/shared/ui/button";
import { SITE_PAGE_SHELL_CLASS } from "@/shared/lib/constants";
import type { ServiceDetailCopy } from "@/features/services/shared/serviceDetailCopy";

type ServiceDetailPageProps = {
  readonly copy: ServiceDetailCopy;
};

export function ServiceDetailPage({ copy }: ServiceDetailPageProps) {
  return (
    <main className="pb-16 pt-44 sm:pt-48 lg:pb-20 lg:pt-52">
      <section className={SITE_PAGE_SHELL_CLASS} aria-labelledby="service-detail-heading">
        <div className="max-w-4xl rounded-3xl border border-slate-200 bg-white/95 p-8 shadow-sm sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-purple-light">
            Services
          </p>
          <h1
            id="service-detail-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl md:text-5xl"
          >
            {copy.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700 sm:text-lg">
            {copy.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <EstatePillButtonLink href="/contact">Book Now</EstatePillButtonLink>
            <EstatePillButtonLink href="/contact" accent="blue">
              Book Consultation
            </EstatePillButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}
