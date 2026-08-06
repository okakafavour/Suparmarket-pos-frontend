import {
  Users,
  UserCheck,
  Wallet,
  Award,
} from "lucide-react";

import { useCustomerDashboard } from "@/queries/useCustomerDashboard";

export default function CustomersStats() {
  const {
    data,
    isLoading,
  } = useCustomerDashboard();

  const stats = [
    {
      title: "Total Customers",
      value: data?.total_customers ?? 0,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-100 dark:bg-blue-500/20",
    },
    {
      title: "Active Customers",
      value: data?.active_customers ?? 0,
      icon: UserCheck,
      color: "text-emerald-600",
      bg: "bg-emerald-100 dark:bg-emerald-500/20",
    },
    {
      title: "Customer Revenue",
      value: `₦${(
        data?.total_revenue ?? 0
      ).toLocaleString()}`,
      icon: Wallet,
      color: "text-violet-600",
      bg: "bg-violet-100 dark:bg-violet-500/20",
    },
    {
      title: "Loyalty Members",
      value: data?.loyalty_members ?? 0,
      icon: Award,
      color: "text-orange-600",
      bg: "bg-orange-100 dark:bg-orange-500/20",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-[30px] bg-[color:var(--surface)]"
          />
        ))}
      </div>
    );
  }

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