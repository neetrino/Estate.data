import { ApiError } from "@/server/lib/api-error";
import { getPrisma } from "@/server/lib/db";

/** Delete article; translations cascade via Prisma. */
export async function deleteArticle(id: string): Promise<void> {
  const existing = await getPrisma().article.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!existing) {
    throw ApiError.notFound("Article not found");
  }

  await getPrisma().article.delete({ where: { id } });
}
