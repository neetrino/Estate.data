import { HOME_HERO_COPY } from "@/features/home/content/heroCopy";
import { HomeLandingHeroDashboard } from "@/features/home/landing/components/HomeLandingHeroDashboard";
import { HomeLandingTrustedPartners } from "@/features/home/landing/components/HomeLandingTrustedPartners";
import {
  HOME_LANDING_HERO_CTA_ROW_CLASS,
  HOME_LANDING_HERO_OUTLINE_CTA_CLASS,
  HOME_LANDING_HERO_PRIMARY_CTA_CLASS,
  HOME_LANDING_HERO_DESCRIPTION_CLASS,
  HOME_LANDING_HERO_COPY_COLUMN_CLASS,
  HOME_LANDING_HERO_DASHBOARD_COLUMN_CLASS,
  HOME_LANDING_HERO_GRID_CLASS,
  HOME_LANDING_HERO_HEADLINE_CLASS,
  HOME_LANDING_HERO_MAIN_OFFSET_CLASS,
  HOME_LANDING_HERO_INNER_CLASS,
  HOME_LANDING_HERO_MIN_HEIGHT_CLASS,
  HOME_LANDING_HERO_TOP_PADDING_CLASS,
  HOME_LANDING_LOCATION_BADGE_CLASS,
  HOME_LANDING_TRUST_STRIP_WRAPPER_CLASS,
  LANDING_CONTAINER_CLASS,
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
  return (
    <section
      className={`relative flex flex-col overflow-hidden bg-white ${HOME_LANDING_HERO_MIN_HEIGHT_CLASS} ${HOME_LANDING_HERO_TOP_PADDING_CLASS}`}
    >
      <div className="home-landing-hero-bg pointer-events-none absolute inset-0 opacity-80" aria-hidden />
      <div className={`${LANDING_CONTAINER_CLASS} ${HOME_LANDING_HERO_INNER_CLASS}`}>
        <div className={`${HOME_LANDING_HERO_GRID_CLASS} ${HOME_LANDING_HERO_MAIN_OFFSET_CLASS}`}>
          <div className={HOME_LANDING_HERO_COPY_COLUMN_CLASS}>
            <p className={HOME_LANDING_LOCATION_BADGE_CLASS}>
              <LocationPinIcon />
              {locationBadge}
            </p>

            <h1 className={HOME_LANDING_HERO_HEADLINE_CLASS}>
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

            <p className={HOME_LANDING_HERO_DESCRIPTION_CLASS}>
              {descriptionLines.map((line, index) => (
                <span key={line}>
                  {line}
                  {index < descriptionLines.length - 1 ? <br /> : null}
                </span>
              ))}
            </p>

            <div className={HOME_LANDING_HERO_CTA_ROW_CLASS}>
              <EstatePillButtonLink
                href={primaryCta.href}
                className={HOME_LANDING_HERO_PRIMARY_CTA_CLASS}
              >
                {primaryCta.label}
              </EstatePillButtonLink>
              <LandingOutlineButtonLink
                href={secondaryCta.href}
                showArrow={false}
                className={HOME_LANDING_HERO_OUTLINE_CTA_CLASS}
              >
                {secondaryCta.label}
              </LandingOutlineButtonLink>
            </div>
          </div>

          <div className={HOME_LANDING_HERO_DASHBOARD_COLUMN_CLASS}>
            <HomeLandingHeroDashboard />
          </div>
        </div>

        <div className={HOME_LANDING_TRUST_STRIP_WRAPPER_CLASS}>
          <HomeLandingTrustedPartners />
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
