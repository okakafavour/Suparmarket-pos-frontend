import {
  DollarSign,
  Package,
  ShoppingCart,
  TriangleAlert,
} from "lucide-react";

import { useDashboardSummary } from "@/queries/useDashboard";

export default function KPISection() {
  const { data, isLoading } = useDashboardSummary();

  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="
              h-44
              animate-pulse
              rounded-3xl
              border
              border-[color:var(--border)]
              bg-[color:var(--surface)]
            "
          />
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: "Today's Revenue",
      value: `$${(data?.today_revenue ?? 0).toLocaleString()}`,
      subtitle: "Revenue today",
      icon: DollarSign,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Products",
      value: (data?.total_products ?? 0).toLocaleString(),
      subtitle: "Products in inventory",
      icon: Package,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Sales",
      value: (data?.today_sales ?? 0).toLocaleString(),
      subtitle: "Sales completed today",
      icon: ShoppingCart,
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      title: "Low Stock",
      value: (data?.low_stock_products ?? 0).toLocaleString(),
      subtitle: "Need restocking",
      icon: TriangleAlert,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
              rounded-[28px]
              border
              border-[color:var(--border)]
              bg-[color:var(--surface)]
              p-6
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-lg
            "
          >
            <div className="flex items-center justify-between">
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${card.color}`}
              >
                <Icon size={26} />
              </div>
            </div>

            <div className="mt-8">
              <p className="text-sm text-[color:var(--text-muted)]">
                {card.title}
              </p>

              <h2 className="mt-2 text-4xl font-bold text-[color:var(--text)]">
                {card.value}
              </h2>

              <p className="mt-3 text-sm text-[color:var(--text-muted)]">
                {card.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}