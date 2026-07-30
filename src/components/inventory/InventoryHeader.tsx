import { useState } from "react";
import { Plus } from "lucide-react";

import CreateProductModal from "./CreateProductModal";

export default function InventoryHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            Inventory
          </h1>

          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Manage products, stock levels and suppliers.
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-blue-600
            px-5
            py-3
            font-medium
            text-white
            transition-all
            hover:bg-blue-700
          "
        >
          <Plus size={18} />

          Add Product
        </button>

      </div>

      <CreateProductModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}