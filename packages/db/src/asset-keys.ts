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
  propertyIntelligenceHero: "property-intelligence-hero",
  recentWorkPlaceholder: "recent-work-placeholder",
  clientVoicesQuoteMarks: "client-voices-quote-marks",
  aboutTeamCollaboration: "about-team-collaboration",
  contactLocationIcon: "contact-location-icon",
  contactPhoneIcon: "contact-phone-icon",
  contactEmailIcon: "contact-email-icon",
  siteFavicon: "site-favicon",
  siteAppleIcon: "site-apple-icon",
  trustedCompass: "trusted-compass",
  trustedSothebys: "trusted-sothebys",
  trustedTheAgency: "trusted-the-agency",
  trustedDouglasElliman: "trusted-douglas-elliman",
  trustedColdwellBanker: "trusted-coldwell-banker",
  trustedHiltonHyland: "trusted-hilton-hyland",
} as const;

export type AssetKey = (typeof ASSET_KEYS)[keyof typeof ASSET_KEYS];
