import Link from "next/link";
import { HOME_HERO_COPY } from "@/features/home/content/heroCopy";
import {
  HERO_ACTIONS_ROOT_CLASS,
  HERO_ACTIONS_SECONDARY_CLASS,
  HERO_ACTIONS_SECONDARY_ICON_DISC_CLASS,
} from "@/features/home/landing/lib/heroActionsStyles";
import {
  HOME_MOBILE_BOOK_SHOOT_PILL_CLASS,
  HOME_MOBILE_CTA_STACK_CLASS,
  HOME_MOBILE_LEFT_PILL_CLASS,
} from "@/features/home/landing/lib/landingStyles";
import {
  LANDING_BOOK_SHOOT_GRADIENT_HOVER_CLASS,
  LANDING_BOOK_SHOOT_GRADIENT_SURFACE_CLASS,
} from "@/shared/lib/constants";
import { EstatePillButtonLink } from "@/shared/ui/button";

export function HeroActions() {
  const { primaryCta, secondaryCta } = HOME_HERO_COPY;

  return (
    <div className={`${HERO_ACTIONS_ROOT_CLASS} ${HOME_MOBILE_CTA_STACK_CLASS}`}>
      <EstatePillButtonLink
        href={primaryCta.href}
        fullWidth
        className={[
          HOME_MOBILE_BOOK_SHOOT_PILL_CLASS,
          LANDING_BOOK_SHOOT_GRADIENT_SURFACE_CLASS,
          LANDING_BOOK_SHOOT_GRADIENT_HOVER_CLASS,
        ].join(" ")}
      >
        {primaryCta.label}
      </EstatePillButtonLink>

      <Link
        href={secondaryCta.href}
        className={`${HERO_ACTIONS_SECONDARY_CLASS} ${HOME_MOBILE_LEFT_PILL_CLASS}`}
      >
        <span>{secondaryCta.label}</span>
        <span className={HERO_ACTIONS_SECONDARY_ICON_DISC_CLASS} aria-hidden>
          <BarChartIcon />
        </span>
      </Link>
    </div>
  );
}

function BarChartIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M4 19V5" strokeLinecap="round" />
      <path d="M10 19V9" strokeLinecap="round" />
      <path d="M16 19v-6" strokeLinecap="round" />
      <path d="M22 19V3" strokeLinecap="round" />
    </svg>
  );
}
