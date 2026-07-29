import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useRevenueChart } from "@/queries/useDashboard";

export default function RevenueChart() {
  const { data, isLoading } = useRevenueChart();

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-sm">
        <div className="mb-6">
          <div className="h-6 w-56 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
          <div className="mt-3 h-4 w-40 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
        </div>

        <div className="h-80 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-sm transition-colors">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[color:var(--text)]">
            Revenue Analytics
          </h2>

          <p className="text-sm text-[color:var(--text-muted)]">
            Monthly revenue performance
          </p>
        </div>

        <div className="rounded-xl bg-emerald-100 px-3 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
          Live
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data ?? []}>
            <defs>
              <linearGradient
                id="revenueGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#2563eb"
                  stopOpacity={0.35}
                />

                <stop
                  offset="95%"
                  stopColor="#2563eb"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#CBD5E1"
            />

            <XAxis
              dataKey="month"
              tick={{ fill: "#64748B" }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: "#64748B" }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              formatter={(value) => {
                const amount = Number(value ?? 0);

                return [
                  `$${amount.toLocaleString("en-US")}`,
                  "Revenue",
                ];
              }}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#2563eb"
              strokeWidth={3}
              fill="url(#revenueGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}