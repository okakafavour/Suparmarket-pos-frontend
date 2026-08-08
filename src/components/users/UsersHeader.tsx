import {
  Users as UsersIcon,
  UserCheck,
  UserX,
  ShieldCheck,
} from "lucide-react";

interface Props {
  total: number;
  active: number;
  inactive: number;
  admins: number;
}

export default function UsersHeader({
  total,
  active,
  inactive,
  admins,
}: Props) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
          <UsersIcon size={24} />
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Users
          </h1>

          <p className="mt-1 text-sm text-[color:var(--text-muted)]">
            Manage system users, roles, and account access.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total */}
        <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 transition hover:shadow-[var(--shadow-md)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[color:var(--text-muted)]">
                Total Users
              </p>

              <p className="mt-2 text-2xl font-bold">
                {total}
              </p>
            </div>

            <div className="rounded-xl bg-blue-100 p-3 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
              <UsersIcon size={20} />
            </div>
          </div>
        </div>

        {/* Active */}
        <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 transition hover:shadow-[var(--shadow-md)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[color:var(--text-muted)]">
                Active
              </p>

              <p className="mt-2 text-2xl font-bold">
                {active}
              </p>
            </div>

            <div className="rounded-xl bg-green-100 p-3 text-green-600 dark:bg-green-950/40 dark:text-green-400">
              <UserCheck size={20} />
            </div>
          </div>
        </div>

        {/* Inactive */}
        <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 transition hover:shadow-[var(--shadow-md)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[color:var(--text-muted)]">
                Inactive
              </p>

              <p className="mt-2 text-2xl font-bold">
                {inactive}
              </p>
            </div>

            <div className="rounded-xl bg-red-100 p-3 text-red-600 dark:bg-red-950/40 dark:text-red-400">
              <UserX size={20} />
            </div>
          </div>
        </div>

        {/* Admins */}
        <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 transition hover:shadow-[var(--shadow-md)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[color:var(--text-muted)]">
                Administrators
              </p>

              <p className="mt-2 text-2xl font-bold">
                {admins}
              </p>
            </div>

            <div className="rounded-xl bg-purple-100 p-3 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400">
              <ShieldCheck size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}