import {
  Search,
  SlidersHorizontal,
} from "lucide-react";

import type {
  PaymentMethod,
} from "@/types/payment";

interface Props {
  search: string;
  setSearch: (value: string) => void;

  method: PaymentMethod | "";
  setMethod: (value: PaymentMethod | "") => void;

  status: string;
  setStatus: (value: string) => void;
}

export default function PaymentToolbar({
  search,
  setSearch,
  method,
  setMethod,
  status,
  setStatus,
}: Props) {
  return (
    <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative w-full lg:max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[color:var(--text-muted)]"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search invoice or reference..."
            className="h-12 w-full rounded-2xl border border-[color:var(--border)] bg-transparent pl-11 pr-4 text-sm outline-none transition focus:border-blue-500"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <SlidersHorizontal
            size={18}
            className="hidden text-[color:var(--text-muted)] sm:block"
          />

          {/* Method */}
          <select
            value={method}
            onChange={(e) =>
              setMethod(
                e.target.value as PaymentMethod | ""
              )
            }
            className="h-12 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 text-sm outline-none focus:border-blue-500"
          >
            <option value="">All Methods</option>

            <option value="cash">Cash</option>

            <option value="card">Card</option>

            <option value="transfer">
              Transfer
            </option>

            <option value="mobile_money">
              Mobile Money
            </option>
          </select>

          {/* Status */}
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="h-12 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 text-sm outline-none focus:border-blue-500"
          >
            <option value="">All Statuses</option>

            <option value="paid">Paid</option>

            <option value="pending">
              Pending
            </option>

            <option value="failed">
              Failed
            </option>

            <option value="refunded">
              Refunded
            </option>
          </select>
        </div>
      </div>
    </div>
  );
}