import {
  Package,
  Tag,
  Building2,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import type { Product } from "@/types/product";
import StockBadge from "@/components/inventory/StockBadge";

interface Props {
  product: Product;
  view: "grid" | "list";
  onView: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export default function ProductCard({
  product,
  view,
  onView,
  onEdit,
  onDelete,
}: Props) {
  const isGrid = view === "grid";

  if (!isGrid) {
    return (
      <div
        className="
          group
          rounded-[28px]
          border
          border-[color:var(--border)]
          bg-[color:var(--surface)]
          p-6
          shadow-sm
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:shadow-xl
        "
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center">

          {/* Product */}

          <div className="flex min-w-0 flex-1 items-center gap-5">

            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-100 dark:bg-blue-500/20">

              <Package
                size={36}
                className="text-blue-600"
              />

            </div>

            <div className="min-w-0 flex-1">

              <h2 className="truncate text-2xl font-bold text-[color:var(--text)]">
                {product.Name}
              </h2>

              <p className="mt-2 line-clamp-2 text-sm text-[color:var(--text-muted)]">
                {product.Description || "No description available"}
              </p>

              <div className="mt-4 flex flex-wrap gap-3">

                <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">

                  <Tag size={14} />

                  {product.Category?.name}

                </span>

                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">

                  <Building2 size={14} />

                  {product.Supplier?.Name}

                </span>

              </div>

            </div>

          </div>

          {/* Right */}

          <div className="grid gap-6 sm:grid-cols-4 lg:w-[560px]">

            <div>

              <p className="text-xs uppercase tracking-wide text-[color:var(--text-muted)]">
                Selling Price
              </p>

              <h3 className="mt-2 text-2xl font-bold text-[color:var(--text)]">
                ₦{product.SellingPrice.toLocaleString()}
              </h3>

            </div>

            <div>

              <p className="text-xs uppercase tracking-wide text-[color:var(--text-muted)]">
                Quantity
              </p>

              <h3 className="mt-2 text-2xl font-bold text-[color:var(--text)]">
                {product.Quantity}
              </h3>

            </div>

            <div className="flex items-center">

              <StockBadge
                quantity={product.Quantity}
                minimumStock={product.MinimumStock}
                isActive={product.IsActive}
              />

            </div>

            <div className="flex items-center justify-end gap-2">
                            <button
                onClick={() => onView(product)}
                className="
                  flex h-11 w-11 items-center justify-center
                  rounded-xl
                  border border-blue-200
                  text-blue-600
                  transition-all
                  hover:bg-blue-50
                  dark:border-blue-500/20
                  dark:hover:bg-blue-500/10
                "
              >
                <Eye size={18} />
              </button>

              <button
                onClick={() => onEdit(product)}
                className="
                  flex h-11 w-11 items-center justify-center
                  rounded-xl
                  bg-blue-600
                  text-white
                  transition-all
                  hover:bg-blue-700
                "
              >
                <Pencil size={18} />
              </button>

              <button
                onClick={() => onDelete(product)}
                className="
                  flex h-11 w-11 items-center justify-center
                  rounded-xl
                  bg-red-500
                  text-white
                  transition-all
                  hover:bg-red-600
                "
              >
                <Trash2 size={18} />
              </button>

            </div>

          </div>

        </div>
      </div>
    );
  }

  return (
    <div
      className="
        group
        overflow-hidden
        rounded-[30px]
        border
        border-[color:var(--border)]
        bg-[color:var(--surface)]
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-2xl
      "
    >
      {/* Top */}

      <div
        className="
          relative
          flex
          h-48
          items-center
          justify-center
          bg-gradient-to-br
          from-blue-50
          via-indigo-50
          to-slate-100
          dark:from-slate-800
          dark:via-slate-900
          dark:to-slate-800
        "
      >
        <div
          className="
            flex
            h-28
            w-28
            items-center
            justify-center
            rounded-[30px]
            bg-white/80
            shadow-xl
            backdrop-blur
            dark:bg-slate-900/70
          "
        >
          <Package
            size={54}
            className="text-blue-600"
          />
        </div>

        <div className="absolute right-5 top-5">

          <StockBadge
            quantity={product.Quantity}
            minimumStock={product.MinimumStock}
            isActive={product.IsActive}
          />

        </div>
      </div>

      {/* Body */}

      <div className="p-6">

        <h2 className="line-clamp-1 text-xl font-bold text-[color:var(--text)]">
          {product.Name}
        </h2>

        <p className="mt-2 line-clamp-2 text-sm text-[color:var(--text-muted)]">
          {product.Description || "No description available"}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">

          <span
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-blue-50
              px-3
              py-1.5
              text-xs
              font-semibold
              text-blue-700
              dark:bg-blue-500/10
              dark:text-blue-300
            "
          >
            <Tag size={14} />
            {product.Category?.name}
          </span>

          <span
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-emerald-50
              px-3
              py-1.5
              text-xs
              font-semibold
              text-emerald-700
              dark:bg-emerald-500/10
              dark:text-emerald-300
            "
          >
            <Building2 size={14} />
            {product.Supplier?.Name}
          </span>

        </div>

        <div className="mt-6 rounded-2xl bg-[color:var(--background)] p-4">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs text-[color:var(--text-muted)]">
                Selling Price
              </p>

              <h3 className="mt-1 text-3xl font-bold text-[color:var(--text)]">
                ₦{product.SellingPrice.toLocaleString()}
              </h3>

            </div>

            <div className="text-right">

              <p className="text-xs text-[color:var(--text-muted)]">
                Quantity
              </p>

              <h3 className="mt-1 text-3xl font-bold text-[color:var(--text)]">
                {product.Quantity}
              </h3>

            </div>

          </div>

        </div>

        <div className="mt-6 flex gap-2">

          <button
            onClick={() => onView(product)}
            className="
              flex flex-1 items-center justify-center gap-2
              rounded-xl
              border border-blue-500
              py-3
              font-semibold
              text-blue-600
              transition-all
              hover:bg-blue-50
              dark:hover:bg-blue-500/10
            "
          >
            <Eye size={18} />
            View
          </button>

          <button
            onClick={() => onEdit(product)}
            className="
              flex flex-1 items-center justify-center gap-2
              rounded-xl
              bg-blue-600
              py-3
              font-semibold
              text-white
              transition-all
              hover:bg-blue-700
            "
          >
            <Pencil size={18} />
            Edit
          </button>

          <button
            onClick={() => onDelete(product)}
            className="
              flex h-12 w-12 items-center justify-center
              rounded-xl
              bg-red-500
              text-white
              transition-all
              hover:bg-red-600
            "
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>

    </div>
  );
}