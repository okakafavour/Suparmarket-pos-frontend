interface StockBadgeProps {
  quantity: number;
  minimumStock: number;
  isActive: boolean;
}

export default function StockBadge({
  quantity,
  minimumStock,
  isActive,
}: StockBadgeProps) {
  if (!isActive) {
    return (
      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-700 dark:text-slate-300">
        Inactive
      </span>
    );
  }

  if (quantity === 0) {
    return (
      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600 dark:bg-red-500/20 dark:text-red-400">
        Out of Stock
      </span>
    );
  }

  if (quantity <= minimumStock) {
    return (
      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-500/20 dark:text-amber-400">
        Low Stock
      </span>
    );
  }

  return (
    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400">
        Healthy
    </span>
  );
}