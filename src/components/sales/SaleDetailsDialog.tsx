import { useEffect } from "react";
import {
  X,
  Receipt,
  Calendar,
  CreditCard,
  User,
  Hash,
} from "lucide-react";

import type { Sale } from "@/types/sales";
import type { SaleItem } from "@/types/sales";

interface Props {
  open: boolean;
  sale: Sale | null;
  onClose: () => void;
}

export default function SaleDetailsDialog({
  open,
  sale,
  onClose,
}: Props) {
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  if (!open || !sale) return null;

  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal */}

      <div
        className="
          fixed
          left-1/2
          top-1/2
          z-[60]
          w-full
          max-w-6xl
          -translate-x-1/2
          -translate-y-1/2
          overflow-hidden
          rounded-[32px]
          border
          border-[color:var(--border)]
          bg-[color:var(--surface)]
          shadow-2xl
        "
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b border-[color:var(--border)] px-8 py-6">

          <div className="flex items-center gap-5">

            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-100 dark:bg-emerald-500/20">

              <Receipt
                size={32}
                className="text-emerald-600"
              />

            </div>

            <div>

              <h2 className="text-3xl font-bold text-[color:var(--text)]">
                Sale Details
              </h2>

              <p className="mt-1 text-[color:var(--text-muted)]">
                Invoice #{sale.InvoiceNumber}
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-2xl p-3 transition hover:bg-[color:var(--surface-hover)]"
          >
            <X
              size={22}
              className="text-[color:var(--text)]"
            />
          </button>

        </div>

        {/* Body */}

        <div className="max-h-[75vh] overflow-y-auto px-8 py-8">

          {/* Basic Information */}

          <div className="grid gap-6 md:grid-cols-2">

            <InfoCard
              icon={<User size={18} />}
              title="Customer"
              value={sale.CustomerName || "Walk-in Customer"}
            />

            <InfoCard
              icon={<Hash size={18} />}
              title="Invoice"
              value={sale.InvoiceNumber}
            />

            <InfoCard
              icon={<CreditCard size={18} />}
              title="Payment Method"
              value={sale.PaymentMethod}
            />

            <InfoCard
              icon={<Calendar size={18} />}
              title="Date"
              value={new Date(sale.CreatedAt).toLocaleString()}
            />

        </div>
                  {/* Purchased Items */}

          <section className="mt-10">

            <h3 className="mb-5 text-xl font-bold text-[color:var(--text)]">
              Purchased Items
            </h3>

            <div className="overflow-hidden rounded-3xl border border-[color:var(--border)]">

              <table className="min-w-full">

                <thead className="bg-[color:var(--surface-hover)]">

                  <tr>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-[color:var(--text)]">
                      Product
                    </th>

                    <th className="px-6 py-4 text-center text-sm font-semibold text-[color:var(--text)]">
                      Qty
                    </th>

                    <th className="px-6 py-4 text-right text-sm font-semibold text-[color:var(--text)]">
                      Unit Price
                    </th>

                    <th className="px-6 py-4 text-right text-sm font-semibold text-[color:var(--text)]">
                      Subtotal
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {sale.Items.map((item: SaleItem) => (
                    <tr
                      key={item.ID}
                      className="border-t border-[color:var(--border)]"
                    >

                      <td className="px-6 py-5">

                        <div>

                          <h4 className="font-semibold text-[color:var(--text)]">
                            {item.Product.Name}
                          </h4>

                          <p className="mt-1 text-sm text-[color:var(--text-muted)]">
                            SKU: {item.Product.SKU}
                          </p>

                        </div>

                      </td>

                      <td className="px-6 py-5 text-center font-semibold text-[color:var(--text)]">
                        {item.Quantity}
                      </td>

                      <td className="px-6 py-5 text-right font-medium text-[color:var(--text)]">
                        ₦{item.UnitPrice.toLocaleString()}
                      </td>

                      <td className="px-6 py-5 text-right font-bold text-emerald-600">
                        ₦{item.Subtotal.toLocaleString()}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </section>

          {/* Summary */}

          <section className="mt-10">

            <div className="grid gap-8 lg:grid-cols-2">

              {/* Payment Status */}

              <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--background)] p-6">

                <h3 className="text-lg font-bold text-[color:var(--text)]">
                  Payment Status
                </h3>

                <div className="mt-6">

                  {sale.Status === "paid" ? (

                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-5 py-3 font-semibold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400">

                      <span className="h-2 w-2 rounded-full bg-emerald-500" />

                      Paid

                    </span>

                  ) : (

                    <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-5 py-3 font-semibold text-amber-700 dark:bg-amber-500/20 dark:text-amber-400">

                      <span className="h-2 w-2 rounded-full bg-amber-500" />

                      Pending

                    </span>

                  )}

                </div>

                <div className="mt-8 space-y-4">

                  <StatusRow
                    label="Payment Method"
                    value={sale.PaymentMethod}
                  />

                  <StatusRow
                    label="Sold By"
                    value={sale.SoldBy || "System"}
                  />

                </div>

              </div>

              {/* Totals */}

              <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-sm">

                <h3 className="text-lg font-bold text-[color:var(--text)]">
                  Order Summary
                </h3>

                <div className="mt-6 space-y-5">

                  <SummaryRow
                    label="Subtotal"
                    value={`₦${(sale.TotalAmount - sale.Tax + sale.Discount).toLocaleString()}`}
                  />

                  <SummaryRow
                    label="Discount"
                    value={`- ₦${sale.Discount.toLocaleString()}`}
                  />

                  <SummaryRow
                    label="Tax"
                    value={`₦${sale.Tax.toLocaleString()}`}
                  />

                  <div className="border-t border-[color:var(--border)] pt-5">

                    <SummaryRow
                      large
                      label="Grand Total"
                      value={`₦${sale.TotalAmount.toLocaleString()}`}
                    />

                  </div>

                </div>

              </div>

            </div>

          </section>
                  </div>

        {/* Footer */}

        <div className="flex items-center justify-end gap-4 border-t border-[color:var(--border)] px-8 py-6">

          <button
            onClick={onClose}
            className="rounded-2xl border border-[color:var(--border)] px-6 py-3 font-semibold text-[color:var(--text)] transition hover:bg-[color:var(--surface-hover)]"
          >
            Close
          </button>

          <button
            onClick={() => window.print()}
            className="rounded-2xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
          >
            Print Receipt
          </button>

        </div>

      </div>

    </>
  );
}

function InfoCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)] p-5">

      <div className="mb-3 flex items-center gap-2 text-[color:var(--text-muted)]">

        {icon}

        <span className="text-sm">
          {title}
        </span>

      </div>

      <h3 className="break-all font-semibold text-[color:var(--text)]">
        {value}
      </h3>

    </div>
  );
}

function SummaryRow({
  label,
  value,
  large = false,
}: {
  label: string;
  value: React.ReactNode;
  large?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">

      <span
        className={
          large
            ? "text-xl font-bold text-[color:var(--text)]"
            : "text-[color:var(--text-muted)]"
        }
      >
        {label}
      </span>

      <span
        className={
          large
            ? "text-2xl font-bold text-emerald-600"
            : "font-semibold text-[color:var(--text)]"
        }
      >
        {value}
      </span>

    </div>
  );
}

function StatusRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">

      <span className="text-[color:var(--text-muted)]">
        {label}
      </span>

      <span className="capitalize font-semibold text-[color:var(--text)]">
        {value}
      </span>

    </div>
  );
}