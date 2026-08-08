import { useState } from "react";
import {
  X,
  UserRound,
  Mail,
  Phone,
  Lock,
  Shield,
} from "lucide-react";

import { createUser } from "@/services/user.service";
import type { User } from "@/types/user";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AddUserModal({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    role: "cashier" as User["role"],
  });

  if (!open) return null;

  function handleChange(
    field: keyof typeof form,
    value: string
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function resetForm() {
    setForm({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
      role: "cashier",
    });
  }

  function handleClose() {
    if (loading) return;

    resetForm();
    onClose();
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      await createUser({
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        password: form.password,
        role: form.role,
      });

      resetForm();
      onSuccess?.();
      onClose();
    } catch (error: any) {
      console.error("Failed to create user:", error);

      alert(
        error?.response?.data?.message ||
          "Failed to create user"
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
          max-w-2xl
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
            <div className="rounded-xl bg-blue-100 p-2.5 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
              <UserRound size={20} />
            </div>

            <div>
              <h2 className="text-lg font-bold">
                Add New User
              </h2>

              <p className="mt-1 text-sm text-[color:var(--text-muted)]">
                Create a new user account
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
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
          <div className="grid gap-5 p-6 sm:grid-cols-2">
            {/* First Name */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                First Name
              </label>

              <div className="relative">
                <UserRound
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--text-muted)]"
                />

                <input
                  type="text"
                  value={form.first_name}
                  onChange={(e) =>
                    handleChange(
                      "first_name",
                      e.target.value
                    )
                  }
                  placeholder="Enter first name"
                  required
                  minLength={2}
                  className="
                    h-11
                    w-full
                    rounded-xl
                    border
                    border-[color:var(--border)]
                    bg-[color:var(--background)]
                    pl-10
                    pr-4
                    text-sm
                    text-[color:var(--text)]
                    outline-none
                    transition
                    placeholder:text-[color:var(--text-muted)]
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-500/10
                  "
                />
              </div>
            </div>

            {/* Last Name */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Last Name
              </label>

              <input
                type="text"
                value={form.last_name}
                onChange={(e) =>
                  handleChange(
                    "last_name",
                    e.target.value
                  )
                }
                placeholder="Enter last name"
                required
                minLength={2}
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-[color:var(--border)]
                  bg-[color:var(--background)]
                  px-4
                  text-sm
                  text-[color:var(--text)]
                  outline-none
                  transition
                  placeholder:text-[color:var(--text-muted)]
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-500/10
                "
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Email
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--text-muted)]"
                />

                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    handleChange(
                      "email",
                      e.target.value
                    )
                  }
                  placeholder="user@example.com"
                  required
                  className="
                    h-11
                    w-full
                    rounded-xl
                    border
                    border-[color:var(--border)]
                    bg-[color:var(--background)]
                    pl-10
                    pr-4
                    text-sm
                    text-[color:var(--text)]
                    outline-none
                    transition
                    placeholder:text-[color:var(--text-muted)]
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-500/10
                  "
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Phone
              </label>

              <div className="relative">
                <Phone
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--text-muted)]"
                />

                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) =>
                    handleChange(
                      "phone",
                      e.target.value
                    )
                  }
                  placeholder="Optional"
                  className="
                    h-11
                    w-full
                    rounded-xl
                    border
                    border-[color:var(--border)]
                    bg-[color:var(--background)]
                    pl-10
                    pr-4
                    text-sm
                    text-[color:var(--text)]
                    outline-none
                    transition
                    placeholder:text-[color:var(--text-muted)]
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-500/10
                  "
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--text-muted)]"
                />

                <input
                  type="password"
                  value={form.password}
                  onChange={(e) =>
                    handleChange(
                      "password",
                      e.target.value
                    )
                  }
                  placeholder="Minimum 6 characters"
                  required
                  minLength={6}
                  className="
                    h-11
                    w-full
                    rounded-xl
                    border
                    border-[color:var(--border)]
                    bg-[color:var(--background)]
                    pl-10
                    pr-4
                    text-sm
                    text-[color:var(--text)]
                    outline-none
                    transition
                    placeholder:text-[color:var(--text-muted)]
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-500/10
                  "
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Role
              </label>

              <div className="relative">
                <Shield
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--text-muted)]"
                />

                <select
                  value={form.role}
                  onChange={(e) =>
                    handleChange(
                      "role",
                      e.target.value
                    )
                  }
                  className="
                    h-11
                    w-full
                    appearance-none
                    rounded-xl
                    border
                    border-[color:var(--border)]
                    bg-[color:var(--background)]
                    pl-10
                    pr-4
                    text-sm
                    text-[color:var(--text)]
                    outline-none
                    transition
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-500/10
                  "
                >
                  <option value="cashier">
                    Cashier
                  </option>

                  <option value="manager">
                    Manager
                  </option>

                  <option value="admin">
                    Administrator
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-[color:var(--border)] px-6 py-4">
            <button
              type="button"
              onClick={handleClose}
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
              {loading ? "Creating..." : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}