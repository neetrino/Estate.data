import type { AssetKey } from "@estate/db";
import { ASSET_KEYS } from "@estate/db";

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
    publicPath: "images/hero-home.jpg",
    mimeType: "image/jpeg",
  },
  [ASSET_KEYS.navPhoneIcon]: {
    publicPath: "icons/phone.svg",
    mimeType: "image/svg+xml",
  },
  [ASSET_KEYS.whatWeDoPhotographyIcon]: {
    publicPath: "icons/what-we-do/photography.png",
    mimeType: "image/png",
  },
  [ASSET_KEYS.whatWeDoCinematicVideoIcon]: {
    publicPath: "icons/what-we-do/cinematic-video.png",
    mimeType: "image/png",
  },
  [ASSET_KEYS.whatWeDoDroneAerialIcon]: {
    publicPath: "icons/what-we-do/drone-aerial.png",
    mimeType: "image/png",
  },
  [ASSET_KEYS.whatWeDoToursFloorplansIcon]: {
    publicPath: "icons/what-we-do/tours-floorplans.png",
    mimeType: "image/png",
  },
  [ASSET_KEYS.whatWeDoMarketIntelligenceIcon]: {
    publicPath: "icons/what-we-do/market-intelligence.png",
    mimeType: "image/png",
  },
  [ASSET_KEYS.propertyIntelligenceHero]: {
    publicPath: "images/property-intelligence/scan-to-bim.jpg",
    mimeType: "image/jpeg",
  },
  [ASSET_KEYS.recentWorkPlaceholder]: {
    publicPath: "images/recent-work/placeholder.jpg",
    mimeType: "image/jpeg",
  },
  [ASSET_KEYS.clientVoicesQuoteMarks]: {
    publicPath: "images/client-voices/quote-marks.png",
    mimeType: "image/png",
  },
  [ASSET_KEYS.aboutTeamCollaboration]: {
    publicPath: "images/about/team-collaboration.png",
    mimeType: "image/png",
  },
  [ASSET_KEYS.contactLocationIcon]: {
    publicPath: "images/contact/location.png",
    mimeType: "image/png",
  },
  [ASSET_KEYS.contactPhoneIcon]: {
    publicPath: "images/contact/phone.png",
    mimeType: "image/png",
  },
  [ASSET_KEYS.contactEmailIcon]: {
    publicPath: "images/contact/mail.png",
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
