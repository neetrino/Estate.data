import { getPrisma } from "@/server/lib/db";

export type AdminFaqTranslation = {
  locale: string;
  question: string;
  answer: string;
};

export type AdminFaqItemRow = {
  id: string;
  question: string;
  answer: string;
  sortOrder: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  translations: AdminFaqTranslation[];
};

/** List all FAQ items for admin (including unpublished). */
export async function listAdminFaqItems(): Promise<AdminFaqItemRow[]> {
  const rows = await getPrisma().faqItem.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    select: {
      id: true,
      question: true,
      answer: true,
      sortOrder: true,
      published: true,
      createdAt: true,
      updatedAt: true,
      translations: {
        select: {
          locale: true,
          question: true,
          answer: true,
        },
      },
    },
  });

  return rows.map((row) => ({
    id: row.id,
    question: row.question,
    answer: row.answer,
    sortOrder: row.sortOrder,
    published: row.published,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    translations: row.translations,
  }));
}
