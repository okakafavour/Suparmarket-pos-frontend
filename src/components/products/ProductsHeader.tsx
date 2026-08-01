import { Package2 } from "lucide-react";

export default function ProductsHeader() {
  return (
    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

      <div>

        <div className="flex items-center gap-3">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-500/20">

            <Package2
              size={28}
              className="text-blue-600"
            />

          </div>

          <div>

            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
              Products
            </h1>

            <p className="mt-1 text-slate-500 dark:text-slate-400">
              Manage every product available in your supermarket.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}