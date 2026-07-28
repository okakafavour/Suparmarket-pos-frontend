interface StockBadgeProps {
  quantity: number;
}

export default function StockBadge({
  quantity,
}: StockBadgeProps) {
  if (quantity === 0) {
    return (
      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
        Out of Stock
      </span>
    );
  }

  if (quantity <= 10) {
    return (
      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
        Low Stock
      </span>
    );
  }

  return (
    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
      In Stock
    </span>
  );
}