import { X } from "lucide-react";

import ProductForm, {
  type ProductFormValues,
} from "./ProductForm";

import { useCreateProduct } from "@/queries/useCreateProduct";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CreateProductModal({
  open,
  onClose,
}: Props) {
  const { mutate, isPending } = useCreateProduct();

  if (!open) return null;

  function handleSubmit(values: ProductFormValues) {
    mutate(values, {
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
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
      />

      {/* Modal */}

      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-5xl -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white shadow-2xl dark:bg-slate-900">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 p-6 dark:border-slate-700">

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Add Product
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Create a new inventory item
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X />
          </button>

        </div>

        {/* Form */}

        <div className="max-h-[80vh] overflow-y-auto p-6">

          <ProductForm
            onSubmit={handleSubmit}
            loading={isPending}
          />

        </div>

      </div>
    </>
  );
}