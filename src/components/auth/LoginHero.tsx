import {
  ShoppingCart,
  Package,
  DollarSign,
  TriangleAlert,
  ShieldCheck,
} from "lucide-react";

const stats = [
  {
    icon: ShoppingCart,
    title: "Daily Sales",
    value: "24K",
  },
  {
    icon: Package,
    title: "Products",
    value: "1,240",
  },
  {
    icon: DollarSign,
    title: "Revenue",
    value: "$42K",
  },
  {
    icon: TriangleAlert,
    title: "Low Stock",
    value: "12",
  },
];

export default function LoginHero() {
  return (
    <section className="relative hidden overflow-hidden lg:flex flex-col justify-between bg-slate-950 p-14 text-white">

      {/* Background Glow */}

      <div className="absolute -top-32 -left-20 h-80 w-80 rounded-full bg-blue-600/20 blur-[120px]" />

      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />

      {/* Content */}

      <div className="relative z-10">

        <div className="mb-16 flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/30">
            <ShieldCheck size={28} />
          </div>

          <div>
            <h2 className="text-3xl font-bold">
              TheftGuard
            </h2>

            <p className="text-sm text-slate-400">
              Smart Retail POS
            </p>
          </div>

        </div>

        <h1 className="max-w-lg text-6xl font-bold leading-tight">
          Manage your supermarket
          <span className="text-blue-400"> smarter.</span>
        </h1>

        <p className="mt-8 max-w-md text-lg leading-8 text-slate-400">
          Inventory, sales, suppliers, reports and analytics
          in one modern platform built for growing businesses.
        </p>

      </div>

      {/* Statistics */}

      <div className="relative z-10 mt-20 grid grid-cols-2 gap-5">

        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/20">
                <Icon
                  size={22}
                  className="text-blue-400"
                />
              </div>

              <h3 className="text-3xl font-bold">
                {item.value}
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                {item.title}
              </p>
            </div>
          );
        })}
      </div>

      {/* Footer */}

      <p className="relative z-10 mt-14 text-sm text-slate-500">
        © 2026 TheftGuard POS
      </p>

    </section>
  );
}