import type { ContactInquiryInput } from "@/server/features/contact/contact-inquiry.schema";
import { getPrisma } from "@/server/lib/db";

function parsePreferredDate(value: string | undefined): Date | null {
  const trimmed = value?.trim();
  if (!trimmed) {
    return null;
  }

  return new Date(`${trimmed}T00:00:00.000Z`);
}

function optionalText(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

/** Persist a validated contact inquiry. */
export async function createContactInquiry(input: ContactInquiryInput) {
  const extraFields = input.extraFields
    ? Object.fromEntries(
        Object.entries(input.extraFields).filter(([, value]) => Boolean(value?.trim())),
      )
    : {};

  return getPrisma().contactInquiry.create({
    data: {
      name: input.name ?? "",
      email: input.email ?? "",
      phone: optionalText(input.phone),
      company: optionalText(input.company),
      propertyAddress: optionalText(input.propertyAddress),
      service: input.service || "other",
      preferredDate: parsePreferredDate(input.preferredDate),
      projectDetails: optionalText(input.projectDetails),
      extraFields: Object.keys(extraFields).length > 0 ? extraFields : undefined,
    },
    select: {
      id: true,
      createdAt: true,
    },
  });
}
