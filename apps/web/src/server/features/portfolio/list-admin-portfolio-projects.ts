import { getPrisma } from "@/server/lib/db";

export type AdminPortfolioTranslation = {
  locale: string;
  imageAlt: string | null;
  category: string | null;
};

export type AdminPortfolioProjectRow = {
  id: string;
  imageUrl: string;
  imageAlt: string;
  category: string;
  sortOrder: number;
  featuredOnHome: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  translations: AdminPortfolioTranslation[];
};

/** List all portfolio projects for admin (including unpublished). */
export async function listAdminPortfolioProjects(): Promise<AdminPortfolioProjectRow[]> {
  const rows = await getPrisma().portfolioProject.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    select: {
      id: true,
      imageUrl: true,
      imageAlt: true,
      category: true,
      sortOrder: true,
      featuredOnHome: true,
      published: true,
      createdAt: true,
      updatedAt: true,
      translations: {
        select: {
          locale: true,
          imageAlt: true,
          category: true,
        },
      },
    },
  });

  return rows.map((row) => ({
    id: row.id,
    imageUrl: row.imageUrl,
    imageAlt: row.imageAlt,
    category: row.category,
    sortOrder: row.sortOrder,
    featuredOnHome: row.featuredOnHome,
    published: row.published,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    translations: row.translations,
  }));
}
