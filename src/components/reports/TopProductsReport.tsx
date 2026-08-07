import { Trophy } from "lucide-react";

import type { TopProductReport } from "@/types/reports";

interface Props {
  products: TopProductReport[];
}

export default function TopProductsReport({
  products,
}: Props) {
  return (
    <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)]">
      <div className="flex items-center gap-3 border-b border-[color:var(--border)] p-6">
        <div className="rounded-xl bg-yellow-100 p-3 text-yellow-600 dark:bg-yellow-950/40 dark:text-yellow-400">
          <Trophy size={20} />
        </div>

        <div>
          <h2 className="font-semibold">Top Selling Products</h2>

          <p className="mt-1 text-sm text-[color:var(--text-muted)]">
            Products generating the most sales.
          </p>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="p-8 text-center text-sm text-[color:var(--text-muted)]">
          No sales data available.
        </div>
      ) : (
        <div className="divide-y divide-[color:var(--border)]">
          {products.slice(0, 5).map((product, index) => (
            <div
              key={product.product_id}
              className="flex items-center justify-between gap-4 px-6 py-5"
            >
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[color:var(--surface-hover)] text-sm font-bold">
                  {index + 1}
                </div>

                <div className="min-w-0">
                  <p className="truncate font-medium">
                    {product.product_name}
                  </p>

                  <p className="mt-1 text-xs text-[color:var(--text-muted)]">
                    {product.quantity_sold.toLocaleString()} units sold
                  </p>
                </div>
              </div>

              <p className="shrink-0 font-semibold">
                ₦{product.revenue.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}