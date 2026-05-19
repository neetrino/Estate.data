/** Stable keys for seeded assets — use with `assetUrl()`. */
export const ASSET_KEYS = {
  siteLogo: "site-logo",
  siteLogoDark: "site-logo-dark",
  homeHero: "home-hero",
  navPhoneIcon: "nav-phone-icon",
  whatWeDoPhotographyIcon: "what-we-do-photography-icon",
  whatWeDoCinematicVideoIcon: "what-we-do-cinematic-video-icon",
  whatWeDoDroneAerialIcon: "what-we-do-drone-aerial-icon",
  whatWeDoToursFloorplansIcon: "what-we-do-tours-floorplans-icon",
  whatWeDoMarketIntelligenceIcon: "what-we-do-market-intelligence-icon",
} as const;

export type AssetKey = (typeof ASSET_KEYS)[keyof typeof ASSET_KEYS];
