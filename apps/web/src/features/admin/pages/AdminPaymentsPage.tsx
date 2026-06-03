"use client";

import { useAdminQuery } from "@/features/admin/hooks/useAdminQuery";
import { AdminBadge } from "@/features/admin/components/ui/AdminBadge";
import { AdminEmptyState } from "@/features/admin/components/ui/AdminEmptyState";
import { AdminErrorState } from "@/features/admin/components/ui/AdminErrorState";
import { AdminLoadingState } from "@/features/admin/components/ui/AdminLoadingState";
import { AdminPageHeader } from "@/features/admin/components/ui/AdminPageHeader";
import { AdminTable } from "@/features/admin/components/ui/AdminTable";
import { fetchAdminPaymentsOrders } from "@/features/admin/services/admin-api";
export function AdminPaymentsPage() {
  const { data, loading, error, reload } = useAdminQuery(fetchAdminPaymentsOrders, []);
  const orders = data ?? [];

  return (
    <>
      <AdminPageHeader
        title="Payments"
        description="Payment orders and provider callbacks (sandbox)."
      />

      {loading ? <AdminLoadingState /> : null}
      {error ? <AdminErrorState message={error} onRetry={reload} /> : null}

      {!loading && !error && orders.length === 0 ? (
        <AdminEmptyState
          title="No orders yet"
          message="Payments backend exists in sandbox mode. Orders will appear here after checkout init."
        />
      ) : null}

      {!loading && !error && orders.length > 0 ? (
        <AdminTable>
          <thead>
            <tr className="border-b border-foreground/10 text-xs tracking-wide text-muted-foreground uppercase">
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Provider</th>
              <th className="px-4 py-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-foreground/5">
                <td className="px-4 py-3">
                  <p className="font-medium text-brand-navy">{order.id}</p>
                  {order.description ? (
                    <p className="text-xs text-muted-foreground">{order.description}</p>
                  ) : null}
                </td>
                <td className="px-4 py-3">
                  {order.amount} {order.currency}
                </td>
                <td className="px-4 py-3">
                  <AdminBadge label={order.status} tone={order.status === "paid" ? "success" : "default"} />
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {order.provider ?? "—"}
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </AdminTable>
      ) : null}
    </>
  );
}
