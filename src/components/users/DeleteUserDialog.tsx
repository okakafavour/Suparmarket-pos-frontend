import { useState } from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";

import { deleteUser } from "@/services/user.service";
import type { User } from "@/types/user";

interface Props {
  open: boolean;
  user: User | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function DeleteUserDialog({
  open,
  user,
  onClose,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);

  if (!open || !user) return null;

  async function handleDelete() {
  if (!user) return;

  try {
    setLoading(true);

    await deleteUser(user.id);

    onSuccess?.();
    onClose();
  } catch (error: any) {
    console.error("Failed to delete user:", error);

    alert(
      error?.response?.data?.message ||
        "Failed to delete user"
    );
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div
        className="
          w-full
          max-w-md
          overflow-hidden
          rounded-3xl
          border
          border-[color:var(--border)]
          bg-[color:var(--surface)]
          shadow-2xl
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[color:var(--border)] px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-red-100 p-2.5 text-red-600 dark:bg-red-950/40 dark:text-red-400">
              <AlertTriangle size={20} />
            </div>

            <div>
              <h2 className="text-lg font-bold">
                Delete User
              </h2>

              <p className="mt-1 text-sm text-[color:var(--text-muted)]">
                This action cannot be undone
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              rounded-xl
              p-2
              text-[color:var(--text-secondary)]
              transition
              hover:bg-[color:var(--surface-hover)]
              hover:text-[color:var(--text)]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-950/20">
            <p className="text-sm leading-6 text-red-700 dark:text-red-300">
              Are you sure you want to permanently delete{" "}
              <span className="font-bold">
                {user.first_name} {user.last_name}
              </span>
              ?
            </p>

            <p className="mt-2 text-sm leading-6 text-red-600/80 dark:text-red-400/80">
              The user will no longer be able to access the
              system.
            </p>
          </div>

          {/* User preview */}
          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-[color:var(--border)] p-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-bold text-white">
              {`${user.first_name?.[0] ?? ""}${
                user.last_name?.[0] ?? ""
              }`.toUpperCase()}
            </div>

            <div className="min-w-0">
              <p className="truncate font-semibold">
                {user.first_name} {user.last_name}
              </p>

              <p className="truncate text-sm text-[color:var(--text-muted)]">
                {user.email}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-[color:var(--border)] px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              rounded-xl
              border
              border-[color:var(--border)]
              px-5
              py-2.5
              text-sm
              font-semibold
              transition
              hover:bg-[color:var(--surface-hover)]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-red-600
              px-5
              py-2.5
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-red-700
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <Trash2 size={17} />

            {loading ? "Deleting..." : "Delete User"}
          </button>
        </div>
      </div>
    </div>
  );
}