import {
  DollarSign,
  Package,
  ShoppingCart,
  TriangleAlert,
  ArrowUpRight,
} from "lucide-react";

const stats = [
  {
    title: "Today's Sales",
    value: "$24,580",
    growth: "+12.5%",
    icon: DollarSign,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Products",
    value: "2,481",
    growth: "+38",
    icon: Package,
    color: "bg-violet-100 text-violet-600",
  },
  {
    title: "Orders",
    value: "384",
    growth: "+8.2%",
    icon: ShoppingCart,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "Low Stock",
    value: "18",
    growth: "-4",
    icon: TriangleAlert,
    color: "bg-orange-100 text-orange-600",
  },
];

export default function KPISection() {
  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="
              group
              relative
              overflow-hidden
              rounded-[28px]
              border
              border-slate-200
              bg-white
              p-6
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-2
              hover:shadow-xl
            "
          >
            {/* Background Glow */}
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-50 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative z-10 flex items-center justify-between">

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.color}`}
              >
                <Icon size={26} />
              </div>

              <div className="flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">

                <ArrowUpRight size={15} />

                {item.growth}

              </div>

            </div>

            <div className="relative z-10 mt-8">

              <p className="text-sm font-medium text-slate-500">
                {item.title}
              </p>

              <h2 className="mt-2 text-4xl font-bold tracking-tight">
                {item.value}
              </h2>

              <p className="mt-3 text-sm text-slate-400">
                Updated just now
              </p>

            </div>

          </div>
        );
      })}
    </section>
  );
}