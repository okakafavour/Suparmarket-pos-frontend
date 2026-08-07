import {
  Eye,
  Trash2,
} from "lucide-react";

import PaymentStatusBadge from "./PaymentStatusBadge";

import type { Payment } from "@/types/payment";

interface Props {
  payment: Payment;
  onView: (payment: Payment) => void;
  onDelete: (payment: Payment) => void;
}

function formatMethod(
  method: Payment["method"]
) {
  switch (method) {
    case "cash":
      return "Cash";

    case "card":
      return "Card";

    case "transfer":
      return "Transfer";

    case "mobile_money":
      return "Mobile Money";

    default:
      return method;
  }
}

export default function PaymentRow({
  payment,
  onView,
  onDelete,
}: Props) {
  const invoice =
    payment.sale?.InvoiceNumber ?? "-";

  const customer =
    payment.sale?.CustomerName ||
    "Walk-in Customer";

  return (
    <tr className="transition-colors hover:bg-[color:var(--surface-hover)]">
      <td className="px-6 py-5 font-semibold">
        {invoice}
      </td>

      <td className="px-6 py-5">
        {customer}
      </td>

      <td className="px-6 py-5 font-semibold">
        ₦{payment.amount.toLocaleString()}
      </td>

      <td className="px-6 py-5">
        {formatMethod(payment.method)}
      </td>

      <td className="px-6 py-5">
        <PaymentStatusBadge
          status={payment.status}
        />
      </td>

      <td className="px-6 py-5">
        <span className="text-sm text-[color:var(--text-muted)]">
          {payment.reference || "-"}
        </span>
      </td>

      <td className="px-6 py-5 whitespace-nowrap">
        {payment.paid_at
          ? new Date(
              payment.paid_at
            ).toLocaleDateString()
          : "-"}
      </td>

      <td className="px-6 py-5">
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() =>
              onView(payment)
            }
            className="rounded-xl border border-[color:var(--border)] p-2 transition hover:bg-[color:var(--surface-hover)]"
          >
            <Eye size={18} />
          </button>

          <button
            type="button"
            onClick={() =>
              onDelete(payment)
            }
            className="rounded-xl border border-red-300 p-2 text-red-600 transition hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950/30"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}