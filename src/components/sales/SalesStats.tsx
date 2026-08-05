import {
  ShoppingBag,
  Wallet,
  Receipt,
  TrendingUp,
} from "lucide-react";

import { useSalesDashboard } from "@/queries/useSalesDashboard";

export default function SalesStats() {
  const {
    data,
    isLoading,
    isError,
  } = useSalesDashboard();

  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-36 animate-pulse rounded-[30px] border border-[color:var(--border)] bg-[color:var(--surface)]"
          />
        ))}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-center text-red-600 dark:border-red-900 dark:bg-red-950/20">
        Failed to load sales dashboard.
      </div>
    );
  }

  const stats = [
    {
      title: "Today's Sales",
      value: data.todays_sales.toLocaleString(),
      icon: ShoppingBag,
      color: "text-blue-600",
      bg: "bg-blue-100 dark:bg-blue-500/20",
    },
    {
      title: "Today's Revenue",
      value: `₦${data.todays_revenue.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      icon: Wallet,
      color: "text-emerald-600",
      bg: "bg-emerald-100 dark:bg-emerald-500/20",
    },
    {
      title: "Total Sales",
      value: data.total_sales.toLocaleString(),
      icon: Receipt,
      color: "text-violet-600",
      bg: "bg-violet-100 dark:bg-violet-500/20",
    },
    {
      title: "Average Sale",
      value: `₦${data.average_sale.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      icon: TrendingUp,
      color: "text-orange-600",
      bg: "bg-orange-100 dark:bg-orange-500/20",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-[30px] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[color:var(--text-muted)]">
                  {item.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold text-[color:var(--text)]">
                  {item.value}
                </h2>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.bg}`}
              >
                <Icon
                  size={26}
                  className={item.color}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}