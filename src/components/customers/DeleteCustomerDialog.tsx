import { useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";

import { useDeleteCustomer } from "@/queries/useDeleteCustomer";

import type { Customer } from "@/types/customers";

interface Props {
  open: boolean;
  customer: Customer | null;
  onClose: () => void;
}

export default function DeleteCustomerDialog({
  open,
  customer,
  onClose,
}: Props) {
  const deleteCustomer = useDeleteCustomer();

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

  if (!open || !customer) return null;

  async function handleDelete() {
  if (!customer) return;

  try {
    await deleteCustomer.mutateAsync(customer.id);
    onClose();
  } catch (err) {
    console.error(err);
  }
}

  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal */}

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
          rounded-[30px]
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
                Delete Customer
              </h2>

              <p className="text-sm text-[color:var(--text-muted)]">
                This action cannot be undone.
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 hover:bg-[color:var(--surface-hover)]"
          >
            <X size={20} />
          </button>

        </div>

        {/* Body */}

        <div className="px-6 py-6">

          <p className="text-[color:var(--text)]">
            Are you sure you want to delete this customer?
          </p>

          <div className="mt-6 rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)] p-4">

            <div className="flex justify-between">

              <span className="text-[color:var(--text-muted)]">
                Name
              </span>

              <strong className="text-[color:var(--text)]">
                {customer.full_name}
              </strong>

            </div>

            <div className="mt-3 flex justify-between">

              <span className="text-[color:var(--text-muted)]">
                Email
              </span>

              <strong className="text-[color:var(--text)]">
                {customer.email || "-"}
              </strong>

            </div>

            <div className="mt-3 flex justify-between">

              <span className="text-[color:var(--text-muted)]">
                Phone
              </span>

              <strong className="text-[color:var(--text)]">
                {customer.phone}
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
              hover:bg-[color:var(--surface-hover)]
            "
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={deleteCustomer.isPending}
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
            {deleteCustomer.isPending
              ? "Deleting..."
              : "Delete Customer"}
          </button>

        </div>

      </div>
    </>
  );
}