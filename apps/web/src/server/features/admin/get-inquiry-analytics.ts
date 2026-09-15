import { contactServiceLabel } from "@/features/contact/content/contactFieldConfig";
import { getPrisma } from "@/server/lib/db";

const MS_PER_DAY = 86_400_000;
const ANALYTICS_WINDOW_DAYS_SHORT = 7;
const ANALYTICS_WINDOW_DAYS_LONG = 30;

export type ServiceRequestCount = {
  readonly service: string;
  readonly label: string;
  readonly count: number;
};

export type InquiryAnalytics = {
  readonly total: number;
  readonly last7Days: number;
  readonly last30Days: number;
  readonly byService: readonly ServiceRequestCount[];
};

type InquiryRow = {
  readonly services: readonly string[];
  readonly createdAt: Date;
};

function countSince(rows: readonly InquiryRow[], days: number): number {
  const cutoff = Date.now() - days * MS_PER_DAY;
  return rows.filter((row) => row.createdAt.getTime() >= cutoff).length;
}

function countByService(rows: readonly InquiryRow[]): ServiceRequestCount[] {
  const counts = new Map<string, number>();
  for (const row of rows) {
    for (const service of row.services) {
      counts.set(service, (counts.get(service) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([service, count]) => ({
      service,
      label: contactServiceLabel(service),
      count,
    }))
    .sort((left, right) => right.count - left.count);
}

/** Contact-form request totals used by admin Analytics (not a GA clone). */
export async function getInquiryAnalytics(): Promise<InquiryAnalytics> {
  const rows = await getPrisma().contactInquiry.findMany({
    select: { services: true, createdAt: true },
  });

  return {
    total: rows.length,
    last7Days: countSince(rows, ANALYTICS_WINDOW_DAYS_SHORT),
    last30Days: countSince(rows, ANALYTICS_WINDOW_DAYS_LONG),
    byService: countByService(rows),
  };
}
