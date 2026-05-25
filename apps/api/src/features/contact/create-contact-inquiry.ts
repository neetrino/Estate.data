import type { ContactInquiryInput } from "@/features/contact/contact-inquiry.schema";
import { getPrisma } from "@/lib/db";

function parsePreferredDate(value: string | undefined): Date | null {
  const trimmed = value?.trim();
  if (!trimmed) {
    return null;
  }

  return new Date(`${trimmed}T00:00:00.000Z`);
}

/** Persist a validated contact inquiry. */
export async function createContactInquiry(input: ContactInquiryInput) {
  const projectDetails = input.projectDetails?.trim();

  return getPrisma().contactInquiry.create({
    data: {
      name: input.name,
      email: input.email,
      propertyAddress: input.propertyAddress,
      service: input.service,
      preferredDate: parsePreferredDate(input.preferredDate),
      projectDetails: projectDetails ? projectDetails : null,
    },
    select: {
      id: true,
      createdAt: true,
    },
  });
}
