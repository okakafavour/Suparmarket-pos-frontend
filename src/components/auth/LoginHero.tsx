import {
  ShieldCheck,
  Package,
  ShoppingCart,
  BarChart3,
} from "lucide-react";
import GroceryIllustration from "@/assets/illustrations/shopping-cart.jpeg";
const features = [
  {
    icon: Package,
    title: "Inventory Control",
    description: "Track every product with confidence.",
  },
  {
    icon: ShoppingCart,
    title: "Fast Checkout",
    description: "Serve customers quickly and accurately.",
  },
  {
    icon: BarChart3,
    title: "Smart Reports",
    description: "Make better decisions with live analytics.",
  },
];

export default function LoginHero() {
  return (
    <section className="relative hidden overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 lg:flex lg:flex-col lg:justify-between">

      {/* Background Glow */}
      <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="relative z-10 flex h-full flex-col justify-between p-14">

        {/* Logo */}
        <div>
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 shadow-xl shadow-blue-500/30">
              <ShieldCheck className="h-7 w-7 text-white" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white">
                TheftGuard
              </h1>

              <p className="text-blue-200">
                Smart Retail POS
              </p>
            </div>
          </div>

          <h2 className="mt-16 max-w-xl text-5xl font-bold leading-tight text-white">
            Everything your supermarket needs in one place.
          </h2>

          <p className="mt-6 max-w-lg text-lg leading-8 text-slate-300">
            Manage inventory, monitor sales, track suppliers,
            analyze reports, and grow your business with a
            modern POS platform built for retailers.
          </p>
        </div>

        {/* Illustration Section */}

          <div className="relative my-14 flex justify-center">

            {/* Decorative Glow */}

            <div className="absolute h-80 w-80 rounded-full bg-blue-500/20 blur-[100px]" />

            {/* Image Container */}

            <div className="relative z-10">

              <div className="rounded-[32px] bg-white p-8 shadow-[0_35px_80px_rgba(0,0,0,0.35)] ring-1 ring-white/10 transition duration-500 hover:-translate-y-2">

                <img
                  src={GroceryIllustration}
                  alt="Shopping Cart"
                  className="h-[340px] w-auto object-contain"
                />

              </div>

              {/* Sales Card */}

              <div className="absolute -left-10 top-8 rounded-2xl bg-white p-4 shadow-2xl">

                <p className="text-xs font-medium text-slate-500">
                  Today's Sales
                </p>

                <h3 className="mt-1 text-xl font-bold text-emerald-600">
                  +24%
                </h3>

              </div>

              {/* Inventory Card */}

              <div className="absolute -right-10 bottom-12 rounded-2xl bg-white p-4 shadow-2xl">

                <p className="text-xs font-medium text-slate-500">
                  Inventory
                </p>

                <h3 className="mt-1 text-xl font-bold text-slate-900">
                  1,248 Items
                </h3>

              </div>

              {/* Orders Card */}

              <div className="absolute left-1/2 top-full mt-5 -translate-x-1/2 rounded-2xl bg-blue-600 px-5 py-3 text-white shadow-xl">

                <p className="text-xs text-blue-100">
                  Orders Today
                </p>

                <h3 className="text-lg font-bold">
                  156 Orders
                </h3>

              </div>

            </div>

          </div>
        {/* Features */}
        <div className="grid grid-cols-3 gap-5">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-blue-400/40"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/20">
                  <Icon className="h-6 w-6 text-blue-400" />
                </div>

                <h3 className="font-semibold text-white">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {feature.description}
                </p>
              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}