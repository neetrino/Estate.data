export type DashboardSummary = {
  portfolioCount: number;
  publishedPortfolioCount: number;
  featuredPortfolioCount: number;
  pricingPackageCount: number;
  articleCount: number;
  publishedArticleCount: number;
  faqCount: number;
  publishedFaqCount: number;
  contactInquiryCount: number;
  assetCount: number;
  orderCount: number;
  pendingOrderCount: number;
};

export type AdminContactInquiry = {
  id: string;
  name: string;
  email: string;
  propertyAddress: string;
  service: string;
  preferredDate: string | null;
  projectDetails: string | null;
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

export type AdminArticle = {
  id: string;
  slug: string;
  title: string;
  readTimeLabel: string;
  body: string;
  sortOrder: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
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

export type AdminAsset = {
  id: string;
  key: string;
  mimeType: string;
  fileName: string;
  byteSize: number;
  createdAt: string;
  updatedAt: string;
  publicUrl: string;
};

export type AdminMediaItem = {
  key: string;
  url: string;
  size: number;
  lastModified: string;
  contentType: string | null;
};

export type AdminMediaListResponse = {
  configured: boolean;
  items: AdminMediaItem[];
};

export type AdminPayment = {
  id: string;
  provider: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type AdminOrder = {
  id: string;
  amount: string;
  currency: string;
  status: string;
  provider: string | null;
  providerRef: string | null;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  payments: AdminPayment[];
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
