import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  subtitle: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
}

export default function StatCard({
  title,
  value,
  change,
  subtitle,
  icon: Icon,
  iconColor,
  iconBg,
}: StatCardProps) {
  const positive = change >= 0;

  return (
    <div
      className="
      group
      rounded-3xl
      bg-white
      border
      border-slate-200
      p-6
      shadow-sm
      transition-all
      duration-300
      hover:-translate-y-2
      hover:shadow-2xl
      "
    >
      <div className="flex items-start justify-between">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${iconBg}`}
        >
          <Icon className={`h-7 w-7 ${iconColor}`} />
        </div>

        <div
          className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold ${
            positive
              ? "bg-emerald-100 text-emerald-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {positive ? (
            <ArrowUpRight className="h-4 w-4" />
          ) : (
            <ArrowDownRight className="h-4 w-4" />
          )}

          {Math.abs(change)}%
        </div>
      </div>

      <div className="mt-8">
        <p className="text-sm font-medium text-slate-500">{title}</p>

        <h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
          {value}
        </h2>

        <p className="mt-3 text-sm text-slate-400">{subtitle}</p>
      </div>
    </div>
  );
}