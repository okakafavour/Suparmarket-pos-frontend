import {
  BarChart3,
  DollarSign,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";

interface Props {
  totalSales: number;
  totalRevenue: number;
  todaySales: number;
  todayRevenue: number;
}

export default function ReportsHeader({
  totalSales,
  totalRevenue,
  todaySales,
  todayRevenue,
}: Props) {
  return (
    <div className="min-w-0 w-full">
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600/15 text-blue-500">
          <BarChart3 size={24} />
        </div>

        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight">
            Reports
          </h1>

          <p className="mt-1 text-sm text-[color:var(--text-muted)]">
            View sales, revenue, and business performance reports.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total Sales */}
        <div className="min-w-0 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 transition hover:shadow-[var(--shadow-md)]">
          <div className="flex min-w-0 items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm text-[color:var(--text-muted)]">
                Total Sales
              </p>

              <p className="mt-2 truncate text-2xl font-bold">
                {totalSales.toLocaleString()}
              </p>
            </div>

            <div className="shrink-0 rounded-xl bg-blue-100 p-3 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
              <ShoppingCart size={20} />
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="min-w-0 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 transition hover:shadow-[var(--shadow-md)]">
          <div className="flex min-w-0 items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm text-[color:var(--text-muted)]">
                Total Revenue
              </p>

              <p className="mt-2 truncate text-2xl font-bold">
                ₦{totalRevenue.toLocaleString()}
              </p>
            </div>

            <div className="shrink-0 rounded-xl bg-green-100 p-3 text-green-600 dark:bg-green-950/40 dark:text-green-400">
              <DollarSign size={20} />
            </div>
          </div>
        </div>

        {/* Today's Sales */}
        <div className="min-w-0 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 transition hover:shadow-[var(--shadow-md)]">
          <div className="flex min-w-0 items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm text-[color:var(--text-muted)]">
                Today's Sales
              </p>

              <p className="mt-2 truncate text-2xl font-bold">
                {todaySales.toLocaleString()}
              </p>
            </div>

            <div className="shrink-0 rounded-xl bg-purple-100 p-3 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400">
              <TrendingUp size={20} />
            </div>
          </div>
        </div>

        {/* Today's Revenue */}
        <div className="min-w-0 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 transition hover:shadow-[var(--shadow-md)]">
          <div className="flex min-w-0 items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm text-[color:var(--text-muted)]">
                Today's Revenue
              </p>

              <p className="mt-2 truncate text-2xl font-bold">
                ₦{todayRevenue.toLocaleString()}
              </p>
            </div>

            <div className="shrink-0 rounded-xl bg-yellow-100 p-3 text-yellow-600 dark:bg-yellow-950/40 dark:text-yellow-400">
              <DollarSign size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}