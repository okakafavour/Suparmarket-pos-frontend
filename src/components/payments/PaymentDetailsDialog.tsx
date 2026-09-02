import { X } from "lucide-react";

import type { Payment } from "@/types/payment";

interface Props {
  open: boolean;
  payment: Payment | null;
  onClose: () => void;
}

function formatMethod(method?: Payment["method"]) {
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
      return "-";
  }
}

function formatStatus(status?: Payment["status"]) {
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
      return "-";
  }
}

export default function PaymentDetailsDialog({
  open,
  payment,
  onClose,
}: Props) {
  if (!open || !payment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

      {/* Dialog */}
      <div
        className="
          flex
          max-h-[90vh]
          w-full
          max-w-2xl
          flex-col
          overflow-hidden
          rounded-3xl
          border
          border-[color:var(--border)]
          bg-[color:var(--surface)]
          shadow-2xl
        "
      >

        {/* ==========================
            Header
        ========================== */}

        <div className="flex shrink-0 items-center justify-between border-b border-[color:var(--border)] px-6 py-5">

          <div>
            <h2 className="text-lg font-bold">
              Payment Details
            </h2>

            <p className="mt-1 text-sm text-[color:var(--text-muted)]">
              {payment.sale?.InvoiceNumber ?? "Payment"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-xl
              p-2
              transition
              hover:bg-[color:var(--surface-hover)]
            "
          >
            <X size={20} />
          </button>

        </div>


        {/* ==========================
            Scrollable Content
        ========================== */}

        <div className="custom-scrollbar flex-1 overflow-y-auto">

          {/* Payment Summary */}

          <div className="grid gap-4 p-6 sm:grid-cols-2">

            {/* Invoice */}

            <div className="rounded-2xl border border-[color:var(--border)] p-4">

              <p className="text-xs font-medium uppercase tracking-wide text-[color:var(--text-muted)]">
                Invoice
              </p>

              <p className="mt-2 font-semibold">
                {payment.sale?.InvoiceNumber ?? "-"}
              </p>

            </div>


            {/* Customer */}

            <div className="rounded-2xl border border-[color:var(--border)] p-4">

              <p className="text-xs font-medium uppercase tracking-wide text-[color:var(--text-muted)]">
                Customer
              </p>

              <p className="mt-2 font-semibold">
                {payment.sale?.CustomerName ||
                  "Walk-in Customer"}
              </p>

            </div>


            {/* Amount */}

            <div className="rounded-2xl border border-[color:var(--border)] p-4">

              <p className="text-xs font-medium uppercase tracking-wide text-[color:var(--text-muted)]">
                Amount
              </p>

              <p className="mt-2 text-xl font-bold">
                ₦{payment.amount.toLocaleString()}
              </p>

            </div>


            {/* Method */}

            <div className="rounded-2xl border border-[color:var(--border)] p-4">

              <p className="text-xs font-medium uppercase tracking-wide text-[color:var(--text-muted)]">
                Method
              </p>

              <p className="mt-2 font-semibold">
                {formatMethod(payment.method)}
              </p>

            </div>


            {/* Status */}

            <div className="rounded-2xl border border-[color:var(--border)] p-4">

              <p className="text-xs font-medium uppercase tracking-wide text-[color:var(--text-muted)]">
                Status
              </p>

              <p className="mt-2 font-semibold">
                {formatStatus(payment.status)}
              </p>

            </div>


            {/* Reference */}

            <div className="rounded-2xl border border-[color:var(--border)] p-4">

              <p className="text-xs font-medium uppercase tracking-wide text-[color:var(--text-muted)]">
                Reference
              </p>

              <p className="mt-2 break-all font-semibold">
                {payment.reference || "-"}
              </p>

            </div>


            {/* Payment Date */}

            <div className="rounded-2xl border border-[color:var(--border)] p-4 sm:col-span-2">

              <p className="text-xs font-medium uppercase tracking-wide text-[color:var(--text-muted)]">
                Payment Date
              </p>

              <p className="mt-2 font-semibold">
                {payment.paid_at
                  ? new Date(
                      payment.paid_at
                    ).toLocaleString()
                  : "-"}
              </p>

            </div>

          </div>


          {/* ==========================
              Sale Items
          ========================== */}

          {payment.sale?.Items &&
            payment.sale.Items.length > 0 && (

              <div className="border-t border-[color:var(--border)] px-6 py-6">

                <h3 className="mb-4 text-base font-semibold">
                  Sale Items
                </h3>

                <div className="overflow-hidden rounded-2xl border border-[color:var(--border)]">

                  <div className="overflow-x-auto">

                    <table className="w-full min-w-[500px]">

                      <thead>
                        <tr className="border-b border-[color:var(--border)] text-left">

                          <th className="px-4 py-3 text-xs font-semibold uppercase text-[color:var(--text-muted)]">
                            Product
                          </th>

                          <th className="px-4 py-3 text-xs font-semibold uppercase text-[color:var(--text-muted)]">
                            Qty
                          </th>

                          <th className="px-4 py-3 text-xs font-semibold uppercase text-[color:var(--text-muted)]">
                            Unit Price
                          </th>

                          <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-[color:var(--text-muted)]">
                            Total
                          </th>

                        </tr>
                      </thead>


                      <tbody className="divide-y divide-[color:var(--border)]">

                        {payment.sale.Items.map((item) => (

                          <tr key={item.id}>

                            <td className="px-4 py-3">
                              {item.Product?.Name ?? "-"}
                            </td>

                            <td className="px-4 py-3">
                              {item.Quantity}
                            </td>

                            <td className="px-4 py-3">
                              ₦{item.UnitPrice.toLocaleString()}
                            </td>

                            <td className="px-4 py-3 text-right font-medium">
                              ₦{item.Subtotal.toLocaleString()}
                            </td>

                          </tr>

                        ))}

                      </tbody>

                    </table>

                  </div>

                </div>

              </div>

            )}

        </div>


        {/* ==========================
            Footer
        ========================== */}

        <div className="flex shrink-0 justify-end border-t border-[color:var(--border)] px-6 py-5">

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-xl
              bg-blue-600
              px-6
              py-3
              font-medium
              text-white
              transition
              hover:bg-blue-700
            "
          >
            Close
          </button>

        </div>

      </div>
    </div>
  );
}