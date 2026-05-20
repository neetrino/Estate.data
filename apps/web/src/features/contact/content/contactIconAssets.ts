import { ASSET_KEYS, assetUrl } from "@estate/db";

/** Studio contact row icons — served from DB via `/api/v1/assets/*`. */
export const CONTACT_STUDIO_ICON_PATHS = {
  location: assetUrl(ASSET_KEYS.contactLocationIcon),
  phone: assetUrl(ASSET_KEYS.contactPhoneIcon),
  /** `email` not `mail` in key — some ad blockers hide URLs containing `email`. */
  email: assetUrl(ASSET_KEYS.contactEmailIcon),
} as const;

export type ContactStudioIconKind = keyof typeof CONTACT_STUDIO_ICON_PATHS;
