import { ApiError } from "@/server/lib/api-error";
import { getPrisma } from "@/server/lib/db";

/** Hard-delete a contact inquiry by id (admin). */
export async function deleteContactInquiry(id: string): Promise<void> {
  const existing = await getPrisma().contactInquiry.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!existing) {
    throw ApiError.notFound("Contact inquiry not found");
  }

  await getPrisma().contactInquiry.delete({ where: { id } });
}
