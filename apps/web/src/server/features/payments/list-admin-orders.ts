import { getPrisma } from "@/server/lib/db";

export type AdminPaymentRow = {
  id: string;
  provider: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type AdminOrderRow = {
  id: string;
  amount: string;
  currency: string;
  status: string;
  provider: string | null;
  providerRef: string | null;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  payments: AdminPaymentRow[];
};

/** List orders with payments for admin (newest first). */
export async function listAdminOrders(): Promise<AdminOrderRow[]> {
  const rows = await getPrisma().order.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
    select: {
      id: true,
      amount: true,
      currency: true,
      status: true,
      provider: true,
      providerRef: true,
      description: true,
      createdAt: true,
      updatedAt: true,
      payments: {
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          provider: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  return rows.map((row) => ({
    id: row.id,
    amount: row.amount.toString(),
    currency: row.currency,
    status: row.status,
    provider: row.provider,
    providerRef: row.providerRef,
    description: row.description,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    payments: row.payments.map((payment) => ({
      id: payment.id,
      provider: payment.provider,
      status: payment.status,
      createdAt: payment.createdAt.toISOString(),
      updatedAt: payment.updatedAt.toISOString(),
    })),
  }));
}
