import { getPrisma } from "@/server/lib/db";

export type AdminContactInquiryRow = {
  id: string;
  name: string;
  email: string;
  propertyAddress: string;
  service: string;
  preferredDate: string | null;
  projectDetails: string | null;
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
  propertyAddress: string;
  service: string;
  preferredDate: Date | null;
  projectDetails: string | null;
  createdAt: Date;
}): AdminContactInquiryRow {
  return {
    id: inquiry.id,
    name: inquiry.name,
    email: inquiry.email,
    propertyAddress: inquiry.propertyAddress,
    service: inquiry.service,
    preferredDate: inquiry.preferredDate
      ? inquiry.preferredDate.toISOString().slice(0, 10)
      : null,
    projectDetails: inquiry.projectDetails,
    createdAt: inquiry.createdAt.toISOString(),
  };
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
      propertyAddress: true,
      service: true,
      preferredDate: true,
      projectDetails: true,
      createdAt: true,
    },
  });

  return rows.map(toRow);
}
