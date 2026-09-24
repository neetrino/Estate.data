const GA_MEASUREMENT_ID_PATTERN = /^G-[A-Z0-9]+$/;

/** Public GA4 measurement id from the installed Google tag. Not a secret. */
export const GA_MEASUREMENT_ID = "G-B9B7P2G10R";

/**
 * GA4 measurement id. `NEXT_PUBLIC_GA_MEASUREMENT_ID` overrides the installed id
 * when it matches `G-XXXXXXXX`.
 */
export function resolveGaMeasurementId(): string {
  const raw = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  if (raw && GA_MEASUREMENT_ID_PATTERN.test(raw)) {
    return raw;
  }
  return GA_MEASUREMENT_ID;
}
