import { X, Mail, Phone, Shield, Calendar, UserRound } from "lucide-react";

import type { User } from "@/types/user";

interface Props {
  open: boolean;
  user: User | null;
  onClose: () => void;
}

function formatRole(role: User["role"]) {
  switch (role) {
    case "admin":
      return "Administrator";
    case "manager":
      return "Manager";
    case "cashier":
      return "Cashier";
    default:
      return role;
  }
}

function getInitials(user: User) {
  return `${user.first_name?.[0] ?? ""}${user.last_name?.[0] ?? ""}`.toUpperCase();
}

export default function UserDetailsDialog({
  open,
  user,
  onClose,
}: Props) {
  if (!open || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div
        className="
          w-full max-w-lg
          overflow-hidden
          rounded-3xl
          border border-[color:var(--border)]
          bg-[color:var(--surface)]
          shadow-[var(--shadow-lg)]
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[color:var(--border)] px-6 py-5">
          <div>
            <h2 className="text-lg font-bold">User Details</h2>

            <p className="mt-1 text-sm text-[color:var(--text-muted)]">
              View account information
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-xl
              p-2
              text-[color:var(--text-secondary)]
              transition
              hover:bg-[color:var(--surface-hover)]
              hover:text-[color:var(--text)]
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Profile */}
        <div className="px-6 py-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-lg font-bold text-white">
              {getInitials(user)}
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-xl font-bold">
                {user.first_name} {user.last_name}
              </h3>

              <p className="mt-1 text-sm text-[color:var(--text-muted)]">
                User ID: {user.id?.slice(0, 8) ?? "-"}
              </p>
            </div>
          </div>

          {/* Information */}
          <div className="mt-6 grid gap-3">
            {/* Email */}
            <div className="flex items-center gap-4 rounded-2xl border border-[color:var(--border)] p-4">
              <div className="rounded-xl bg-blue-100 p-2.5 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                <Mail size={18} />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-[color:var(--text-muted)]">
                  Email
                </p>

                <p className="mt-1 truncate text-sm font-semibold">
                  {user.email || "-"}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4 rounded-2xl border border-[color:var(--border)] p-4">
              <div className="rounded-xl bg-green-100 p-2.5 text-green-600 dark:bg-green-950/40 dark:text-green-400">
                <Phone size={18} />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[color:var(--text-muted)]">
                  Phone
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {user.phone || "-"}
                </p>
              </div>
            </div>

            {/* Role */}
            <div className="flex items-center gap-4 rounded-2xl border border-[color:var(--border)] p-4">
              <div className="rounded-xl bg-purple-100 p-2.5 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400">
                <Shield size={18} />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[color:var(--text-muted)]">
                  Role
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {formatRole(user.role)}
                </p>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-4 rounded-2xl border border-[color:var(--border)] p-4">
              <div className="rounded-xl bg-slate-100 p-2.5 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                <UserRound size={18} />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[color:var(--text-muted)]">
                  Account Status
                </p>

                <span
                  className={
                    user.is_active
                      ? "mt-1 inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-950/40 dark:text-green-400"
                      : "mt-1 inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-red-950/40 dark:text-red-400"
                  }
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      user.is_active
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  />

                  {user.is_active ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            {/* Created */}
            <div className="flex items-center gap-4 rounded-2xl border border-[color:var(--border)] p-4">
              <div className="rounded-xl bg-yellow-100 p-2.5 text-yellow-600 dark:bg-yellow-950/40 dark:text-yellow-400">
                <Calendar size={18} />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[color:var(--text-muted)]">
                  Created
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {user.created_at
                    ? new Date(user.created_at).toLocaleString()
                    : "-"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-[color:var(--border)] px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="
              rounded-xl
              bg-blue-600
              px-5
              py-2.5
              text-sm
              font-semibold
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