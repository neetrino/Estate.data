import { getPrisma } from "@/server/lib/db";

export type AdminArticleTranslation = {
  locale: string;
  title: string;
  readTimeLabel: string | null;
};

export type AdminArticleRow = {
  id: string;
  slug: string;
  title: string;
  readTimeLabel: string;
  body: string;
  sortOrder: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  translations: AdminArticleTranslation[];
};

/** List all articles for admin (including unpublished). */
export async function listAdminArticles(): Promise<AdminArticleRow[]> {
  const rows = await getPrisma().article.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    select: {
      id: true,
      slug: true,
      title: true,
      readTimeLabel: true,
      body: true,
      sortOrder: true,
      published: true,
      createdAt: true,
      updatedAt: true,
      translations: {
        select: {
          locale: true,
          title: true,
          readTimeLabel: true,
        },
      },
    },
  });

  return rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    readTimeLabel: row.readTimeLabel,
    body: row.body,
    sortOrder: row.sortOrder,
    published: row.published,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    translations: row.translations,
  }));
}
