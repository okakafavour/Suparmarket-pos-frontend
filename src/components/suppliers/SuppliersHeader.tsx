import { Truck } from "lucide-react";

export default function SuppliersHeader() {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

      <div>

        <div className="flex items-center gap-3">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-500/20">

            <Truck
              size={28}
              className="text-blue-600"
            />

          </div>

          <div>

            <h1 className="text-3xl font-bold text-[color:var(--text)]">
              Suppliers
            </h1>

            <p className="mt-1 text-[color:var(--text-muted)]">
              Manage suppliers and vendor information.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}