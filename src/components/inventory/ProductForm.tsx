import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import FormInput from "./FormInput";
import FormTextarea from "./FormTextarea";
import FormSelect from "./FormSelect";

import { useCategories } from "@/queries/useCategories";
import { useSuppliers } from "@/queries/useSuppliers";
import type { Product } from "@/types/product";

const schema = z.object({
  name: z.string().min(2, "Product name is required"),
  description: z.string().optional(),
  sku: z.string().min(2, "SKU is required"),
  barcode: z.string().optional(),

  category_id: z.string().min(1, "Category is required"),
  supplier_id: z.string().min(1, "Supplier is required"),

  cost_price: z.number().min(0),

selling_price: z.number().min(0),

quantity: z.number().min(0),

minimum_stock: z.number().min(0),

  image_url: z.string().optional(),
});

export type ProductFormValues = z.infer<typeof schema>;

interface Props {
  product?: Product;
  onSubmit: (values: ProductFormValues) => void;
  loading?: boolean;
}

export default function ProductForm({
  product,
  onSubmit,
  loading = false,
}: Props) {
  const { data: categories = [] } = useCategories();

  const { data: suppliers = [] } = useSuppliers();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(schema),

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
      image_url: "",
    },
  });

  useEffect(() => {
    if (!product) return;

    reset({
      name: product.Name,
      description: product.Description,
      sku: product.SKU,
      barcode: product.Barcode,

      category_id: product.Category?.ID ?? "",
      supplier_id: product.Supplier?.ID ?? "",

      cost_price: product.CostPrice,
      selling_price: product.SellingPrice,

      quantity: product.Quantity,
      minimum_stock: product.MinimumStock,

      image_url: product.ImageURL,
    });
  }, [product, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
    >
      {/* Basic Information */}

      <section className="space-y-5">
        <h3 className="text-lg font-semibold">
          Basic Information
        </h3>

        <FormInput
          label="Product Name"
          {...register("name")}
          error={errors.name?.message}
        />

        <FormInput
          label="SKU"
          {...register("sku")}
          error={errors.sku?.message}
        />

        <FormTextarea
          label="Description"
          {...register("description")}
          error={errors.description?.message}
        />
      </section>

      {/* Classification */}

      <section className="space-y-5">
        <h3 className="text-lg font-semibold">
          Classification
        </h3>

        <FormSelect
          label="Category"
          value={watch("category_id")}
          onChange={(value) =>
            setValue("category_id", value)
          }
          options={categories.map((c: any) => ({
            value: c.ID,
            label: c.name,
            }))}
          error={errors.category_id?.message}
        />

        <FormSelect
          label="Supplier"
          value={watch("supplier_id")}
          onChange={(value) =>
            setValue("supplier_id", value)
          }
          options={suppliers.map((s: any) => ({
            value: s.ID,
            label: s.Name,
            }))}
          error={errors.supplier_id?.message}
        />
      </section>

      {/* Pricing */}

      <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <FormInput
          label="Cost Price"
          type="number"
          step="0.01"
          {...register("cost_price", {
            valueAsNumber: true,
            })}
          error={errors.cost_price?.message}
        />

        <FormInput
          label="Selling Price"
          type="number"
          step="0.01"
          {...register("selling_price", {
            valueAsNumber: true,
            })}
          error={errors.selling_price?.message}
        />
      </section>

      {/* Inventory */}

      <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <FormInput
          label="Quantity"
          type="number"
          {...register("quantity", {
            valueAsNumber: true,
            })}
          error={errors.quantity?.message}
        />

        <FormInput
          label="Minimum Stock"
          type="number"
          {...register("minimum_stock", {
            valueAsNumber: true,
            })}
          error={errors.minimum_stock?.message}
        />
      </section>

      {/* Optional */}

      <section className="space-y-5">
        <FormInput
          label="Barcode"
          {...register("barcode")}
          error={errors.barcode?.message}
        />

        <FormInput
          label="Image URL"
          {...register("image_url")}
          error={errors.image_url?.message}
        />
      </section>

      {/* Buttons */}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : product
            ? "Update Product"
            : "Create Product"}
        </button>
      </div>
    </form>
  );
}