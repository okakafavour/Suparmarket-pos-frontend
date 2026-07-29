import { ShoppingBag } from "lucide-react";

import { useRecentSales } from "@/queries/useDashboard";

export default function RecentSales() {
  const { data = [], isLoading } = useRecentSales();

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-16 animate-pulse rounded-2xl bg-[var(--surface-hover)]"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-xl font-bold text-[var(--text)]">
          Recent Sales
        </h2>

        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Latest completed transactions
        </p>
      </div>

      {data.length === 0 ? (
        <div className="py-10 text-center text-[var(--text-secondary)]">
          No recent sales found.
        </div>
      ) : (
        <div className="space-y-4">

          {data.map((sale) => (

            <div
              key={sale.invoice_number}
              className="flex items-center justify-between rounded-2xl p-3 transition hover:bg-[var(--surface-hover)]"
            >

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30">

                  <ShoppingBag className="text-blue-600" />

                </div>

                <div>

                  <p className="font-semibold text-[var(--text)]">
                    {sale.customer || "Walk-in Customer"}
                  </p>

                  <p className="text-sm text-[var(--text-secondary)]">
                    {sale.invoice_number}
                  </p>

                </div>

              </div>

              <div className="text-right">

                <h3 className="font-bold text-[var(--text)]">
                  ${sale.amount.toLocaleString()}
                </h3>

                <p className="text-xs capitalize text-[var(--text-secondary)]">
                  {sale.payment_method}
                </p>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}