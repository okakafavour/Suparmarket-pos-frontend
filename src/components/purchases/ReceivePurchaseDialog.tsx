import { PackageCheck, X } from "lucide-react";

import { useReceivePurchase } from "@/queries/usePurchases";

import type { Purchase } from "@/types/purchase";

interface Props {
  open: boolean;
  purchase: Purchase | null;
  onClose: () => void;
}

export default function ReceivePurchaseDialog({
  open,
  purchase,
  onClose,
}: Props) {
  const receivePurchase = useReceivePurchase();

  if (!open || !purchase) return null;

  async function handleReceive() {
  if (!purchase) return;

  try {
    await receivePurchase.mutateAsync(purchase.id);

    onClose();
  } catch (error) {
    console.error("Failed to receive purchase:", error);
  }
}

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/50"
      />

      <div className="fixed left-1/2 top-1/2 z-[60] w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-[color:var(--surface)] p-8">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-green-100 p-3">
            <PackageCheck className="text-green-600"/>
          </div>

          <div>
            <h2 className="text-xl font-bold">
              Receive Purchase
            </h2>

            <p className="text-sm text-[color:var(--text-muted)]">
              Stock will automatically be added.
            </p>
          </div>

          <button
            onClick={onClose}
            className="ml-auto"
          >
            <X/>
          </button>

        </div>

        <div className="mt-8">
          Receive
          <strong> {purchase.invoice_number}</strong>?
        </div>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-xl border px-5 py-3"
          >
            Cancel
          </button>

          <button
            onClick={handleReceive}
            disabled={receivePurchase.isPending}
            className="rounded-xl bg-green-600 px-5 py-3 text-white"
          >
            {receivePurchase.isPending
              ? "Receiving..."
              : "Receive"}
          </button>

        </div>

      </div>
    </>
  );
}