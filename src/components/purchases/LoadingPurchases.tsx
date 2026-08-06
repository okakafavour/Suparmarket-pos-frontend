import { Package } from "lucide-react";

export default function LoadingPurchases() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 w-56 animate-pulse rounded bg-[color:var(--surface-hover)]" />
          <div className="mt-2 h-4 w-80 animate-pulse rounded bg-[color:var(--surface-hover)]" />
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)]">
          <Package className="text-[color:var(--text-muted)]" size={24} />
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6"
          >
            <div className="h-4 w-24 animate-pulse rounded bg-[color:var(--surface-hover)]" />

            <div className="mt-5 h-8 w-20 animate-pulse rounded bg-[color:var(--surface-hover)]" />

            <div className="mt-6 h-10 w-10 animate-pulse rounded-2xl bg-[color:var(--surface-hover)]" />
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="h-12 flex-1 animate-pulse rounded-2xl bg-[color:var(--surface-hover)]" />

          <div className="h-12 w-44 animate-pulse rounded-2xl bg-[color:var(--surface-hover)]" />

          <div className="h-12 w-44 animate-pulse rounded-2xl bg-[color:var(--surface-hover)]" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)]">
        <div className="divide-y divide-[color:var(--border)]">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-7 gap-6 p-6"
            >
              {[...Array(7)].map((__, cell) => (
                <div
                  key={cell}
                  className="h-5 animate-pulse rounded bg-[color:var(--surface-hover)]"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}