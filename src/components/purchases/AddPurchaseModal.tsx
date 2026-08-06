import { useState } from "react";
import { X } from "lucide-react";

import PurchaseForm from "./PurchaseForm";

import { useProducts } from "@/queries/useProducts";
import { useSuppliers } from "@/queries/useSupplier";
import { useCreatePurchase } from "@/queries/usePurchases";

import type { CreatePurchaseItem } from "@/types/purchase";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AddPurchaseDialog({
  open,
  onClose,
}: Props) {
  const createPurchase = useCreatePurchase();

  const { data: suppliersData } = useSuppliers({
    page: 1,
    limit: 100,
  });

  const { data: productsData } = useProducts({
    page: 1,
    limit: 100,
  });

  const suppliers = suppliersData?.data ?? [];
  const products = productsData?.products ?? [];

  const [supplierId, setSupplierId] = useState("");

  const [items, setItems] = useState<CreatePurchaseItem[]>([
  {
    product_id: "",
    quantity: 1,
    unit_cost: 0,
  },
]);
  if (!open) return null;

  async function handleSubmit() {
    if (!supplierId) return;

    await createPurchase.mutateAsync({
      supplier_id: supplierId,
      items,
    });

    setSupplierId("");

    setItems([
      {
        product_id: "",
        quantity: 1,
        unit_cost: 0,
      },
    ]);

    onClose();
  }

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/50"
        onClick={onClose}
      />

      <div className="fixed left-1/2 top-1/2 z-[60] max-h-[90vh] w-full max-w-5xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[30px] bg-[color:var(--surface)] p-8 shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold">
              New Purchase
            </h2>

            <p className="text-sm text-[color:var(--text-muted)]">
              Create a supplier purchase order.
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 hover:bg-[color:var(--surface-hover)]"
          >
            <X />
          </button>

        </div>

        {/* Form */}

        <div className="mt-8">

          <PurchaseForm
            suppliers={suppliers}
            products={products}
            supplierId={supplierId}
            setSupplierId={setSupplierId}
            items={items}
            setItems={setItems}
          />

        </div>

        {/* Footer */}

        <div className="mt-10 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-xl border px-6 py-3"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={createPurchase.isPending}
            className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {createPurchase.isPending
              ? "Creating..."
              : "Create Purchase"}
          </button>

        </div>

      </div>
    </>
  );
}