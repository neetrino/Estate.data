import type { AssetKey } from "./asset-keys";
import { ASSET_KEYS } from "./asset-keys";

type AssetFallback = {
  readonly publicPath: string;
  readonly mimeType: string;
};

/** Local `public/` files used when DATABASE_URL is unset or asset missing in DB. */
export const ASSET_FALLBACK_BY_KEY: Record<AssetKey, AssetFallback> = {
  [ASSET_KEYS.siteLogo]: {
    publicPath: "images/logo-estatedata.png",
    mimeType: "image/png",
  },
  [ASSET_KEYS.siteLogoDark]: {
    publicPath: "images/logo-estatedata-dark.png",
    mimeType: "image/png",
  },
  [ASSET_KEYS.homeHero]: {
    publicPath: "assets/hero-villa-BcD5T4f7.webp",
    mimeType: "image/jpeg",
  },
  [ASSET_KEYS.navPhoneIcon]: {
    publicPath: "icons/phone.svg",
    mimeType: "image/svg+xml",
  },
  [ASSET_KEYS.whatWeDoPhotographyIcon]: {
    publicPath: "icons/what-we-do/photography.svg",
    mimeType: "image/svg+xml",
  },
  [ASSET_KEYS.whatWeDoCinematicVideoIcon]: {
    publicPath: "icons/what-we-do/cinematic-video.svg",
    mimeType: "image/svg+xml",
  },
  [ASSET_KEYS.whatWeDoDroneAerialIcon]: {
    publicPath: "icons/what-we-do/drone-aerial.svg",
    mimeType: "image/svg+xml",
  },
  [ASSET_KEYS.whatWeDoToursFloorplansIcon]: {
    publicPath: "icons/what-we-do/tours-floorplans.svg",
    mimeType: "image/svg+xml",
  },
  [ASSET_KEYS.whatWeDoMarketIntelligenceIcon]: {
    publicPath: "icons/what-we-do/market-intelligence.svg",
    mimeType: "image/svg+xml",
  },
  [ASSET_KEYS.propertyIntelligenceHero]: {
    publicPath: "assets/scan-bim-gjdfWRdw.webp",
    mimeType: "image/jpeg",
  },
  [ASSET_KEYS.recentWorkPlaceholder]: {
    publicPath: "assets/portfolio-1-DsFekI_2.webp",
    mimeType: "image/jpeg",
  },
  [ASSET_KEYS.clientVoicesQuoteMarks]: {
    publicPath: "images/client-voices/quote-marks.png",
    mimeType: "image/png",
  },
  [ASSET_KEYS.aboutTeamCollaboration]: {
    publicPath: "assets/team-zk6Ayjl0.webp",
    mimeType: "image/jpeg",
  },
  [ASSET_KEYS.contactLocationIcon]: {
    publicPath: "icons/contact/location.png",
    mimeType: "image/png",
  },
  [ASSET_KEYS.contactPhoneIcon]: {
    publicPath: "icons/contact/phone.png",
    mimeType: "image/png",
  },
  [ASSET_KEYS.contactEmailIcon]: {
    publicPath: "icons/contact/mail.png",
    mimeType: "image/png",
  },
  [ASSET_KEYS.siteFavicon]: {
    publicPath: "images/site-favicon.png",
    mimeType: "image/png",
  },
  [ASSET_KEYS.siteAppleIcon]: {
    publicPath: "images/site-apple-icon.png",
    mimeType: "image/png",
  },
  [ASSET_KEYS.trustedCompass]: {
    publicPath: "images/trusted/compass.png",
    mimeType: "image/png",
  },
  [ASSET_KEYS.trustedSothebys]: {
    publicPath: "images/trusted/sothebys.png",
    mimeType: "image/png",
  },
  [ASSET_KEYS.trustedTheAgency]: {
    publicPath: "images/trusted/the-agency.png",
    mimeType: "image/png",
  },
  [ASSET_KEYS.trustedDouglasElliman]: {
    publicPath: "images/trusted/douglas-elliman.png",
    mimeType: "image/png",
  },
  [ASSET_KEYS.trustedColdwellBanker]: {
    publicPath: "images/trusted/coldwell-banker.png",
    mimeType: "image/png",
  },
  [ASSET_KEYS.trustedHiltonHyland]: {
    publicPath: "images/trusted/hilton-hyland.png",
    mimeType: "image/png",
  },
};

export function isAssetKey(value: string): value is AssetKey {
  return value in ASSET_FALLBACK_BY_KEY;
}
