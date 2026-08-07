import {
  CreditCard,
  CircleCheck,
  Clock3,
  Banknote,
} from "lucide-react";

import type { Payment } from "@/types/payment";

interface Props {
  payments: Payment[];
}

export default function PaymentStats({
  payments,
}: Props) {
  const total = payments.length;

  const paid = payments.filter(
    (payment) => payment.status === "paid"
  ).length;

  const pending = payments.filter(
    (payment) => payment.status === "pending"
  ).length;

  const revenue = payments
    .filter((payment) => payment.status === "paid")
    .reduce(
      (sum, payment) => sum + payment.amount,
      0
    );

  const stats = [
    {
      label: "Total Payments",
      value: total.toLocaleString(),
      icon: CreditCard,
    },
    {
      label: "Paid",
      value: paid.toLocaleString(),
      icon: CircleCheck,
    },
    {
      label: "Pending",
      value: pending.toLocaleString(),
      icon: Clock3,
    },
    {
      label: "Paid Amount",
      value: `₦${revenue.toLocaleString()}`,
      icon: Banknote,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[color:var(--text-muted)]">
                  {stat.label}
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {stat.value}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400">
                <Icon size={20} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}