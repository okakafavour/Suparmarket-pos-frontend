import { AlertTriangle } from "lucide-react";

import type { LowStockReport as LowStockItem } from "@/types/reports";

interface Props {
  products: LowStockItem[];
}

export default function LowStockReport({
  products,
}: Props) {
  return (
    <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)]">
      <div className="flex items-center gap-3 border-b border-[color:var(--border)] p-6">
        <div className="rounded-xl bg-red-100 p-3 text-red-600 dark:bg-red-950/40 dark:text-red-400">
          <AlertTriangle size={20} />
        </div>

        <div>
          <h2 className="font-semibold">Low Stock</h2>

          <p className="mt-1 text-sm text-[color:var(--text-muted)]">
            Products that need restocking.
          </p>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="p-8 text-center text-sm text-[color:var(--text-muted)]">
          All products have sufficient stock.
        </div>
      ) : (
        <div className="divide-y divide-[color:var(--border)]">
          {products.slice(0, 5).map((product) => (
            <div
              key={product.product_id}
              className="flex items-center justify-between gap-4 px-6 py-5"
            >
              <div className="min-w-0">
                <p className="truncate font-medium">
                  {product.product_name}
                </p>

                <p className="mt-1 text-xs text-[color:var(--text-muted)]">
                  Minimum stock: {product.minimum_stock}
                </p>
              </div>

              <span className="shrink-0 rounded-full bg-red-100 px-3 py-1.5 text-xs font-semibold text-red-700 dark:bg-red-950/40 dark:text-red-400">
                {product.quantity} left
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}