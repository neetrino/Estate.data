export type PricingPackage = {
  readonly id: string;
  readonly name: string;
  readonly price: string;
  readonly features: readonly string[];
  readonly bookLabel: string;
  readonly bookHref: string;
  readonly highlighted?: boolean;
  readonly badgeLabel?: string;
  /** Overrides section `priceSuffix`; use `""` to hide (e.g. Enterprise “Custom”). */
  readonly priceSuffix?: string;
  /** Extra classes on book CTA (e.g. icon disc offset). */
  readonly bookCtaExtraClassName?: string;
};
