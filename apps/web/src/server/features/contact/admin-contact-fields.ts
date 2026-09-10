import { getPrisma } from "@/server/lib/db";
import type { UpdateContactFieldsInput } from "@/server/features/contact/contact-fields.schema";
import { QUOTE_CONTACT_FIELD_KEYS } from "@/features/contact/content/contactFieldConfig";

const QUOTE_FIELD_KEY_LIST: string[] = [...QUOTE_CONTACT_FIELD_KEYS];

async function pruneLegacyContactFields() {
  await getPrisma().contactFieldSetting.deleteMany({
    where: { fieldKey: { notIn: QUOTE_FIELD_KEY_LIST } },
  });
}

export async function listAdminContactFields() {
  await pruneLegacyContactFields();
  return getPrisma().contactFieldSetting.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

export async function replaceContactFields(input: UpdateContactFieldsInput) {
  const prisma = getPrisma();
  await prisma.$transaction([
    ...input.fields.map((field) =>
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
    prisma.contactFieldSetting.deleteMany({
      where: { fieldKey: { notIn: input.fields.map((field) => field.fieldKey) } },
    }),
  ]);
  return listAdminContactFields();
}
