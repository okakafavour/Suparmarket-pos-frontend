import { AlertTriangle, Package2 } from "lucide-react";

import { useLowStockProducts } from "@/queries/useDashboard";

export default function LowStock() {
  const { data = [], isLoading } = useLowStockProducts();

  return (
    <div className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <AlertTriangle className="text-orange-500" />

          <h2 className="text-xl font-bold text-[var(--text)]">
            Low Stock Products
          </h2>

        </div>

        <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-600">
          {data.length}
        </span>

      </div>

      {isLoading ? (

        <div className="space-y-3">

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-20 animate-pulse rounded-2xl bg-[var(--surface-hover)]"
            />
          ))}

        </div>

      ) : data.length === 0 ? (

        <div className="flex flex-col items-center justify-center py-12 text-center">

          <Package2
            size={48}
            className="mb-4 text-emerald-500"
          />

          <h3 className="text-lg font-semibold text-[var(--text)]">
            Inventory Healthy
          </h3>

          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            No products are currently running low.
          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {data.map((product) => (

            <div
              key={product.product_id}
              className="flex items-center justify-between rounded-2xl border border-[var(--border)] p-4 transition hover:bg-[var(--surface-hover)]"
            >

              <div>

                <h3 className="font-semibold text-[var(--text)]">
                  {product.product_name}
                </h3>

                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  Category: {product.category || "N/A"}
                </p>

                <p className="text-sm text-[var(--text-secondary)]">
                  Supplier: {product.supplier || "N/A"}
                </p>

              </div>

              <div className="text-right">

                <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
                  {product.quantity} Left
                </span>

                <p className="mt-2 text-xs text-[var(--text-secondary)]">
                  Minimum: {product.minimum_stock}
                </p>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}