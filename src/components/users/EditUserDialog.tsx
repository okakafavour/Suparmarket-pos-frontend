import { useEffect, useState } from "react";
import { X } from "lucide-react";

import type { User } from "@/types/user";
import { updateUser } from "@/services/user.service";

interface Props {
  open: boolean;
  user: User | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditUserDialog({
  open,
  user,
  onClose,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    role: "cashier" as User["role"],
  });

  useEffect(() => {
    if (user) {
      setForm({
        first_name: user.first_name ?? "",
        last_name: user.last_name ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
        role: user.role,
      });
    }
  }, [user]);

  if (!open || !user) return null;

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!user) return;

    try {
      setLoading(true);

      await updateUser(user.id, form);

      onSuccess();
      onClose();
    } catch (error: any) {
      console.error("Failed to update user:", error);

      alert(
        error?.response?.data?.message ||
          "Failed to update user. Please try again."
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
          max-w-lg
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
          <div>
            <h2 className="text-lg font-bold">
              Edit User
            </h2>

            <p className="mt-1 text-sm text-[color:var(--text-muted)]">
              Update account information
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

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-5 px-6 py-6">
            {/* Name */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  First Name
                </label>

                <input
                  type="text"
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                  required
                  className="
                    h-11
                    w-full
                    rounded-xl
                    border
                    border-[color:var(--border)]
                    bg-[color:var(--background)]
                    px-4
                    text-sm
                    outline-none
                    transition
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-500/10
                  "
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Last Name
                </label>

                <input
                  type="text"
                  name="last_name"
                  value={form.last_name}
                  onChange={handleChange}
                  required
                  className="
                    h-11
                    w-full
                    rounded-xl
                    border
                    border-[color:var(--border)]
                    bg-[color:var(--background)]
                    px-4
                    text-sm
                    outline-none
                    transition
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-500/10
                  "
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-[color:var(--border)]
                  bg-[color:var(--background)]
                  px-4
                  text-sm
                  outline-none
                  transition
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-500/10
                "
              />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="08012345678"
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-[color:var(--border)]
                  bg-[color:var(--background)]
                  px-4
                  text-sm
                  outline-none
                  transition
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-500/10
                "
              />
            </div>

            {/* Role */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Role
              </label>

              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-[color:var(--border)]
                  bg-[color:var(--background)]
                  px-4
                  text-sm
                  outline-none
                  transition
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-500/10
                "
              >
                <option value="admin">
                  Administrator
                </option>

                <option value="manager">
                  Manager
                </option>

                <option value="cashier">
                  Cashier
                </option>
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-[color:var(--border)] px-6 py-5">
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
              type="submit"
              disabled={loading}
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
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}