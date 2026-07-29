import {
  TrendingUp,
  MoreHorizontal,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useSalesChart } from "@/queries/useDashboard";

export default function SalesChartCard() {
  const { data = [], isLoading } = useSalesChart();

  const totalSales = data.reduce(
    (sum, item) => sum + item.sales,
    0
  );

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Sales Overview
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
            Weekly Sales
          </h2>
        </div>

        <button className="rounded-xl p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800">
          <MoreHorizontal className="h-5 w-5 text-slate-600 dark:text-slate-300" />
        </button>
      </div>

      {isLoading ? (
        <div className="h-64 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800" />
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />

              <Tooltip
                formatter={(value) => [
                  `${value} Sales`,
                  "Sales",
                ]}
              />

              <Bar
                dataKey="sales"
                radius={[8, 8, 0, 0]}
                fill="#2563eb"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="mt-8 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Total Sales (7 Days)
          </p>

          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
            {totalSales}
          </h3>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
          <TrendingUp className="h-4 w-4" />

          <span className="font-semibold">
            Live
          </span>
        </div>
      </div>
    </div>
  );
}