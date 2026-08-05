import { ShoppingCart, TrendingUp } from "lucide-react";

export default function SalesHeader() {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

      <div>

        <div className="flex items-center gap-3">

          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-lg">
            <ShoppingCart size={28} />
          </div>

          <div>

            <h1 className="text-4xl font-bold text-[color:var(--text)]">
              Sales
            </h1>

            <p className="mt-1 text-[color:var(--text-muted)]">
              Manage transactions and monitor business performance.
            </p>

          </div>

        </div>

      </div>

      <div className="flex items-center gap-3 rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] px-6 py-4 shadow-sm">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-500/20">
          <TrendingUp
            size={22}
            className="text-emerald-600"
          />
        </div>

        <div>

          <p className="text-sm text-[color:var(--text-muted)]">
            Today's Revenue
          </p>

          <h3 className="text-2xl font-bold text-emerald-600">
            ₦0.00
          </h3>

        </div>

      </div>

    </div>
  );
}