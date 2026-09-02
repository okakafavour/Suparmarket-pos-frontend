import { useEffect } from "react";
import {
  X,
  Receipt,
  User,
  CreditCard,
  Calendar,
  Package,
  Printer,
  Download,
} from "lucide-react";

import type { Sale } from "@/types/sales";

interface Props {
  open: boolean;
  sale: Sale | null;
  onClose: () => void;
}

export default function SaleDetailsModal({
  open,
  sale,
  onClose,
}: Props) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open || !sale) return null;

  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className="
          fixed inset-0
          z-50
          bg-black/60
          backdrop-blur-sm
        "
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

            <div
              className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-3xl
                bg-emerald-100
                dark:bg-emerald-500/20
              "
            >
              <Receipt
                size={30}
                className="text-emerald-600"
              />
            </div>

            <div>

              <h2 className="text-3xl font-bold text-[color:var(--text)]">
                {sale.InvoiceNumber}
              </h2>

              <p className="mt-1 text-sm text-[color:var(--text-muted)]">
                Sales Invoice
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="
              rounded-2xl
              p-3
              transition
              hover:bg-[color:var(--surface-hover)]
            "
          >
            <X
              size={22}
              className="text-[color:var(--text)]"
            />
          </button>

        </div>

        {/* Body */}

        <div className="max-h-[75vh] overflow-y-auto p-8">
                      {/* Customer + Payment */}

          <div className="grid gap-6 lg:grid-cols-2">

            <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--background)] p-6">

              <div className="mb-5 flex items-center gap-3">

                <User className="text-blue-600" />

                <h3 className="text-xl font-bold text-[color:var(--text)]">
                  Customer
                </h3>

              </div>

              <p className="text-2xl font-semibold text-[color:var(--text)]">
                {sale.CustomerName || "Walk-in Customer"}
              </p>

              <p className="mt-2 text-sm text-[color:var(--text-muted)]">
                {sale.Items.length} item(s) purchased
              </p>

            </div>

            <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--background)] p-6">

              <div className="mb-5 flex items-center gap-3">

                <CreditCard className="text-emerald-600" />

                <h3 className="text-xl font-bold text-[color:var(--text)]">
                  Payment
                </h3>

              </div>

              <div className="flex flex-wrap gap-3">

                <span className="rounded-full bg-emerald-100 px-4 py-2 font-semibold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                  {sale.PaymentMethod.replace("_", " ")}
                </span>

                <span
                  className={`rounded-full px-4 py-2 font-semibold ${
                    sale.Status === "paid"
                      ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
                      : "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300"
                  }`}
                >
                  {sale.Status}
                </span>

              </div>

            </div>

          </div>

          {/* Purchased Items */}

          <section className="mt-10">

            <div className="mb-5 flex items-center gap-3">

              <Package className="text-emerald-600" />

              <h3 className="text-xl font-bold text-[color:var(--text)]">
                Purchased Items
              </h3>

            </div>

            <div className="overflow-hidden rounded-3xl border border-[color:var(--border)]">

              <table className="min-w-full">

                <thead className="bg-[color:var(--surface-hover)]">

                  <tr>

                    <th className="px-6 py-4 text-left">Product</th>

                    <th className="px-6 py-4 text-center">Qty</th>

                    <th className="px-6 py-4 text-right">Price</th>

                    <th className="px-6 py-4 text-right">Subtotal</th>

                  </tr>

                </thead>

                <tbody>

                  {sale.Items.map((item) => (

                    <tr
                      key={item.id}
                      className="border-t border-[color:var(--border)]"
                    >

                      <td className="px-6 py-5">

                        <h4 className="font-semibold">
                          {item.Product.Name}
                        </h4>

                        <p className="text-sm text-[color:var(--text-muted)]">
                          {item.Product.SKU}
                        </p>

                      </td>

                      <td className="px-6 py-5 text-center">
                        {item.Quantity}
                      </td>

                      <td className="px-6 py-5 text-right">
                        ₦{item.UnitPrice.toLocaleString()}
                      </td>

                      <td className="px-6 py-5 text-right font-bold">
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

            <div className="ml-auto max-w-md rounded-3xl border border-[color:var(--border)] bg-[color:var(--background)] p-6">

              <SummaryRow
                label="Subtotal"
                value={sale.TotalAmount + sale.Discount - sale.Tax}
              />

              <SummaryRow
                label="Discount"
                value={sale.Discount}
              />

              <SummaryRow
                label="Tax"
                value={sale.Tax}
              />

              <div className="my-5 border-t border-[color:var(--border)]" />

              <SummaryRow
                label="Total"
                value={sale.TotalAmount}
                large
              />

            </div>

          </section>

          {/* Timeline */}

          <section className="mt-10 flex items-center gap-3">

            <Calendar className="text-emerald-600" />

            <div>

              <p className="font-semibold text-[color:var(--text)]">
                Created
              </p>

              <p className="text-[color:var(--text-muted)]">
                {new Date(sale.CreatedAt).toLocaleString()}
              </p>

            </div>

          </section>

        </div>

        {/* Footer */}

        <div className="flex items-center justify-between border-t border-[color:var(--border)] px-8 py-6">

          <div className="flex gap-3">

            <button className="inline-flex items-center gap-2 rounded-2xl border border-[color:var(--border)] px-5 py-3 font-semibold hover:bg-[color:var(--surface-hover)]">

              <Printer size={18} />

              Print

            </button>

            <button className="inline-flex items-center gap-2 rounded-2xl border border-[color:var(--border)] px-5 py-3 font-semibold hover:bg-[color:var(--surface-hover)]">

              <Download size={18} />

              PDF

            </button>

          </div>

          <button
            onClick={onClose}
            className="rounded-2xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
          >
            Close
          </button>

        </div>

      </div>

    </>
  );
}

function SummaryRow({
  label,
  value,
  large = false,
}: {
  label: string;
  value: number;
  large?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-2">

      <span className="text-[color:var(--text-muted)]">
        {label}
      </span>

      <span
        className={
          large
            ? "text-2xl font-bold text-emerald-600"
            : "font-semibold text-[color:var(--text)]"
        }
      >
        ₦{value.toLocaleString()}
      </span>

    </div>
  );
}