import {
  DollarSign,
  Package,
  ShoppingCart,
  TriangleAlert,
} from "lucide-react";

import StatCard from "./StatCard";

export default function StatsGrid() {
  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Today's Sales"
        value="$24,580"
        change={18.2}
        subtitle="Compared to yesterday"
        icon={DollarSign}
        iconColor="text-blue-600"
        iconBg="bg-blue-100"
      />

      <StatCard
        title="Products"
        value="2,438"
        change={5.8}
        subtitle="Available in inventory"
        icon={Package}
        iconColor="text-violet-600"
        iconBg="bg-violet-100"
      />

      <StatCard
        title="Orders"
        value="684"
        change={12.4}
        subtitle="Completed today"
        icon={ShoppingCart}
        iconColor="text-emerald-600"
        iconBg="bg-emerald-100"
      />

      <StatCard
        title="Low Stock"
        value="18"
        change={-7.5}
        subtitle="Requires attention"
        icon={TriangleAlert}
        iconColor="text-orange-600"
        iconBg="bg-orange-100"
      />
    </section>
  );
}