export type DashboardSummary = {
  portfolioCount: number;
  publishedPortfolioCount: number;
  featuredPortfolioCount: number;
  pricingPackageCount: number;
  faqCount: number;
  publishedFaqCount: number;
  contactInquiryCount: number;
};

export type AdminContactInquiry = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  propertyAddress: string | null;
  services: readonly string[];
  preferredDate: string | null;
  projectDetails: string | null;
  extraFields: Record<string, string> | null;
  createdAt: string;
};

export type AdminPortfolioProject = {
  id: string;
  imageUrl: string;
  imageAlt: string;
  category: string;
  sortOrder: number;
  featuredOnHome: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AdminPricingPackage = {
  id: string;
  categoryKey: string;
  name: string;
  price: string;
  priceSuffixOverride: string | null;
  features: string[];
  bookLabel: string;
  bookHref: string;
  cardAccent: string | null;
  highlighted: boolean;
  badgeLabel: string | null;
  sortOrder: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AdminPricingCategory = {
  key: string;
  sectionTitle: string;
  priceSuffix: string;
  packages: AdminPricingPackage[];
};

export type AdminPricingResponse = {
  categories: AdminPricingCategory[];
};

export type AdminFaqItem = {
  id: string;
  question: string;
  answer: string;
  sortOrder: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AdminHomeHero = {
  title: string;
  description: string;
  primaryButtonLabel: string;
  primaryButtonHref: string;
  secondaryButtonLabel: string;
  secondaryButtonHref: string;
  desktopImageUrl: string | null;
  desktopImageKey: string | null;
  mobileImageUrl: string | null;
  mobileImageKey: string | null;
};

export type AdminHomeHeroUploadResult = {
  objectKey: string;
  publicUrl: string;
  byteSize: number;
  mimeType: string;
};

export type AdminHeroSlide = {
  id: string;
  imageUrl: string;
  imageKey: string | null;
  thumbUrl: string;
  alt: string;
  sortOrder: number;
  published: boolean;
};

export type AdminStudioService = {
  id: string;
  sectionKey: string;
  eyebrow: string;
  title: string;
  description: string;
  imageUrl: string;
  galleryUrls: unknown;
  included: unknown;
  pricing: unknown;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  startingPrice: string | null;
  pricingUnit: string | null;
  footnote: string | null;
  sortOrder: number;
  published: boolean;
};

export type AdminContactField = {
  id: string;
  fieldKey: string;
  label: string;
  placeholder: string;
  mode: string;
  sortOrder: number;
};
