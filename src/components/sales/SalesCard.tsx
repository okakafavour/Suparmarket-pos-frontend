import {
  CalendarDays,
  CreditCard,
  Eye,
  Receipt,
  Trash2,
  User,
} from "lucide-react";

import type { Sale } from "@/types/sales";

interface Props {
  sale: Sale;
  onView: (sale: Sale) => void;
  onDelete: (sale: Sale) => void;
}

export default function SalesCard({
  sale,
  onView,
  onDelete,
}: Props) {
  return (
    <div className="group rounded-[28px] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="flex items-start justify-between">

        <div>

          <div className="flex items-center gap-2">

            <Receipt
              size={18}
              className="text-emerald-600"
            />

            <p className="text-sm font-semibold text-[color:var(--text-muted)]">
              Invoice
            </p>

          </div>

          <h3 className="mt-2 text-lg font-bold text-[color:var(--text)]">
            {sale.InvoiceNumber}
          </h3>

        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            sale.Status === "paid"
              ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300"
          }`}
        >
          {sale.Status.charAt(0).toUpperCase() + sale.Status.slice(1)}
        </span>

      </div>

      <div className="mt-6 space-y-4">

        <div className="flex items-center gap-3">

          <User
            size={18}
            className="text-[color:var(--text-muted)]"
          />

          <span className="text-sm text-[color:var(--text)]">
            {sale.CustomerName || "Walk-in Customer"}
          </span>

        </div>

        <div className="flex items-center gap-3">

          <CreditCard
            size={18}
            className="text-[color:var(--text-muted)]"
          />

          <span className="capitalize text-sm text-[color:var(--text)]">
            {sale.PaymentMethod
              .replace("_", " ")
              .replace(/\b\w/g, c => c.toUpperCase())}
          </span>

        </div>

        <div className="flex items-center gap-3">

          <CalendarDays
            size={18}
            className="text-[color:var(--text-muted)]"
          />

          <span className="text-sm text-[color:var(--text)]">
            {new Date(sale.CreatedAt).toLocaleDateString()}
          </span>

        </div>

      </div>

      <div className="mt-8 flex items-center justify-between border-t border-[color:var(--border)] pt-6">

        <div>

          <p className="text-xs text-[color:var(--text-muted)]">
            Total
          </p>

          <h2 className="text-2xl font-bold text-emerald-600">
            ₦{sale.TotalAmount.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h2>

        </div>

        <div className="flex gap-2">

          <button
            onClick={() => onView(sale)}
            className="rounded-xl border border-[color:var(--border)] p-3 transition hover:bg-[color:var(--surface-hover)]"
          >
            <Eye size={18} />
          </button>

          <button
            onClick={() => onDelete(sale)}
            className="rounded-xl border border-red-300 p-3 text-red-600 transition hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950/30"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>

    </div>
  );
}