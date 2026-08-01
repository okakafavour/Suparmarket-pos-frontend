import {
  Package,
  CheckCircle2,
  FolderOpen,
  AlertTriangle,
} from "lucide-react";

import { useProducts } from "@/queries/useProducts";
import { useCategories } from "@/queries/useCategories";

export default function ProductsStats() {
  const { data, isLoading } = useProducts({
    page: 1,
    limit: 1000,
  });

  const { data: categories } = useCategories();

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="animate-pulse rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900"
          >
            <div className="mb-5 h-4 w-32 rounded bg-slate-200 dark:bg-slate-700" />

            <div className="h-10 w-20 rounded bg-slate-200 dark:bg-slate-700" />
          </div>
        ))}
      </div>
    );
  }

  const products = data?.products ?? [];

  const totalProducts = products.length;

  const activeProducts = products.filter(
    (product) => product.IsActive
  ).length;

  const lowStock = products.filter(
    (product) =>
      product.Quantity <= product.MinimumStock
  ).length;

  const totalCategories = categories?.length ?? 0;

  const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: Package,
      iconColor: "text-blue-600",
      bg: "bg-blue-100 dark:bg-blue-500/20",
    },
    {
      title: "Active Products",
      value: activeProducts,
      icon: CheckCircle2,
      iconColor: "text-emerald-600",
      bg: "bg-emerald-100 dark:bg-emerald-500/20",
    },
    {
      title: "Categories",
      value: totalCategories,
      icon: FolderOpen,
      iconColor: "text-violet-600",
      bg: "bg-violet-100 dark:bg-violet-500/20",
    },
    {
      title: "Low Stock",
      value: lowStock,
      icon: AlertTriangle,
      iconColor: "text-orange-600",
      bg: "bg-orange-100 dark:bg-orange-500/20",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-6
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-lg
              dark:border-slate-700
              dark:bg-slate-900
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {item.title}
                </p>

                <h2 className="mt-3 text-4xl font-bold text-slate-900 dark:text-white">
                  {item.value.toLocaleString()}
                </h2>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.bg}`}
              >
                <Icon
                  size={28}
                  className={item.iconColor}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}