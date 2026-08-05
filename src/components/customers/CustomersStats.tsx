import {
  Users,
  UserCheck,
  Wallet,
  Star,
} from "lucide-react";

import { useCustomers } from "@/queries/useCustomers";

export default function CustomersStats() {
  const { data: customers = [], isLoading } =
    useCustomers();

  const totalCustomers = customers.length;

  const activeCustomers = customers.filter(
    (customer) => customer.is_active
  ).length;

  const totalSpent = customers.reduce(
    (sum, customer) => sum + customer.total_spent,
    0
  );

  const loyaltyPoints = customers.reduce(
    (sum, customer) => sum + customer.loyalty_points,
    0
  );

  const stats = [
    {
      title: "Total Customers",
      value: totalCustomers,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-100 dark:bg-blue-500/20",
    },
    {
      title: "Active Customers",
      value: activeCustomers,
      icon: UserCheck,
      color: "text-emerald-600",
      bg: "bg-emerald-100 dark:bg-emerald-500/20",
    },
    {
      title: "Total Spending",
      value: `₦${totalSpent.toLocaleString()}`,
      icon: Wallet,
      color: "text-violet-600",
      bg: "bg-violet-100 dark:bg-violet-500/20",
    },
    {
      title: "Loyalty Points",
      value: loyaltyPoints.toLocaleString(),
      icon: Star,
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
                  {isLoading ? "..." : item.value}
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