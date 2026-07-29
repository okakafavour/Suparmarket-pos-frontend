import {
  Package,
  ShoppingCart,
  RotateCcw,
  ArrowUpDown,
  Loader2,
} from "lucide-react";

import { useInventoryLogs } from "@/queries/useInventoryLogs";

function getIcon(type: string) {
  switch (type?.toLowerCase()) {
    case "sale":
      return ShoppingCart;

    case "restock":
      return Package;

    case "adjustment":
      return ArrowUpDown;

    case "return":
      return RotateCcw;

    default:
      return Package;
  }
}

function getColor(type: string) {
  switch (type?.toLowerCase()) {
    case "sale":
      return "bg-red-100 text-red-600";

    case "restock":
      return "bg-emerald-100 text-emerald-600";

    case "adjustment":
      return "bg-blue-100 text-blue-600";

    case "return":
      return "bg-violet-100 text-violet-600";

    default:
      return "bg-slate-100 text-slate-600";
  }
}

export default function ActivityTimeline() {
  const {
    data: logs = [],
    isLoading,
  } = useInventoryLogs();

  return (
    <div className="rounded-[28px] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-sm transition-colors duration-300">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-[color:var(--text)]">
          Recent Activity
        </h2>

        <span className="rounded-full bg-[color:var(--surface-secondary)] px-3 py-1 text-xs font-semibold text-[color:var(--text-secondary)]">
          Live
        </span>
      </div>

      {isLoading ? (
        <div className="flex h-56 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : logs.length === 0 ? (
        <div className="flex h-56 items-center justify-center text-[color:var(--text-secondary)]">
          No recent activity.
        </div>
      ) : (
        <div className="space-y-5">
          {logs.map((log: any) => {
            const Icon = getIcon(log.MovementType);

            return (
              <div
                key={log.ID}
                className="flex items-start gap-4 rounded-2xl p-3 transition-colors duration-300 hover:bg-[color:var(--surface-secondary)]"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${getColor(
                    log.MovementType
                  )}`}
                >
                  <Icon size={20} />
                </div>

                <div className="flex-1">
                  <h4 className="font-semibold text-[color:var(--text)]">
                    {log.Product?.Name}
                  </h4>

                  <p className="mt-1 text-sm text-[color:var(--text-secondary)]">
                    {log.MovementType} • {log.Quantity > 0 ? "+" : ""}
                    {log.Quantity} units
                  </p>

                  <p className="mt-1 text-xs text-[color:var(--text-muted)]">
                    {new Date(log.CreatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}