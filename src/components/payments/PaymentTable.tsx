import { CreditCard } from "lucide-react";

import type { Payment } from "@/types/payment";

interface Props {
  payments: Payment[];
  onView: (payment: Payment) => void;
  onDelete: (payment: Payment) => void;
}

function formatMethod(method: Payment["method"]) {
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

function formatStatus(status: Payment["status"]) {
  switch (status) {
    case "paid":
      return "Paid";
    case "pending":
      return "Pending";
    case "failed":
      return "Failed";
    case "refunded":
      return "Refunded";
    default:
      return status;
  }
}

export default function PaymentsTable({
  payments,
  onView,
  onDelete,
}: Props) {
  if (payments.length === 0) {
    return (
      <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-12 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[color:var(--surface-hover)]">
          <CreditCard
            size={24}
            className="text-[color:var(--text-muted)]"
          />
        </div>

        <h3 className="mt-4 text-lg font-semibold">
          No payments found
        </h3>

        <p className="mt-1 text-sm text-[color:var(--text-muted)]">
          There are no payments matching your current filters.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-[color:var(--border)] text-left">
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[color:var(--text-muted)]">
                Invoice
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[color:var(--text-muted)]">
                Reference
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[color:var(--text-muted)]">
                Amount
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[color:var(--text-muted)]">
                Method
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[color:var(--text-muted)]">
                Status
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[color:var(--text-muted)]">
                Date
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-[color:var(--text-muted)]">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[color:var(--border)]">
            {payments.map((payment) => (
              <tr
                key={payment.id}
                className="transition-colors hover:bg-[color:var(--surface-hover)]"
              >
                {/* Invoice */}
                <td className="px-6 py-5">
                  <div className="font-semibold">
                    {payment.sale?.InvoiceNumber ?? "-"}
                  </div>

                  {payment.sale?.CustomerName && (
                    <div className="mt-1 text-xs text-[color:var(--text-muted)]">
                      {payment.sale.CustomerName}
                    </div>
                  )}
                </td>

                {/* Reference */}
                <td className="px-6 py-5 text-sm">
                  {payment.reference || "-"}
                </td>

                {/* Amount */}
                <td className="px-6 py-5 font-semibold">
                  ₦{payment.amount.toLocaleString()}
                </td>

                {/* Method */}
                <td className="px-6 py-5">
                  <span className="rounded-full bg-[color:var(--surface-hover)] px-3 py-1.5 text-xs font-medium">
                    {formatMethod(payment.method)}
                  </span>
                </td>

                {/* Status */}
                <td className="px-6 py-5">
                  <span
                    className={
                      payment.status === "paid"
                        ? "rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-700 dark:bg-green-950/40 dark:text-green-400"
                        : payment.status === "pending"
                          ? "rounded-full bg-yellow-100 px-3 py-1.5 text-xs font-medium text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-400"
                          : payment.status === "failed"
                            ? "rounded-full bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700 dark:bg-red-950/40 dark:text-red-400"
                            : "rounded-full bg-purple-100 px-3 py-1.5 text-xs font-medium text-purple-700 dark:bg-purple-950/40 dark:text-purple-400"
                    }
                  >
                    {formatStatus(payment.status)}
                  </span>
                </td>

                {/* Date */}
                <td className="px-6 py-5 whitespace-nowrap text-sm">
                  {payment.created_at
                    ? new Date(
                        payment.created_at
                      ).toLocaleDateString()
                    : "-"}
                </td>

                {/* Actions */}
                <td className="px-6 py-5">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onView(payment)}
                      className="rounded-xl border border-[color:var(--border)] px-3 py-2 text-sm font-medium transition hover:bg-[color:var(--surface-hover)]"
                    >
                      View
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(payment)}
                      className="rounded-xl border border-red-300 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950/30"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}