import { getPrisma } from "@/server/lib/db";
import type { UpdateContactFieldsInput } from "@/server/features/contact/contact-fields.schema";

export async function listAdminContactFields() {
  return getPrisma().contactFieldSetting.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

export async function replaceContactFields(input: UpdateContactFieldsInput) {
  const prisma = getPrisma();
  await prisma.$transaction(
    input.fields.map((field) =>
      prisma.contactFieldSetting.upsert({
        where: { fieldKey: field.fieldKey },
        create: field,
        update: {
          label: field.label,
          placeholder: field.placeholder,
          mode: field.mode,
          sortOrder: field.sortOrder,
        },
      }),
    ),
  );
  return listAdminContactFields();
}
