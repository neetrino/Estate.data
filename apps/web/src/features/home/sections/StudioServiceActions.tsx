import type { StudioServiceContent } from "@/features/home/content/studioServicesCopy";
import { StudioCta } from "@/features/home/sections/StudioCta";
import { StudioStartingAt } from "@/features/home/sections/StudioStartingAt";

type StudioServiceActionsProps = {
  readonly service: StudioServiceContent;
  readonly className?: string;
};

/** Primary CTA and starting-at price, shared by specialized service sections. */
export function StudioServiceActions({ service, className = "" }: StudioServiceActionsProps) {
  return (
    <div className={`flex flex-wrap items-center gap-6 ${className}`.trim()}>
      <StudioCta href={service.primaryCtaHref}>{service.primaryCtaLabel}</StudioCta>
      {service.startingPrice ? (
        <StudioStartingAt price={service.startingPrice} unit={service.pricingUnit} />
      ) : null}
    </div>
  );
}
