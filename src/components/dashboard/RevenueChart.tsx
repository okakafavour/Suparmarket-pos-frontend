import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "Jan", revenue: 18000 },
  { month: "Feb", revenue: 21000 },
  { month: "Mar", revenue: 24000 },
  { month: "Apr", revenue: 22000 },
  { month: "May", revenue: 28000 },
  { month: "Jun", revenue: 26000 },
  { month: "Jul", revenue: 31000 },
  { month: "Aug", revenue: 34000 },
  { month: "Sep", revenue: 33000 },
  { month: "Oct", revenue: 37000 },
  { month: "Nov", revenue: 42000 },
  { month: "Dec", revenue: 46000 },
];

export default function RevenueChart() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Revenue Analytics
          </h2>

          <p className="text-sm text-slate-500">
            Monthly revenue performance
          </p>
        </div>

        <div className="rounded-xl bg-green-100 px-3 py-2 text-sm font-semibold text-green-700">
          +18%
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="sales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#2563eb"
              strokeWidth={4}
              fill="url(#sales)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}