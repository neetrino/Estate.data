import { z } from "zod";
import { getPrisma } from "@/server/lib/db";

export const updateSiteCopySchema = z.object({
  items: z
    .array(
      z.object({
        key: z.string().trim().min(1).max(120),
        value: z.string().max(20000),
      }),
    )
    .min(1)
    .max(80),
});

export async function listAdminSiteCopy() {
  return getPrisma().siteCopy.findMany({
    orderBy: { key: "asc" },
  });
}

export async function replaceSiteCopy(items: { key: string; value: string }[]) {
  const prisma = getPrisma();
  await prisma.$transaction(
    items.map((item) =>
      prisma.siteCopy.upsert({
        where: { key: item.key },
        create: item,
        update: { value: item.value },
      }),
    ),
  );
  return listAdminSiteCopy();
}
