import {
  Package,
  CheckCircle2,
  AlertTriangle,
  Wallet,
} from "lucide-react";

import { useProducts } from "@/queries/useProducts";

export default function ProductsStats() {
  const { data, isLoading } = useProducts({
    page: 1,
    limit: 1000,
  });

  const products = data?.products ?? [];

  const totalProducts = products.length;

  const activeProducts = products.filter(
    (p) => p.IsActive
  ).length;

  const lowStockProducts = products.filter(
    (p) => p.Quantity <= p.MinimumStock
  ).length;

  const inventoryValue = products.reduce(
    (sum, p) => sum + p.CostPrice * p.Quantity,
    0
  );

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-40 animate-pulse rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)]"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <StatCard
        title="Total Products"
        value={totalProducts.toLocaleString()}
        subtitle="Products in catalog"
        icon={
          <Package
            size={26}
            className="text-blue-600"
          />
        }
        color="blue"
      />

      <StatCard
        title="Active Products"
        value={activeProducts.toLocaleString()}
        subtitle="Currently available"
        icon={
          <CheckCircle2
            size={26}
            className="text-emerald-600"
          />
        }
        color="green"
      />

      <StatCard
        title="Low Stock"
        value={lowStockProducts.toLocaleString()}
        subtitle="Needs restocking"
        icon={
          <AlertTriangle
            size={26}
            className="text-orange-500"
          />
        }
        color="orange"
      />

      <StatCard
        title="Inventory Value"
        value={`₦${inventoryValue.toLocaleString()}`}
        subtitle="Total stock value"
        icon={
          <Wallet
            size={26}
            className="text-violet-600"
          />
        }
        color="purple"
      />

    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  color: "blue" | "green" | "orange" | "purple";
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
  color,
}: StatCardProps) {
  const colors = {
    blue: "bg-blue-100 dark:bg-blue-500/15",
    green: "bg-emerald-100 dark:bg-emerald-500/15",
    orange: "bg-orange-100 dark:bg-orange-500/15",
    purple: "bg-violet-100 dark:bg-violet-500/15",
  };

  return (
    <div
      className="
        group
        rounded-[30px]
        border
        border-[color:var(--border)]
        bg-[color:var(--surface)]
        p-7
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm font-medium text-[color:var(--text-muted)]">
            {title}
          </p>

          <h2 className="mt-4 text-4xl font-bold text-[color:var(--text)]">
            {value}
          </h2>

          <p className="mt-3 text-sm text-[color:var(--text-muted)]">
            {subtitle}
          </p>

        </div>

        <div
          className={`flex h-16 w-16 items-center justify-center rounded-3xl ${colors[color]}`}
        >
          {icon}
        </div>

      </div>
    </div>
  );
}