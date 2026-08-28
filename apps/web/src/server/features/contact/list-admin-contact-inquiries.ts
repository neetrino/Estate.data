import { getPrisma } from "@/server/lib/db";

export type AdminContactInquiryRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  propertyAddress: string | null;
  service: string;
  preferredDate: string | null;
  projectDetails: string | null;
  extraFields: Record<string, string> | null;
  createdAt: string;
};

export type ListAdminContactInquiriesInput = {
  limit?: number;
  page?: number;
  search?: string;
  service?: string;
};

function toRow(inquiry: {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  propertyAddress: string | null;
  service: string;
  preferredDate: Date | null;
  projectDetails: string | null;
  extraFields: unknown;
  createdAt: Date;
}): AdminContactInquiryRow {
  return {
    id: inquiry.id,
    name: inquiry.name,
    email: inquiry.email,
    phone: inquiry.phone,
    company: inquiry.company,
    propertyAddress: inquiry.propertyAddress,
    service: inquiry.service,
    preferredDate: inquiry.preferredDate
      ? inquiry.preferredDate.toISOString().slice(0, 10)
      : null,
    projectDetails: inquiry.projectDetails,
    extraFields: asStringRecord(inquiry.extraFields),
    createdAt: inquiry.createdAt.toISOString(),
  };
}

function asStringRecord(value: unknown): Record<string, string> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  const entries = Object.entries(value).filter(
    (entry): entry is [string, string] => typeof entry[1] === "string",
  );
  return entries.length > 0 ? Object.fromEntries(entries) : null;
}

/** List contact inquiries for admin (newest first). */
export async function listAdminContactInquiries(
  input: ListAdminContactInquiriesInput = {},
): Promise<AdminContactInquiryRow[]> {
  const limit = Math.min(Math.max(input.limit ?? 50, 1), 200);
  const page = Math.max(input.page ?? 1, 1);
  const skip = (page - 1) * limit;

  const search = input.search?.trim();
  const service = input.service?.trim();

  const where = {
    ...(service ? { service } : {}),
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { email: { contains: search, mode: "insensitive" as const } },
            { propertyAddress: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const rows = await getPrisma().contactInquiry.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: limit,
    skip,
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      company: true,
      propertyAddress: true,
      service: true,
      preferredDate: true,
      projectDetails: true,
      extraFields: true,
      createdAt: true,
    },
  });

  return rows.map(toRow);
}
