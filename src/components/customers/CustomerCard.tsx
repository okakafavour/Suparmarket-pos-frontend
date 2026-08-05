import {
  User,
  Mail,
  Phone,
  Wallet,
  Star,
  ShoppingBag,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import type { Customer } from "@/types/customers";

interface Props {
  customer: Customer;
  onView: (customer: Customer) => void;
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
}

export default function CustomerCard({
  customer,
  onView,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="group rounded-[28px] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Header */}

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-500/20">

            <User
              size={26}
              className="text-blue-600"
            />

          </div>

          <div>

            <h3 className="text-lg font-bold text-[color:var(--text)]">
              {customer.full_name}
            </h3>

            <p className="text-sm text-[color:var(--text-muted)]">
              Customer
            </p>

          </div>

        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            customer.is_active
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
              : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300"
          }`}
        >
          {customer.is_active ? "Active" : "Inactive"}
        </span>

      </div>

      {/* Information */}

      <div className="mt-6 space-y-4">

        <div className="flex items-center gap-3">

          <Mail
            size={18}
            className="text-[color:var(--text-muted)]"
          />

          <span className="truncate text-sm text-[color:var(--text)]">
            {customer.email || "No Email"}
          </span>

        </div>

        <div className="flex items-center gap-3">

          <Phone
            size={18}
            className="text-[color:var(--text-muted)]"
          />

          <span className="text-sm text-[color:var(--text)]">
            {customer.phone}
          </span>

        </div>

      </div>

      {/* Statistics */}

      <div className="mt-8 grid grid-cols-3 gap-3">

        <div className="rounded-2xl bg-[color:var(--background)] p-3">

          <div className="flex items-center gap-2">

            <ShoppingBag
              size={16}
              className="text-blue-600"
            />

            <span className="text-xs text-[color:var(--text-muted)]">
              Orders
            </span>

          </div>

          <h4 className="mt-2 text-lg font-bold">
            {customer.total_orders}
          </h4>

        </div>

        <div className="rounded-2xl bg-[color:var(--background)] p-3">

          <div className="flex items-center gap-2">

            <Wallet
              size={16}
              className="text-emerald-600"
            />

            <span className="text-xs text-[color:var(--text-muted)]">
              Spent
            </span>

          </div>

          <h4 className="mt-2 text-lg font-bold">
            ₦{customer.total_spent.toLocaleString()}
          </h4>

        </div>

        <div className="rounded-2xl bg-[color:var(--background)] p-3">

          <div className="flex items-center gap-2">

            <Star
              size={16}
              className="text-amber-500"
            />

            <span className="text-xs text-[color:var(--text-muted)]">
              Points
            </span>

          </div>

          <h4 className="mt-2 text-lg font-bold">
            {customer.loyalty_points}
          </h4>

        </div>

      </div>

      {/* Actions */}

      <div className="mt-8 flex justify-end gap-2">

        <button
          onClick={() => onView(customer)}
          className="rounded-xl border border-[color:var(--border)] p-3 transition hover:bg-[color:var(--surface-hover)]"
        >
          <Eye size={18} />
        </button>

        <button
          onClick={() => onEdit(customer)}
          className="rounded-xl border border-blue-300 p-3 text-blue-600 transition hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-950/30"
        >
          <Pencil size={18} />
        </button>

        <button
          onClick={() => onDelete(customer)}
          className="rounded-xl border border-red-300 p-3 text-red-600 transition hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950/30"
        >
          <Trash2 size={18} />
        </button>

      </div>

    </div>
  );
}