import { useEffect } from "react";
import { X, PackagePlus, Loader2 } from "lucide-react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCategories } from "@/queries/useCategories";
import { useSuppliers } from "@/queries/useSuppliers";
import { useCreateProduct } from "@/queries/useCreateProduct";

import type { CreateProductPayload } from "@/services/inventory.service";

import {
  productSchema,
  type ProductFormValues,
} from "./productSchema";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AddProductModal({
  open,
  onClose,
}: Props) {
  const { data: categories = [] } = useCategories();

  const { data: suppliers = [] } = useSuppliers();

  const createMutation = useCreateProduct();

 const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm<
  z.input<typeof productSchema>,
  unknown,
  z.output<typeof productSchema>
>({
  resolver: zodResolver(productSchema),

  defaultValues: {
    name: "",
    description: "",
    sku: "",
    barcode: "",
    category_id: "",
    supplier_id: "",
    cost_price: 0,
    selling_price: 0,
    quantity: 0,
    minimum_stock: 5,
  },
});

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";

      document.addEventListener(
        "keydown",
        handleKeyDown
      );
    }

    return () => {
      document.body.style.overflow = "";

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [open, onClose]);

  if (!open) return null;

 async function onSubmit(values: ProductFormValues) {
  console.log("SUBMIT STARTED");
  console.log(values);

  const payload: CreateProductPayload = {
    ...values,

    cost_price: Number(values.cost_price),
    selling_price: Number(values.selling_price),
    quantity: Number(values.quantity),
    minimum_stock: Number(values.minimum_stock),
  };

  console.log("PAYLOAD:", payload);

  try {
    const result = await createMutation.mutateAsync(payload);

    console.log("SUCCESS:", result);

    reset();
    onClose();
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
  }
}

  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className="
          fixed
          inset-0
          z-50
          bg-black/50
          backdrop-blur-sm
        "
      />

      {/* Modal */}

      <div
        className="
          fixed
          left-1/2
          top-1/2
          z-[60]
          w-full
          max-w-5xl
          -translate-x-1/2
          -translate-y-1/2
          overflow-hidden
          rounded-[34px]
          border
          border-[color:var(--border)]
          bg-[color:var(--surface)]
          shadow-2xl
        "
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b border-[color:var(--border)] px-8 py-6">

          <div className="flex items-center gap-5">

            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white">

              <PackagePlus size={30} />

            </div>

            <div>

              <h2 className="text-3xl font-bold text-[color:var(--text)]">
                Add Product
              </h2>

              <p className="mt-1 text-[color:var(--text-muted)]">
                Create a new inventory item.
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-2xl p-3 transition hover:bg-[color:var(--surface-hover)]"
          >
            <X size={22} />
          </button>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="max-h-[70vh] overflow-y-auto p-8">

            <div className="grid gap-8 md:grid-cols-2">
                              {/* Product Name */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-[color:var(--text)]">
                  Product Name
                </label>

                <input
                  {...register("name")}
                  placeholder="Enter product name"
                  className="h-12 w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)] px-4 outline-none focus:border-blue-500"
                />

                {errors.name && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* SKU */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-[color:var(--text)]">
                  SKU
                </label>

                <input
                  {...register("sku")}
                  placeholder="SKU"
                  className="h-12 w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)] px-4 outline-none focus:border-blue-500"
                />

                {errors.sku && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.sku.message}
                  </p>
                )}
              </div>

              {/* Description */}

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-[color:var(--text)]">
                  Description
                </label>

                <textarea
                  {...register("description")}
                  rows={4}
                  placeholder="Description..."
                  className="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)] p-4 outline-none focus:border-blue-500"
                />
              </div>

              {/* Barcode */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-[color:var(--text)]">
                  Barcode
                </label>

                <input
                  {...register("barcode")}
                  placeholder="Barcode"
                  className="h-12 w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)] px-4 outline-none focus:border-blue-500"
                />
              </div>

              {/* Category */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-[color:var(--text)]">
                  Category
                </label>

                <select
                  {...register("category_id")}
                  className="h-12 w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)] px-4"
                >
                  <option value="">
                    Select Category
                  </option>

                  {categories.map((category: any) => (
                    <option
                      key={category.ID}
                      value={category.ID}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>

                {errors.category_id && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.category_id.message}
                  </p>
                )}
              </div>

              {/* Supplier */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-[color:var(--text)]">
                  Supplier
                </label>

                <select
                  {...register("supplier_id")}
                  className="h-12 w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)] px-4"
                >
                  <option value="">
                    Select Supplier
                  </option>

                  {suppliers.map((supplier: any) => (
                    <option
                      key={supplier.ID}
                      value={supplier.ID}
                    >
                      {supplier.Name}
                    </option>
                  ))}
                </select>

                {errors.supplier_id && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.supplier_id.message}
                  </p>
                )}
              </div>

              {/* Cost Price */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-[color:var(--text)]">
                  Cost Price
                </label>

                <input
                  type="number"
                  {...register("cost_price", {
                    valueAsNumber: true,
                  })}
                  className="h-12 w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)] px-4"
                />
              </div>

              {/* Selling Price */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-[color:var(--text)]">
                  Selling Price
                </label>

                <input
                  type="number"
                  {...register("selling_price", {
                    valueAsNumber: true,
                  })}
                  className="h-12 w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)] px-4"
                />
              </div>

              {/* Quantity */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-[color:var(--text)]">
                  Quantity
                </label>

                <input
                  type="number"
                  {...register("quantity", {
                    valueAsNumber: true,
                  })}
                  className="h-12 w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)] px-4"
                />
              </div>

              {/* Minimum Stock */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-[color:var(--text)]">
                  Minimum Stock
                </label>

                <input
                  type="number"
                  {...register("minimum_stock", {
                    valueAsNumber: true,
                  })}
                  className="h-12 w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)] px-4"
                />
              </div>

            </div>

          </div>

          {/* Footer */}

          <div className="flex items-center justify-end gap-4 border-t border-[color:var(--border)] px-8 py-6">

            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-[color:var(--border)] px-6 py-3 font-semibold transition hover:bg-[color:var(--surface-hover)]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={createMutation.isPending}
              className="flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {createMutation.isPending && (
                <Loader2
                  size={18}
                  className="animate-spin"
                />
              )}

              {createMutation.isPending
                ? "Creating..."
                : "Create Product"}
            </button>

          </div>

        </form>

      </div>

    </>
  );
}