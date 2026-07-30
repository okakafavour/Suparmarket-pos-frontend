import {
  Package,
  Tag,
  Building2,
} from "lucide-react";

import type { Product } from "@/types/product";

import StockBadge from "./StockBadge";
import ProductActions from "./ProductActions";

interface Props {
  product: Product;
  onView: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export default function InventoryTableRow({
  product,
  onView,
  onEdit,
  onDelete,
}: Props) {
  return (
    <tr className="border-t border-slate-200 transition-all hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/40">
      <td className="px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-500/20">
            <Package className="text-blue-600 dark:text-blue-400" />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">
              {product.Name}
            </h3>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              {product.Description || "No description"}
            </p>
          </div>
        </div>
      </td>

      <td className="px-6 py-5 font-medium text-slate-700 dark:text-slate-300">
        {product.SKU}
      </td>

      <td className="px-6 py-5">
        <div className="flex items-center gap-2">
          <Tag size={15} />

          {product.Category?.name}
        </div>
      </td>

      <td className="px-6 py-5">
        <div className="flex items-center gap-2">
          <Building2 size={15} />

          {product.Supplier?.Name}
        </div>
      </td>

      <td className="px-6 py-5 font-semibold">
        ₦{product.SellingPrice.toLocaleString()}
      </td>

      <td className="px-6 py-5">
        {product.Quantity}
      </td>

      <td className="px-6 py-5">
        <StockBadge
          quantity={product.Quantity}
          minimumStock={product.MinimumStock}
          isActive={product.IsActive}
        />
      </td>

      <td className="px-6 py-5">
        <ProductActions
          onView={() => onView(product)}
          onEdit={() => onEdit(product)}
          onDelete={() => onDelete(product)}
        />
      </td>
    </tr>
  );
}