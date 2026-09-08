const EYEBROW_SEPARATOR = " · ";

const SERVICE_BADGE_PATTERN = /^service\s+\d+$/i;

export type StudioServiceEyebrow = {
  /** Overlay badge such as "SERVICE 01", absent for sections without a numbered badge. */
  readonly badge: string | null;
  readonly name: string;
};

/** Splits "Service 01 · Real Estate Photography" into its badge and service name. */
export function splitStudioServiceEyebrow(eyebrow: string): StudioServiceEyebrow {
  const [head, ...rest] = eyebrow.split(EYEBROW_SEPARATOR);

  if (rest.length === 0 || !head || !SERVICE_BADGE_PATTERN.test(head.trim())) {
    return { badge: null, name: eyebrow };
  }

  return { badge: head.trim().toUpperCase(), name: rest.join(EYEBROW_SEPARATOR) };
}
