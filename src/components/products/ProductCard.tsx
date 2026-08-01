import {
  Package,
  Tag,
  Building2,
  MoreVertical,
} from "lucide-react";

import type { Product } from "@/types/product";
import StockBadge from "@/components/inventory/StockBadge";

interface Props {
  product: Product;
  onView: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export default function ProductCard({
  product,
  onView,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div
      className="
        group
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
        dark:border-slate-700
        dark:bg-slate-900
      "
    >
      {/* Header */}

      <div className="flex items-start justify-between">

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-500/20">

          <Package
            size={30}
            className="text-blue-600"
          />

        </div>

        <button className="rounded-xl p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800">
          <MoreVertical size={18} />
        </button>

      </div>

      {/* Name */}

      <h2 className="mt-5 line-clamp-1 text-xl font-bold text-slate-900 dark:text-white">
        {product.Name}
      </h2>

      <p className="mt-1 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
        {product.Description || "No description"}
      </p>

      {/* Category */}

      <div className="mt-6 space-y-3">

        <div className="flex items-center gap-2 text-sm">

          <Tag
            size={16}
            className="text-blue-500"
          />

          <span className="text-slate-600 dark:text-slate-300">
            {product.Category?.name}
          </span>

        </div>

        <div className="flex items-center gap-2 text-sm">

          <Building2
            size={16}
            className="text-emerald-500"
          />

          <span className="text-slate-600 dark:text-slate-300">
            {product.Supplier?.Name}
          </span>

        </div>

      </div>

      {/* Price */}

      <div className="mt-6">

        <p className="text-sm text-slate-500">
          Selling Price
        </p>

        <h3 className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
          ₦{product.SellingPrice.toLocaleString()}
        </h3>

      </div>

      {/* Stock */}

      <div className="mt-6 flex items-center justify-between">

        <div>

          <p className="text-xs text-slate-500">
            Quantity
          </p>

          <h4 className="text-xl font-bold text-slate-900 dark:text-white">
            {product.Quantity}
          </h4>

        </div>

        <StockBadge
          quantity={product.Quantity}
          minimumStock={product.MinimumStock}
          isActive={product.IsActive}
        />

      </div>

      {/* Footer */}

      <div className="mt-7 flex gap-2">

        <button
          onClick={() => onView(product)}
          className="flex-1 rounded-xl border border-blue-600 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 dark:hover:bg-blue-500/10"
        >
          View
        </button>

        <button
          onClick={() => onEdit(product)}
          className="flex-1 rounded-xl bg-blue-600 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(product)}
          className="rounded-xl bg-red-500 px-4 text-white transition hover:bg-red-600"
        >
          Delete
        </button>

      </div>
    </div>
  );
}