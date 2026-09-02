import { useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";

import { useDeleteSale } from "@/queries/useDeleteSale";

import type { Sale } from "@/types/sales";

interface Props {
  open: boolean;
  sale: Sale | null;
  onClose: () => void;
}

export default function DeleteSaleDialog({
  open,
  sale,
  onClose,
}: Props) {
  const deleteSaleMutation = useDeleteSale();

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  if (!open || !sale) return null;

  async function handleDelete() {
  if (!sale) return;

  try {
    await deleteSaleMutation.mutateAsync(sale.id);
    onClose();
  } catch (error) {
    console.error(error);
  }
}

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
      />

      {/* Dialog */}
      <div
        className="
          fixed
          left-1/2
          top-1/2
          z-[60]
          w-full
          max-w-md
          -translate-x-1/2
          -translate-y-1/2
          overflow-hidden
          rounded-[28px]
          border
          border-[color:var(--border)]
          bg-[color:var(--surface)]
          shadow-2xl
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[color:var(--border)] px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 dark:bg-red-500/20">
              <AlertTriangle
                size={24}
                className="text-red-600"
              />
            </div>

            <div>
              <h2 className="text-xl font-bold text-[color:var(--text)]">
                Delete Sale
              </h2>

              <p className="text-sm text-[color:var(--text-muted)]">
                This action cannot be undone.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 transition hover:bg-[color:var(--surface-hover)]"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          <p className="text-[color:var(--text)]">
            Are you sure you want to delete this sale?
          </p>

          <div className="mt-6 rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)] p-4">
            <div className="flex justify-between">
              <span className="text-[color:var(--text-muted)]">
                Invoice
              </span>

              <strong className="text-[color:var(--text)]">
                {sale.InvoiceNumber}
              </strong>
            </div>

            <div className="mt-3 flex justify-between">
              <span className="text-[color:var(--text-muted)]">
                Customer
              </span>

              <strong className="text-[color:var(--text)]">
                {sale.CustomerName || "Walk-in Customer"}
              </strong>
            </div>

            <div className="mt-3 flex justify-between">
              <span className="text-[color:var(--text-muted)]">
                Total
              </span>

              <strong className="text-red-600">
                ₦{sale.TotalAmount.toLocaleString()}
              </strong>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 border-t border-[color:var(--border)] px-6 py-5">
          <button
            onClick={onClose}
            className="
              rounded-2xl
              border
              border-[color:var(--border)]
              px-6
              py-3
              font-semibold
              transition
              hover:bg-[color:var(--surface-hover)]
            "
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={deleteSaleMutation.isPending}
            className="
              rounded-2xl
              bg-red-600
              px-6
              py-3
              font-semibold
              text-white
              transition
              hover:bg-red-700
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {deleteSaleMutation.isPending
              ? "Deleting..."
              : "Delete Sale"}
          </button>
        </div>
      </div>
    </>
  );
}