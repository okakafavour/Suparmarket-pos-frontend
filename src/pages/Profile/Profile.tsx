import { useMemo, useState } from "react";
import {
  Mail,
  Phone,
  Shield,
  CalendarDays,
  UserRound,
  MapPin,
  Edit3,
  X,
  Save,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import DashboardLayout from "@/layouts/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { updateUser } from "@/services/user.service";

import type { User } from "@/types/user";

function formatRole(role?: string) {
  if (!role) return "Administrator";

  return role.charAt(0).toUpperCase() + role.slice(1);
}

function formatDate(date?: string) {
  if (!date) return "-";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "-";
  }

  return parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Profile() {
  const { user, login, token } = useAuth();

  const [editOpen, setEditOpen] = useState(false);

  const [saving, setSaving] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  const initials = useMemo(() => {
    if (!user) return "A";

    return `${user.first_name?.[0] ?? ""}${
      user.last_name?.[0] ?? ""
    }`.toUpperCase();
  }, [user]);

  const fullName = user
    ? `${user.first_name} ${user.last_name}`
    : "Administrator";

  function openEditForm() {
    if (!user) return;

    setForm({
      first_name: user.first_name ?? "",
      last_name: user.last_name ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
    });

    setErrorMessage("");
    setSuccessMessage("");
    setEditOpen(true);
  }

  function closeEditForm() {
    if (saving) return;

    setEditOpen(false);
    setErrorMessage("");
  }

  function handleChange(
    field: keyof typeof form,
    value: string
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  async function handleSaveProfile() {
    if (!user || !token) {
      setErrorMessage(
        "Your session has expired. Please log in again."
      );
      return;
    }

    if (!form.first_name.trim()) {
      setErrorMessage("First name is required.");
      return;
    }

    if (!form.last_name.trim()) {
      setErrorMessage("Last name is required.");
      return;
    }

    if (!form.email.trim()) {
      setErrorMessage("Email address is required.");
      return;
    }

    try {
      setSaving(true);
      setErrorMessage("");
      setSuccessMessage("");

      const payload = {
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        role: user.role,
      };

      await updateUser(user.id, payload);

      /*
       * Keep the current user in sync with the backend.
       *
       * The backend PUT endpoint currently returns only:
       * {
       *   success: true,
       *   message: "User updated successfully"
       * }
       *
       * So we update the existing user object locally.
       */
      const updatedUser: User = {
        ...user,
        first_name: payload.first_name,
        last_name: payload.last_name,
        email: payload.email,
        phone: payload.phone,
      };

      /*
       * login() stores the updated user in:
       * - React state
       * - localStorage
       */
      login(token, updatedUser);

      setSuccessMessage(
        "Your profile has been updated successfully."
      );

      setEditOpen(false);

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error(
        "Failed to update profile:",
        error
      );

      setErrorMessage(
        "Failed to update your profile. Please try again."
      );
    } finally {
      setSaving(false);
    }
  }

  if (!user) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400">
              <AlertCircle size={28} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-[color:var(--text)]">
              Profile unavailable
            </h2>

            <p className="mt-2 text-sm text-[color:var(--text-muted)]">
              We could not find your account information.
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-[color:var(--text)]">
            My Profile
          </h1>

          <p className="mt-1 text-sm text-[color:var(--text-muted)]">
            View and manage your account information.
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 dark:border-green-900 dark:bg-green-950/20">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400">
              <CheckCircle2 size={18} />
            </div>

            <p className="text-sm font-medium text-green-700 dark:text-green-400">
              {successMessage}
            </p>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && !editOpen && (
          <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 dark:border-red-900 dark:bg-red-950/20">
            <AlertCircle
              size={18}
              className="shrink-0 text-red-600 dark:text-red-400"
            />

            <p className="text-sm font-medium text-red-700 dark:text-red-400">
              {errorMessage}
            </p>
          </div>
        )}

        {/* Profile Hero */}
        <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[color:var(--surface)] shadow-sm">

          {/* Cover */}
          <div className="h-36 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600" />

          {/* Profile Information */}
          <div className="px-6 pb-6 sm:px-8">
            <div className="-mt-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">

                {/* Avatar */}
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl border-4 border-[color:var(--surface)] bg-gradient-to-r from-blue-600 to-indigo-600 text-2xl font-bold text-white shadow-xl">
                  {initials}
                </div>

                {/* Name */}
                <div className="pb-1">
                  <h2 className="text-2xl font-bold text-[color:var(--text)]">
                    {fullName}
                  </h2>

                  <div className="mt-2 flex flex-wrap items-center gap-2">

                    {/* Role */}
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1.5 text-xs font-semibold text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
                      <Shield size={13} />
                      {formatRole(user.role)}
                    </span>

                    {/* Status */}
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

                      {user.is_active
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <button
                type="button"
                onClick={openEditForm}
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-[var(--border)]
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-[color:var(--text)]
                  transition
                  hover:bg-[color:var(--surface-hover)]
                "
              >
                <Edit3 size={16} />

                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="grid gap-6 lg:grid-cols-3">

          {/* Contact Information */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-[var(--border)] bg-[color:var(--surface)] p-6 shadow-sm">

              <div>
                <h2 className="text-lg font-bold text-[color:var(--text)]">
                  Account Information
                </h2>

                <p className="mt-1 text-sm text-[color:var(--text-muted)]">
                  Your personal account details.
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                {/* First Name */}
                <div className="rounded-2xl border border-[var(--border)] p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-blue-100 p-2.5 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                      <UserRound size={18} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wide text-[color:var(--text-muted)]">
                        First Name
                      </p>

                      <p className="mt-1 truncate text-sm font-semibold text-[color:var(--text)]">
                        {user.first_name || "-"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Last Name */}
                <div className="rounded-2xl border border-[var(--border)] p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-indigo-100 p-2.5 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
                      <UserRound size={18} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wide text-[color:var(--text-muted)]">
                        Last Name
                      </p>

                      <p className="mt-1 truncate text-sm font-semibold text-[color:var(--text)]">
                        {user.last_name || "-"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="rounded-2xl border border-[var(--border)] p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-green-100 p-2.5 text-green-600 dark:bg-green-950/40 dark:text-green-400">
                      <Mail size={18} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wide text-[color:var(--text-muted)]">
                        Email Address
                      </p>

                      <p className="mt-1 truncate text-sm font-semibold text-[color:var(--text)]">
                        {user.email || "-"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="rounded-2xl border border-[var(--border)] p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-orange-100 p-2.5 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400">
                      <Phone size={18} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wide text-[color:var(--text-muted)]">
                        Phone Number
                      </p>

                      <p className="mt-1 truncate text-sm font-semibold text-[color:var(--text)]">
                        {user.phone || "-"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Role */}
                <div className="rounded-2xl border border-[var(--border)] p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-purple-100 p-2.5 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400">
                      <Shield size={18} />
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-[color:var(--text-muted)]">
                        Role
                      </p>

                      <p className="mt-1 text-sm font-semibold text-[color:var(--text)]">
                        {formatRole(user.role)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Account Status */}
                <div className="rounded-2xl border border-[var(--border)] p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-slate-100 p-2.5 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      <UserRound size={18} />
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-[color:var(--text-muted)]">
                        Account Status
                      </p>

                      <p
                        className={`mt-1 text-sm font-semibold ${
                          user.is_active
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {user.is_active
                          ? "Active"
                          : "Inactive"}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Account Summary */}
          <div>
            <div className="rounded-3xl border border-[var(--border)] bg-[color:var(--surface)] p-6 shadow-sm">

              <h2 className="text-lg font-bold text-[color:var(--text)]">
                Account Summary
              </h2>

              <p className="mt-1 text-sm text-[color:var(--text-muted)]">
                Information about your account.
              </p>

              <div className="mt-6 space-y-4">

                {/* Account Created */}
                <div className="rounded-2xl bg-[color:var(--background)] p-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-yellow-100 p-2.5 text-yellow-600 dark:bg-yellow-950/40 dark:text-yellow-400">
                      <CalendarDays size={18} />
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-[color:var(--text-muted)]">
                        Account Created
                      </p>

                      <p className="mt-1 text-sm font-semibold text-[color:var(--text)]">
                        {formatDate(user.created_at)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* User ID */}
                <div className="rounded-2xl bg-[color:var(--background)] p-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-blue-100 p-2.5 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                      <UserRound size={18} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wide text-[color:var(--text-muted)]">
                        User ID
                      </p>

                      <p className="mt-1 break-all text-sm font-semibold text-[color:var(--text)]">
                        {user.id || "-"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="rounded-2xl bg-[color:var(--background)] p-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-red-100 p-2.5 text-red-600 dark:bg-red-950/40 dark:text-red-400">
                      <MapPin size={18} />
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-[color:var(--text-muted)]">
                        Location
                      </p>

                      <p className="mt-1 text-sm font-semibold text-[color:var(--text)]">
                        Nigeria
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Edit Profile Modal */}
      {editOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">

          <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-[var(--border)] bg-[color:var(--surface)] shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-5">

              <div>
                <h2 className="text-xl font-bold text-[color:var(--text)]">
                  Edit Profile
                </h2>

                <p className="mt-1 text-sm text-[color:var(--text-muted)]">
                  Update your personal account information.
                </p>
              </div>

              <button
                type="button"
                onClick={closeEditForm}
                disabled={saving}
                className="rounded-xl p-2 transition hover:bg-[color:var(--surface-hover)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">

              {/* Error */}
              {errorMessage && (
                <div className="mb-5 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 dark:border-red-900 dark:bg-red-950/20">
                  <AlertCircle
                    size={18}
                    className="shrink-0 text-red-600 dark:text-red-400"
                  />

                  <p className="text-sm font-medium text-red-700 dark:text-red-400">
                    {errorMessage}
                  </p>
                </div>
              )}

              <div className="grid gap-5 sm:grid-cols-2">

                {/* First Name */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[color:var(--text)]">
                    First Name
                  </label>

                  <input
                    type="text"
                    value={form.first_name}
                    onChange={(event) =>
                      handleChange(
                        "first_name",
                        event.target.value
                      )
                    }
                    disabled={saving}
                    className="h-12 w-full rounded-xl border border-[var(--border)] bg-[color:var(--background)] px-4 text-sm text-[color:var(--text)] outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                    placeholder="First name"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[color:var(--text)]">
                    Last Name
                  </label>

                  <input
                    type="text"
                    value={form.last_name}
                    onChange={(event) =>
                      handleChange(
                        "last_name",
                        event.target.value
                      )
                    }
                    disabled={saving}
                    className="h-12 w-full rounded-xl border border-[var(--border)] bg-[color:var(--background)] px-4 text-sm text-[color:var(--text)] outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                    placeholder="Last name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[color:var(--text)]">
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      handleChange(
                        "email",
                        event.target.value
                      )
                    }
                    disabled={saving}
                    className="h-12 w-full rounded-xl border border-[var(--border)] bg-[color:var(--background)] px-4 text-sm text-[color:var(--text)] outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                    placeholder="Email address"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[color:var(--text)]">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(event) =>
                      handleChange(
                        "phone",
                        event.target.value
                      )
                    }
                    disabled={saving}
                    className="h-12 w-full rounded-xl border border-[var(--border)] bg-[color:var(--background)] px-4 text-sm text-[color:var(--text)] outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                    placeholder="Phone number"
                  />
                </div>

                {/* Role */}
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-[color:var(--text)]">
                    Role
                  </label>

                  <div className="flex h-12 items-center rounded-xl border border-[var(--border)] bg-[color:var(--background)] px-4 text-sm font-medium text-[color:var(--text-muted)]">
                    <Shield size={17} className="mr-2" />

                    {formatRole(user.role)}

                    <span className="ml-auto text-xs">
                      Managed by administrator
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col-reverse gap-3 border-t border-[var(--border)] px-6 py-5 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={closeEditForm}
                disabled={saving}
                className="rounded-xl border border-[var(--border)] px-5 py-2.5 text-sm font-semibold text-[color:var(--text)] transition hover:bg-[color:var(--surface-hover)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSaveProfile}
                disabled={saving}
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Save Changes
                  </>
                )}
              </button>

            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}