import { useEffect } from "react";
import {
  X,
  User,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  Wallet,
  Award,
} from "lucide-react";

import type { Customer } from "@/types/customers";

interface Props {
  open: boolean;
  customer: Customer | null;
  onClose: () => void;
}

export default function CustomerDetailsDialog({
  open,
  customer,
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

  if (!open || !customer) return null;

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
          max-w-5xl
          -translate-x-1/2
          -translate-y-1/2
          overflow-hidden
          rounded-[30px]
          border
          border-[color:var(--border)]
          bg-[color:var(--surface)]
          shadow-2xl
        "
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b border-[color:var(--border)] px-8 py-6">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-100 dark:bg-blue-500/20">
              <User
                size={30}
                className="text-blue-600"
              />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[color:var(--text)]">
                Customer Details
              </h2>

              <p className="mt-1 text-[color:var(--text-muted)]">
                {customer.full_name}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-2xl p-3 hover:bg-[color:var(--surface-hover)]"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}

        <div className="max-h-[70vh] overflow-y-auto p-8">

          <div className="grid gap-6 md:grid-cols-2">

            <InfoCard
              icon={<User size={18} />}
              title="Full Name"
              value={customer.full_name}
            />

            <InfoCard
              icon={<Mail size={18} />}
              title="Email"
              value={customer.email || "-"}
            />

            <InfoCard
              icon={<Phone size={18} />}
              title="Phone"
              value={customer.phone}
            />

            <InfoCard
              icon={<MapPin size={18} />}
              title="Address"
              value={customer.address || "-"}
            />

          </div>

          {/* Statistics */}

          <section className="mt-10">

            <h3 className="mb-5 text-xl font-bold text-[color:var(--text)]">
              Customer Statistics
            </h3>

            <div className="grid gap-6 md:grid-cols-3">

              <StatCard
                icon={<ShoppingBag size={22} />}
                label="Orders"
                value={customer.total_orders.toString()}
              />

              <StatCard
                icon={<Wallet size={22} />}
                label="Total Spent"
                value={`₦${customer.total_spent.toLocaleString()}`}
              />

              <StatCard
                icon={<Award size={22} />}
                label="Loyalty Points"
                value={customer.loyalty_points.toString()}
              />

            </div>

          </section>

          {/* Status */}

          <section className="mt-10">

            <h3 className="mb-5 text-xl font-bold text-[color:var(--text)]">
              Status
            </h3>

            <span
              className={`inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold ${
                customer.is_active
                  ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
                  : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  customer.is_active
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              />

              {customer.is_active ? "Active" : "Inactive"}
            </span>

          </section>

        </div>

        {/* Footer */}

        <div className="flex justify-end border-t border-[color:var(--border)] px-8 py-6">

          <button
            onClick={onClose}
            className="
              rounded-2xl
              border
              border-[color:var(--border)]
              px-6
              py-3
              font-semibold
              hover:bg-[color:var(--surface-hover)]
            "
          >
            Close
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
        <span>{title}</span>
      </div>

      <h3 className="font-semibold break-all text-[color:var(--text)]">
        {value}
      </h3>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)] p-6">

      <div className="mb-4 flex items-center gap-3 text-blue-600">
        {icon}
        <span className="font-medium">
          {label}
        </span>
      </div>

      <h2 className="text-2xl font-bold text-[color:var(--text)]">
        {value}
      </h2>

    </div>
  );
}