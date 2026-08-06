import {
  Eye,
  CheckCircle,
  Trash2,
} from "lucide-react";

import PurchaseStatusBadge from "./PurchaseStatusBadge";

import type { Purchase } from "@/types/purchase";

interface Props {
  purchase: Purchase;
  onView: (purchase: Purchase) => void;
  onReceive: (purchase: Purchase) => void;
  onDelete: (purchase: Purchase) => void;
}

export default function PurchaseRow({
  purchase,
  onView,
  onReceive,
  onDelete,
}: Props) {
    console.log(purchase);
  return (
    <tr className="transition-colors hover:bg-[color:var(--surface-hover)]">
      <td className="px-6 py-5 font-semibold">
        {purchase.invoice_number}
      </td>

      <td className="px-6 py-5">
        {purchase.supplier?.name ?? "-"}
      </td>

      <td className="px-6 py-5">
        {purchase.items?.length ?? 0}
      </td>

      <td className="px-6 py-5 font-semibold">
        ₦{purchase.total_amount.toLocaleString()}
      </td>

      <td className="px-6 py-5">
        <PurchaseStatusBadge status={purchase.status} />
      </td>

      <td className="px-6 py-5 whitespace-nowrap">
        {new Date(purchase.created_at).toLocaleDateString()}
      </td>

      <td className="px-6 py-5">
        <div className="flex justify-end gap-2">
          <button
            onClick={() => onView(purchase)}
            className="rounded-xl border border-[color:var(--border)] p-2 transition hover:bg-[color:var(--surface-hover)]"
          >
            <Eye size={18} />
          </button>

          {purchase.status === "pending" && (
            <button
              onClick={() => onReceive(purchase)}
              className="rounded-xl border border-green-300 p-2 text-green-600 transition hover:bg-green-50 dark:border-green-800 dark:hover:bg-green-950/30"
            >
              <CheckCircle size={18} />
            </button>
          )}

          <button
            onClick={() => onDelete(purchase)}
            className="rounded-xl border border-red-300 p-2 text-red-600 transition hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950/30"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}