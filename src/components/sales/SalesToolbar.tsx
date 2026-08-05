import {
  Search,
  Download,
  Plus,
  CreditCard,
  CheckCircle,
  ArrowUpDown,
} from "lucide-react";

import type {
  PaymentMethod,
  SaleStatus,
} from "@/types/sales";

interface Props {
  search: string;
  onSearch: (value: string) => void;

  payment: PaymentMethod | "";
  onPaymentChange: (value: PaymentMethod | "") => void;

  status: SaleStatus | "";
  onStatusChange: (value: SaleStatus | "") => void;

  sort: string;
  onSortChange: (value: string) => void;

  onAddSale: () => void;
  onExport: () => void;
}

export default function SalesToolbar({
  search,
  onSearch,
  payment,
  onPaymentChange,
  status,
  onStatusChange,
  sort,
  onSortChange,
  onAddSale,
  onExport,
}: Props) {
  return (
    <div className="rounded-[30px] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-sm">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-1 flex-wrap gap-3">

          {/* Search */}

          <div className="relative min-w-[280px] flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[color:var(--text-muted)]"
            />

            <input
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search invoice or customer..."
              className="h-12 w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)] pl-11 pr-4 outline-none focus:border-emerald-500"
            />
          </div>

          {/* Payment */}

          <div className="relative">
            <CreditCard
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[color:var(--text-muted)]"
            />

            <select
              value={payment}
              onChange={(e) =>
                onPaymentChange(
                  e.target.value as PaymentMethod | ""
                )
              }
              className="h-12 rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)] pl-11 pr-5"
            >
              <option value="">All Payments</option>
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="transfer">Transfer</option>
              <option value="mobile_money">
                Mobile Money
              </option>
            </select>
          </div>

          {/* Status */}

          <div className="relative">
            <CheckCircle
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[color:var(--text-muted)]"
            />

            <select
              value={status}
              onChange={(e) =>
                onStatusChange(
                  e.target.value as SaleStatus | ""
                )
              }
              className="h-12 rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)] pl-11 pr-5"
            >
              <option value="">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          {/* Sort */}

          <div className="relative">
            <ArrowUpDown
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[color:var(--text-muted)]"
            />

            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value)}
              className="h-12 rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)] pl-11 pr-5"
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
              <option value="highest">Highest Amount</option>
              <option value="lowest">Lowest Amount</option>
            </select>
          </div>

        </div>

        <div className="flex gap-3">

          <button
            onClick={onExport}
            className="flex h-12 items-center gap-2 rounded-2xl border border-[color:var(--border)] px-5 hover:bg-[color:var(--surface-hover)]"
          >
            <Download size={18} />
            Export
          </button>

          <button
            onClick={onAddSale}
            className="flex h-12 items-center gap-2 rounded-2xl bg-emerald-600 px-5 font-semibold text-white hover:bg-emerald-700"
          >
            <Plus size={18} />
            New Sale
          </button>

        </div>
      </div>
    </div>
  );
}