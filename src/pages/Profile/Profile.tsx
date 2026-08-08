import { useMemo } from "react";
import {
  Mail,
  Phone,
  Shield,
  CalendarDays,
  UserRound,
  MapPin,
  Edit3,
} from "lucide-react";

import DashboardLayout from "@/layouts/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";

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
  const { user } = useAuth();

  const initials = useMemo(() => {
    if (!user) return "A";

    return `${user.first_name?.[0] ?? ""}${
      user.last_name?.[0] ?? ""
    }`.toUpperCase();
  }, [user]);

  const fullName = user
    ? `${user.first_name} ${user.last_name}`
    : "Administrator";

  if (!user) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="w-full max-w-md rounded-3xl border border-[var(--border)] bg-[color:var(--surface)] p-8 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400">
              <UserRound size={28} />
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
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-[color:var(--text)]">
            My Profile
          </h1>

          <p className="mt-1 text-sm text-[color:var(--text-muted)]">
            View and manage your account information.
          </p>
        </div>

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

                      {user.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <button
                type="button"
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
                        {user.is_active ? "Active" : "Inactive"}
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
    </DashboardLayout>
  );
}