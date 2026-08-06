import { X } from "lucide-react";

import type { Purchase } from "@/types/purchase";

interface Props {
  open: boolean;
  purchase: Purchase | null;
  onClose: () => void;
}

export default function PurchaseDetailsDialog({
  open,
  purchase,
  onClose,
}: Props) {
  if (!open || !purchase) return null;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/50"
      />

      <div className="fixed left-1/2 top-1/2 z-[60] max-h-[90vh] w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl bg-[color:var(--surface)] p-8">

        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-2xl font-bold">
              {purchase.invoice_number}
            </h2>

            <p className="text-sm text-[color:var(--text-muted)]">
              Purchase Details
            </p>
          </div>

          <button onClick={onClose}>
            <X/>
          </button>

        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">

          <div>
            <p className="text-sm text-[color:var(--text-muted)]">
              Supplier
            </p>

            <h3 className="font-semibold">
              {purchase.supplier?.name}
            </h3>
          </div>

          <div>
            <p className="text-sm text-[color:var(--text-muted)]">
              Total
            </p>

            <h3 className="font-semibold">
              ₦{purchase.total_amount.toLocaleString()}
            </h3>
          </div>

        </div>

        <div className="mt-8">

          <h3 className="mb-4 text-lg font-semibold">
            Items
          </h3>

          <div className="space-y-3">

            {purchase.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-2xl border p-4"
              >
                <div>
                  <h4 className="font-semibold">
                    {item.product?.Name}
                  </h4>

                  <p className="text-sm text-[color:var(--text-muted)]">
                    Qty: {item.quantity}
                  </p>
                </div>

                <div className="font-semibold">
                  ₦{item.subtotal.toLocaleString()}
                </div>

              </div>
            ))}

          </div>

        </div>

      </div>
    </>
  );
}