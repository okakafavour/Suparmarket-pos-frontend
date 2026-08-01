export default function LoadingInventory() {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="animate-pulse">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="flex items-center gap-6 border-b border-slate-200 p-6 last:border-b-0 dark:border-slate-700"
          >
            {/* Product Icon */}
            <div className="h-12 w-12 rounded-2xl bg-slate-200 dark:bg-slate-700" />

            {/* Product Details */}
            <div className="flex-1">
              <div className="mb-3 h-4 w-56 rounded-lg bg-slate-200 dark:bg-slate-700" />

              <div className="h-3 w-32 rounded-lg bg-slate-200 dark:bg-slate-700" />
            </div>

            {/* SKU */}
            <div className="h-5 w-24 rounded-lg bg-slate-200 dark:bg-slate-700" />

            {/* Category */}
            <div className="h-5 w-24 rounded-lg bg-slate-200 dark:bg-slate-700" />

            {/* Stock */}
            <div className="h-5 w-20 rounded-lg bg-slate-200 dark:bg-slate-700" />
          </div>
        ))}
      </div>
    </div>
  );
}