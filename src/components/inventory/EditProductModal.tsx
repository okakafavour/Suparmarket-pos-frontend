import { useEffect } from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";

import type { Product } from "@/types/product";
import { useUpdateProduct } from "@/queries/useUpdateProduct";

interface Props {
  open: boolean;
  product: Product | null;
  onClose: () => void;
}

interface FormValues {
  Name: string;
  Description: string;
  SKU: string;
  Barcode: string;
  CostPrice: number;
  SellingPrice: number;
  Quantity: number;
  MinimumStock: number;
  IsActive: boolean;
}

export default function EditProductModal({
  open,
  product,
  onClose,
}: Props) {
  const { mutate, isPending } = useUpdateProduct();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FormValues>();

  useEffect(() => {
    if (!product) return;

    reset({
      Name: product.Name,
      Description: product.Description,
      SKU: product.SKU,
      Barcode: product.Barcode,
      CostPrice: product.CostPrice,
      SellingPrice: product.SellingPrice,
      Quantity: product.Quantity,
      MinimumStock: product.MinimumStock,
      IsActive: product.IsActive,
    });
  }, [product, reset]);

  if (!open || !product) return null;

 function onSubmit(values: FormValues) {
  if (!product) return;

  mutate(
    {
      id: product.ID,
      payload: {
        name: values.Name,
        description: values.Description,
        sku: values.SKU,
        barcode: values.Barcode,
        costPrice: Number(values.CostPrice),
        sellingPrice: Number(values.SellingPrice),
        quantity: Number(values.Quantity),
        minimumStock: Number(values.MinimumStock),
        isActive: values.IsActive,
      },
    },
    {
      onSuccess() {
        onClose();
      },
    }
  );
}

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/40"
      />

      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white shadow-2xl dark:bg-slate-900">

        <div className="flex items-center justify-between border-b border-slate-200 p-6 dark:border-slate-700">
          <h2 className="text-2xl font-bold">
            Edit Product
          </h2>

          <button
            onClick={onClose}
            className="rounded-xl p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 p-6"
        >
          <div className="grid grid-cols-2 gap-5">

            <Input
              label="Product Name"
              register={register("Name")}
            />

            <Input
              label="SKU"
              register={register("SKU")}
            />

            <Input
              label="Barcode"
              register={register("Barcode")}
            />

            <Input
              label="Description"
              register={register("Description")}
            />

            <Input
              type="number"
              label="Cost Price"
              register={register("CostPrice", {
                valueAsNumber: true,
              })}
            />

            <Input
              type="number"
              label="Selling Price"
              register={register("SellingPrice", {
                valueAsNumber: true,
              })}
            />

            <Input
              type="number"
              label="Quantity"
              register={register("Quantity", {
                valueAsNumber: true,
              })}
            />

            <Input
              type="number"
              label="Minimum Stock"
              register={register("MinimumStock", {
                valueAsNumber: true,
              })}
            />

          </div>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              {...register("IsActive")}
            />

            Active Product
          </label>

          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border px-5 py-3"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </button>

          </div>
        </form>
      </div>
    </>
  );
}

function Input({
  label,
  register,
  type = "text",
}: {
  label: string;
  register: any;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        {label}
      </label>

      <input
        type={type}
        {...register}
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"
      />
    </div>
  );
}