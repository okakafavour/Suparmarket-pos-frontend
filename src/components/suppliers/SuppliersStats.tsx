import {
  Truck,
  UserCheck,
  UserX,
  MapPinned,
} from "lucide-react";

import { useMemo } from "react";

import { useSuppliers } from "@/queries/useSupplier";

export default function SuppliersStats() {
  const { data } = useSuppliers({
    page: 1,
    limit: 1000,
    search: "",
    status: "",
    sort: "created_at",
  });

  const suppliers = data?.data ?? [];

  const stats = useMemo(() => {
    const active = suppliers.filter(
      (s) => s.is_active
    ).length;

    const inactive =
      suppliers.length - active;

    const countries = new Set(
      suppliers.map((s) => s.country)
    ).size;

    return [
      {
        title: "Total Suppliers",
        value: suppliers.length,
        icon: Truck,
        color: "text-blue-600",
        bg: "bg-blue-100 dark:bg-blue-500/20",
      },
      {
        title: "Active",
        value: active,
        icon: UserCheck,
        color: "text-green-600",
        bg: "bg-green-100 dark:bg-green-500/20",
      },
      {
        title: "Inactive",
        value: inactive,
        icon: UserX,
        color: "text-red-600",
        bg: "bg-red-100 dark:bg-red-500/20",
      },
      {
        title: "Countries",
        value: countries,
        icon: MapPinned,
        color: "text-violet-600",
        bg: "bg-violet-100 dark:bg-violet-500/20",
      },
    ];
  }, [suppliers]);

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