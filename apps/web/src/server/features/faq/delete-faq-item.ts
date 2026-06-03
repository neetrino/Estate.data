import { ApiError } from "@/server/lib/api-error";
import { getPrisma } from "@/server/lib/db";

/** Delete FAQ item; translations cascade via Prisma. */
export async function deleteFaqItem(id: string): Promise<void> {
  const existing = await getPrisma().faqItem.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!existing) {
    throw ApiError.notFound("FAQ item not found");
  }

  await getPrisma().faqItem.delete({ where: { id } });
}
