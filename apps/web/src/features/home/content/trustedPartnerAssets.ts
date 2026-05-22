function trustedPartnerImagePath(filename: string): string {
  return `/images/trusted/${filename}`;
}

/** Trusted companies row — logo cards in `public/images/trusted/`. */
export const TRUSTED_PARTNER_IMAGE_PATHS = {
  compass: trustedPartnerImagePath("compass.png"),
  sothebys: trustedPartnerImagePath("sothebys.png"),
  "the-agency": trustedPartnerImagePath("the-agency.png"),
  "douglas-elliman": trustedPartnerImagePath("douglas-elliman.png"),
  "coldwell-banker": trustedPartnerImagePath("coldwell-banker.png"),
  "hilton-hyland": trustedPartnerImagePath("hilton-hyland.png"),
} as const;

export type TrustedPartnerImageKey = keyof typeof TRUSTED_PARTNER_IMAGE_PATHS;
