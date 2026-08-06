import {
  AlertTriangle,
  X,
} from "lucide-react";

import { useDeleteSupplier } from "@/queries/useSupplier";

import type { Supplier } from "@/types/suppliers";

interface Props {
  open: boolean;
  supplier: Supplier | null;
  onClose: () => void;
}

export default function DeleteSupplierDialog({
  open,
  supplier,
  onClose,
}: Props) {
  const deleteSupplier =
    useDeleteSupplier();

  if (!open || !supplier) return null;

  async function handleDelete() {
    if (!supplier) return;

    try {
      await deleteSupplier.mutateAsync(
        supplier.id
      );

      onClose();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/50"
      />

      <div className="fixed left-1/2 top-1/2 z-[60] w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-[30px] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-2xl">

        <div className="flex items-start gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 dark:bg-red-500/20">

            <AlertTriangle
              size={28}
              className="text-red-600"
            />

          </div>

          <div className="flex-1">

            <h2 className="text-2xl font-bold">
              Delete Supplier
            </h2>

            <p className="mt-1 text-sm text-[color:var(--text-muted)]">
              This action cannot be undone.
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 transition hover:bg-[color:var(--surface-hover)]"
          >
            <X size={20} />
          </button>

        </div>

        <div className="mt-8 rounded-2xl bg-[color:var(--background)] p-5">

          <p className="leading-7">
            Are you sure you want to permanently
            delete{" "}
            <span className="font-semibold">
              {supplier.name}
            </span>
            ?
          </p>

        </div>

        <div className="mt-8 flex justify-end gap-3">

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[color:var(--border)] px-5 py-3 transition hover:bg-[color:var(--surface-hover)]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleteSupplier.isPending}
            className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {deleteSupplier.isPending
              ? "Deleting..."
              : "Delete Supplier"}
          </button>

        </div>

      </div>
    </>
  );
}