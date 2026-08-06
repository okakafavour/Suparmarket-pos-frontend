import { AlertTriangle, X } from "lucide-react";

import { useDeletePurchase } from "@/queries/usePurchases";

import type { Purchase } from "@/types/purchase";

interface Props {
  open: boolean;
  purchase: Purchase | null;
  onClose: () => void;
}

export default function DeletePurchaseDialog({
  open,
  purchase,
  onClose,
}: Props) {
  const deletePurchase = useDeletePurchase();

  if (!open || !purchase) return null;

  async function handleDelete() {
  if (!purchase) return;

  const purchaseId = purchase.id;

  await deletePurchase.mutateAsync(purchaseId);

  onClose();
}

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/50"
      />

      <div className="fixed left-1/2 top-1/2 z-[60] w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-[color:var(--surface)] p-8 shadow-2xl">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-red-100 p-3">
              <AlertTriangle className="text-red-600"/>
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Delete Purchase
              </h2>

              <p className="text-sm text-[color:var(--text-muted)]">
                This action cannot be undone.
              </p>
            </div>
          </div>

          <button onClick={onClose}>
            <X/>
          </button>

        </div>

        <p className="mt-8">
          Delete purchase
          <strong> {purchase.invoice_number}</strong>?
        </p>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-xl border px-5 py-3"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={deletePurchase.isPending}
            className="rounded-xl bg-red-600 px-5 py-3 text-white"
          >
            {deletePurchase.isPending
              ? "Deleting..."
              : "Delete"}
          </button>

        </div>

      </div>
    </>
  );
}