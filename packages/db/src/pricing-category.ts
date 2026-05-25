/** Pricing page package groupings — media vs analytics subscriptions. */
export const PRICING_CATEGORIES = ["media", "analytics"] as const;

export type PricingCategoryKey = (typeof PRICING_CATEGORIES)[number];

export const PRICING_CARD_ACCENTS = ["blue", "purple", "orange"] as const;

export type PricingCardAccent = (typeof PRICING_CARD_ACCENTS)[number];

export function isPricingCategoryKey(value: string): value is PricingCategoryKey {
  return (PRICING_CATEGORIES as readonly string[]).includes(value);
}

export function isPricingCardAccent(value: string): value is PricingCardAccent {
  return (PRICING_CARD_ACCENTS as readonly string[]).includes(value);
}
