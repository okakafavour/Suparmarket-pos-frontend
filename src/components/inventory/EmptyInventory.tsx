import { PackageOpen } from "lucide-react";

import Button from "@/components/ui/Button";

export default function EmptyInventory() {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
        <PackageOpen className="h-10 w-10 text-blue-600" />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-slate-900">
        No Products Found
      </h2>

      <p className="mx-auto mt-3 max-w-md text-slate-500">
        Your inventory is empty. Start by adding your first product to begin
        managing stock.
      </p>

      <Button className="mt-8">
        Add First Product
      </Button>
    </div>
  );
}