import { useMemo, useState } from "react";
import {
  Eye,
  CreditCard,
  Calendar,
  User,
  Receipt,
} from "lucide-react";

import type { Sale } from "@/types/sales";

import SaleDetailsModal from "./SaleDetailsModal";
import EmptySales from "./EmptySales";
import LoadingSales from "./LoadingSales";
import InventoryPagination from "@/components/inventory/InventoryPagination";

interface Props {
  sales: Sale[];
  loading?: boolean;
  page: number;
  totalPages: number;
  totalSales: number;
  onPageChange: (page: number) => void;
}

export default function SalesTable({
  sales,
  loading = false,
  page,
  totalPages,
  totalSales,
  onPageChange,
}: Props) {
  const [selectedSale, setSelectedSale] =
    useState<Sale | null>(null);

  const rows = useMemo(() => sales, [sales]);

  if (loading) {
    return <LoadingSales />;
  }

  if (!rows.length) {
    return <EmptySales />;
  }

  return (
    <>
      <div
        className="
          overflow-hidden
          rounded-[32px]
          border
          border-[color:var(--border)]
          bg-[color:var(--surface)]
          shadow-lg
        "
      >
        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead
            className="
                sticky
                top-0
                z-20
                border-b
                border-[color:var(--border)]
                bg-[color:var(--surface)]
                shadow-sm
            "
            >
              <tr>

                <th className="px-7 py-5 text-left text-xs font-bold uppercase tracking-wider text-[color:var(--text-muted)]">
                  Invoice
                </th>

                <th className="px-7 py-5 text-left text-xs font-bold uppercase tracking-wider text-[color:var(--text-muted)]">
                  Customer
                </th>

                <th className="px-7 py-5 text-left text-xs font-bold uppercase tracking-wider text-[color:var(--text-muted)]">
                  Payment
                </th>

                <th className="px-7 py-5 text-left text-xs font-bold uppercase tracking-wider text-[color:var(--text-muted)]">
                  Status
                </th>

                <th className="px-7 py-5 text-right text-xs font-bold uppercase tracking-wider text-[color:var(--text-muted)]">
                  Amount
                </th>

                <th className="px-7 py-5 text-left text-xs font-bold uppercase tracking-wider text-[color:var(--text-muted)]">
                  Date
                </th>

                <th className="px-7 py-5 text-center text-xs font-bold uppercase tracking-wider text-[color:var(--text-muted)]">
                  Action
                </th>

              </tr>
            </thead>

            <tbody className="
                divide-y
                divide-[color:var(--border)]
                bg-[color:var(--surface)]
                "
            >

              {rows.map((sale) => (
                <tr
                    key={sale.ID}
                    className="
                        group
                        transition-all
                        duration-200
                        hover:bg-[color:var(--surface-hover)]
                        hover:shadow-sm
                        "
                >
                    {/* Invoice */}

                    <td className="px-7 py-5">

                    <div className="flex items-center gap-3">

                        <div
                        className="
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-2xl
                            bg-emerald-100
                            dark:bg-emerald-500/20
                        "
                        >
                        <Receipt
                            size={20}
                            className="text-emerald-600"
                        />
                        </div>

                        <div>

                        <p className="font-bold tracking-wide text-[color:var(--text)]">
                            {sale.InvoiceNumber}
                        </p>

                        <p className="text-xs text-[color:var(--text-muted)]">
                            #{sale.ID.slice(0, 8)}
                        </p>

                        </div>

                    </div>

                    </td>

                        {/* Customer */}

                        <td className="px-7 py-5">

                        <div className="flex items-center gap-3">

                            <div
                            className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-full
                                bg-blue-100
                                dark:bg-blue-500/20
                            "
                            >
                            <User
                                size={18}
                                className="text-blue-600"
                            />
                            </div>

                            <div>

                            <p className="font-medium text-[color:var(--text)]">
                                {sale.CustomerName || "Walk-in Customer"}
                            </p>

                            <p className="text-xs text-[color:var(--text-muted)]">
                                {sale.Items.length} item{sale.Items.length !== 1 ? "s" : ""}
                            </p>

                            </div>

                        </div>

                        </td>

    {/* Payment */}

    <td className="px-7 py-5">

      <span
        className={`
          inline-flex
          items-center
          gap-2
          rounded-full
          px-4
          py-2
          text-sm
          font-semibold
          ${paymentColor(sale.PaymentMethod)}
        `}
      >
        <CreditCard size={15} />

        {sale.PaymentMethod
            .replace("_", " ")
            .replace(/\b\w/g, c => c.toUpperCase())
        }

      </span>

    </td>

    {/* Status */}

    <td className="px-7 py-5">

      <span
        className={`
          inline-flex
          items-center
          gap-2
          rounded-full
          px-4
          py-2
          text-sm
          font-semibold
          ${statusColor(sale.Status)}
        `}
      >
        <span className="h-2 w-2 rounded-full bg-current" />

        {sale.Status.charAt(0).toUpperCase() + sale.Status.slice(1)}

      </span>

    </td>

    {/* Amount */}

    <td className="px-7 py-5 text-right">

      <p className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
        {formatCurrency(sale.TotalAmount)}
      </p>

    </td>

    {/* Date */}

    <td className="px-7 py-5">

      <div className="flex items-center gap-2">

        <Calendar
          size={16}
          className="text-[color:var(--text-muted)]"
        />

        <span className="text-sm text-[color:var(--text)]">
          {formatDate(sale.CreatedAt)}
        </span>

      </div>

    </td>

    {/* Action */}

    <td className="px-7 py-5 text-center">

      <button
            onClick={() => setSelectedSale(sale)}
            className="
                inline-flex
                items-center
                gap-2
                rounded-2xl
                bg-emerald-600
                px-4
                py-2.5
                font-semibold
                text-white
                transition-all
                duration-200
                hover:scale-105
                hover:bg-emerald-700
                active:scale-95
            "
            >
            <Eye size={16} />

            View
      </button>

    </td>

  </tr>
))}

            </tbody>

          </table>

        </div>

        <div className="border-t border-[color:var(--border)] p-6">

          <InventoryPagination
            page={page}
            totalPages={totalPages}
            totalProducts={totalSales}
            onPageChange={onPageChange}
          />

        </div>

      </div>

      <SaleDetailsModal
        open={!!selectedSale}
        sale={selectedSale}
        onClose={() => setSelectedSale(null)}
      />

    </>
  );
}

function formatCurrency(amount: number) {
  return `₦${amount.toLocaleString()}`;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function paymentColor(method: string) {
  switch (method) {
    case "cash":
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300";

    case "card":
      return "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300";

    case "transfer":
      return "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300";

    default:
      return "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300";
  }
}

function statusColor(status: string) {
  switch (status) {
    case "paid":
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300";

    default:
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300";
  }
}