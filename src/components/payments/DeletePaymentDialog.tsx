import { AlertTriangle, X } from "lucide-react";

import type { Payment } from "@/types/payment";

interface Props {
  open: boolean;
  payment: Payment | null;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeletePaymentDialog({
  open,
  payment,
  loading = false,
  onClose,
  onConfirm,
}: Props) {
  if (!open || !payment) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-[30px] bg-[color:var(--surface)] p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400">
            <AlertTriangle size={22} />
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-xl p-2 transition hover:bg-[color:var(--surface-hover)] disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="mt-5">
          <h2 className="text-xl font-bold">
            Delete Payment
          </h2>

          <p className="mt-2 text-sm leading-6 text-[color:var(--text-muted)]">
            Are you sure you want to delete this payment?
            This action will remove the payment from the
            active payment list.
          </p>
        </div>

        {/* Payment info */}
        <div className="mt-5 rounded-2xl border border-[color:var(--border)] p-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-[color:var(--text-muted)]">
              Invoice
            </span>

            <span className="text-sm font-semibold">
              {payment.sale?.InvoiceNumber ?? "-"}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between gap-4">
            <span className="text-sm text-[color:var(--text-muted)]">
              Amount
            </span>

            <span className="font-semibold">
              ₦{payment.amount.toLocaleString()}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between gap-4">
            <span className="text-sm text-[color:var(--text-muted)]">
              Reference
            </span>

            <span className="max-w-[200px] truncate text-sm font-medium">
              {payment.reference || "-"}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-xl border border-[color:var(--border)] px-5 py-3 text-sm font-medium transition hover:bg-[color:var(--surface-hover)] disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="rounded-xl bg-red-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Deleting..." : "Delete Payment"}
          </button>
        </div>
      </div>
    </div>
  );
}