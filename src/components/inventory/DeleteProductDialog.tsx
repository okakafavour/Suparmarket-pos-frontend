import { Trash2, X } from "lucide-react";

import type { Product } from "@/types/product";
import { useDeleteProduct } from "@/queries/useDeleteProduct";

interface Props {
  open: boolean;
  product: Product | null;
  onClose: () => void;
}

export default function DeleteProductDialog({
  open,
  product,
  onClose,
}: Props) {
  const { mutate, isPending } = useDeleteProduct();

  if (!open || !product) return null;

 function handleDelete() {
  if (!product) return;

  mutate(product.ID, {
    onSuccess() {
      onClose();
    },
  });
}

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
      />

      {/* Dialog */}
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white shadow-2xl dark:bg-slate-900">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 p-6 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-red-100 p-3 dark:bg-red-500/20">
              <Trash2 className="text-red-600 dark:text-red-400" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Delete Product
              </h2>

              <p className="text-sm text-slate-500">
                This action cannot be undone.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-5 p-6">

          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 dark:border-red-900 dark:bg-red-950/20">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Are you sure you want to permanently delete
            </p>

            <h3 className="mt-2 text-lg font-bold text-red-600">
              {product.Name}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              SKU: {product.SKU}
            </p>
          </div>

          <div className="flex justify-end gap-3">

            <button
              onClick={onClose}
              disabled={isPending}
              className="rounded-xl border border-slate-300 px-5 py-3 font-medium hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              onClick={handleDelete}
              disabled={isPending}
              className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700 disabled:opacity-60"
            >
              {isPending ? "Deleting..." : "Delete Product"}
            </button>

          </div>
        </div>
      </div>
    </>
  );
}