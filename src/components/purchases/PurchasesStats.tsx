import {
  ShoppingCart,
  CheckCircle,
  Clock3,
  DollarSign,
} from "lucide-react";

import { usePurchases } from "@/queries/usePurchases";

export default function PurchasesStats() {
  const { data } = usePurchases({
    page: 1,
    limit: 500,
  });

  const purchases =
  data?.data ?? [];

  const total = purchases.length;

  const pending = purchases.filter(
    (p) => p.status === "pending"
  ).length;

  const received = purchases.filter(
    (p) => p.status === "received"
  ).length;

  const amount = purchases.reduce(
    (sum, p) => sum + p.total_amount,
    0
  );

  const cards = [
    {
      title: "Total Purchases",
      value: total,
      icon: ShoppingCart,
    },
    {
      title: "Pending",
      value: pending,
      icon: Clock3,
    },
    {
      title: "Received",
      value: received,
      icon: CheckCircle,
    },
    {
      title: "Purchase Value",
      value: `₦${amount.toLocaleString()}`,
      icon: DollarSign,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6"
        >
          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-[color:var(--text-muted)]">
                {card.title}
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {card.value}
              </h2>

            </div>

            <card.icon className="text-blue-600" />

          </div>
        </div>
      ))}

    </div>
  );
}