import { Plus } from "lucide-react";

import Button from "@/components/ui/Button";

export default function InventoryHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Inventory
        </h1>

        <p className="mt-2 text-slate-500">
          Manage products, monitor stock levels, and organize your inventory.
        </p>
      </div>

      <Button className="h-12 px-6">
        <Plus className="mr-2 h-5 w-5" />
        Add Product
      </Button>
    </div>
  );
}