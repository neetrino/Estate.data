import { HOME_HERO_COPY } from "@/features/home/content/heroCopy";
import { HOME_TRUSTED_PARTNERS_COPY } from "@/features/home/content/trustedPartnersCopy";
import { HomeLandingHeroDashboard } from "@/features/home/landing/components/HomeLandingHeroDashboard";
import {
  LANDING_CONTAINER_CLASS,
  LANDING_EYEBROW_CLASS,
  LANDING_TRUST_PARTNER_CHIP_CLASS,
} from "@/features/home/landing/lib/landingStyles";
import { EstatePillButtonLink, LandingOutlineButtonLink } from "@/shared/ui/button";

export function HomeLandingHero() {
  const {
    locationBadge,
    headlineLines,
    descriptionLines,
    primaryCta,
    secondaryCta,
  } = HOME_HERO_COPY;
  const { label: trustLabel, partners } = HOME_TRUSTED_PARTNERS_COPY;

  return (
    <section className="relative overflow-hidden bg-white pb-10 pt-6 sm:pb-14 sm:pt-10 lg:pb-20">
      <div className="home-landing-hero-bg pointer-events-none absolute inset-0 opacity-80" aria-hidden />
      <div className={`${LANDING_CONTAINER_CLASS} relative`}>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div>
            <p
              className={`inline-flex items-center gap-2 rounded-full border border-brand-purple/25 bg-white px-4 py-1.5 shadow-sm ${LANDING_EYEBROW_CLASS} normal-case tracking-normal`}
            >
              <LocationPinIcon />
              {locationBadge}
            </p>

            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-brand-navy sm:text-5xl lg:text-[3.25rem]">
              {headlineLines.map((line) => (
                <span key={line.segments.map((segment) => segment.text).join("")} className="block">
                  {line.segments.map((segment) => (
                    <span
                      key={segment.text}
                      className={segment.accent ? "text-brand-purple-light" : undefined}
                    >
                      {segment.text}
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {descriptionLines.map((line, index) => (
                <span key={line}>
                  {line}
                  {index < descriptionLines.length - 1 ? <br /> : null}
                </span>
              ))}
            </p>

            <div className="mt-8 flex w-full max-w-lg flex-col gap-3 sm:flex-row sm:items-center">
              <EstatePillButtonLink href={primaryCta.href} fullWidth>
                {primaryCta.label}
              </EstatePillButtonLink>
              <LandingOutlineButtonLink href={secondaryCta.href} fullWidth showArrow={false}>
                {secondaryCta.label}
              </LandingOutlineButtonLink>
            </div>

            <div className="mt-10 border-t border-brand-navy/8 pt-6">
              <p className="text-sm font-medium text-brand-navy/70">{trustLabel}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {partners.map((name) => (
                  <li key={name}>
                    <span className={LANDING_TRUST_PARTNER_CHIP_CLASS}>{name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <HomeLandingHeroDashboard />
        </div>
      </div>
    </section>
  );
}

function LocationPinIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-brand-purple-light"
      aria-hidden
    >
      <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
