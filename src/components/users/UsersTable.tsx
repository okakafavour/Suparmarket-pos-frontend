import {
  Edit3,
  Eye,
  Trash2,
  UserCheck,
  UserX,
} from "lucide-react";

import type { User } from "@/types/user";

interface Props {
  users: User[];

  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onToggleStatus: (user: User) => void;
  onDelete: (user: User) => void;
}

function formatRole(role: User["role"]) {
  switch (role) {
    case "admin":
      return "Admin";

    case "manager":
      return "Manager";

    case "cashier":
      return "Cashier";

    default:
      return role;
  }
}

function getInitials(user: User) {
  const first = user.first_name?.[0] ?? "";
  const last = user.last_name?.[0] ?? "";

  return `${first}${last}`.toUpperCase() || "U";
}

export default function UsersTable({
  users,
  onView,
  onEdit,
  onToggleStatus,
  onDelete,
}: Props) {
  if (users.length === 0) {
    return (
      <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-6 py-14 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[color:var(--surface-2)] text-[color:var(--text-muted)]">
          <Eye size={24} />
        </div>

        <h3 className="mt-4 text-lg font-semibold">
          No users found
        </h3>

        <p className="mt-1 text-sm text-[color:var(--text-muted)]">
          There are no users matching your current filters.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px]">
          <thead>
            <tr className="border-b border-[color:var(--border)] bg-[color:var(--surface-2)] text-left">
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[color:var(--text-muted)]">
                User
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[color:var(--text-muted)]">
                Email
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[color:var(--text-muted)]">
                Phone
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[color:var(--text-muted)]">
                Role
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[color:var(--text-muted)]">
                Status
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[color:var(--text-muted)]">
                Created
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-[color:var(--text-muted)]">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[color:var(--border)]">
            {users.map((user) => (
              <tr
                key={user.id}
                className="transition-colors hover:bg-[color:var(--surface-hover)]"
              >
                {/* User */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-bold text-white">
                      {getInitials(user)}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-semibold text-[color:var(--text)]">
                        {user.first_name} {user.last_name}
                      </p>

                      <p className="mt-1 text-xs text-[color:var(--text-muted)]">
                        User ID: {user.id?.slice(0, 8) ?? "-"}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Email */}
                <td className="px-6 py-5 text-sm text-[color:var(--text-secondary)]">
                  {user.email || "-"}
                </td>

                {/* Phone */}
                <td className="px-6 py-5 text-sm text-[color:var(--text-secondary)]">
                  {user.phone || "-"}
                </td>

                {/* Role */}
                <td className="px-6 py-5">
                  <span
                    className={`
                      inline-flex rounded-full px-3 py-1.5
                      text-xs font-semibold
                      ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400"
                          : user.role === "manager"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400"
                            : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      }
                    `}
                  >
                    {formatRole(user.role)}
                  </span>
                </td>

                {/* Status */}
                <td className="px-6 py-5">
                  <span
                    className={
                      user.is_active
                        ? "inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700 dark:bg-green-950/40 dark:text-green-400"
                        : "inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1.5 text-xs font-semibold text-red-700 dark:bg-red-950/40 dark:text-red-400"
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
                </td>

                {/* Created */}
                <td className="whitespace-nowrap px-6 py-5 text-sm text-[color:var(--text-secondary)]">
                  {user.created_at
                    ? new Date(user.created_at).toLocaleDateString()
                    : "-"}
                </td>

                {/* Actions */}
                <td className="px-6 py-5">
                  <div className="flex justify-end gap-2">
                    {/* View */}
                    <button
                      type="button"
                      onClick={() => onView(user)}
                      title="View user"
                      aria-label={`View ${user.first_name} ${user.last_name}`}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-[color:var(--border)] text-[color:var(--icon)] transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/30 dark:hover:text-blue-400"
                    >
                      <Eye size={17} />
                    </button>

                    {/* Edit */}
                    <button
                      type="button"
                      onClick={() => onEdit(user)}
                      title="Edit user"
                      aria-label={`Edit ${user.first_name} ${user.last_name}`}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-200 text-blue-600 transition hover:bg-blue-50 dark:border-blue-900 dark:text-blue-400 dark:hover:bg-blue-950/30"
                    >
                      <Edit3 size={17} />
                    </button>

                    {/* Activate / Deactivate */}
                    <button
                      type="button"
                      onClick={() => onToggleStatus(user)}
                      title={
                        user.is_active
                          ? "Deactivate user"
                          : "Activate user"
                      }
                      aria-label={
                        user.is_active
                          ? `Deactivate ${user.first_name} ${user.last_name}`
                          : `Activate ${user.first_name} ${user.last_name}`
                      }
                      className={
                        user.is_active
                          ? "flex h-9 w-9 items-center justify-center rounded-xl border border-yellow-300 text-yellow-600 transition hover:bg-yellow-50 dark:border-yellow-800 dark:text-yellow-400 dark:hover:bg-yellow-950/30"
                          : "flex h-9 w-9 items-center justify-center rounded-xl border border-green-300 text-green-600 transition hover:bg-green-50 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-950/30"
                      }
                    >
                      {user.is_active ? (
                        <UserX size={17} />
                      ) : (
                        <UserCheck size={17} />
                      )}
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => onDelete(user)}
                      title="Delete user"
                      aria-label={`Delete ${user.first_name} ${user.last_name}`}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-200 text-red-600 transition hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/30"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}