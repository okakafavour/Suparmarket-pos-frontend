import {
  CreditCard,
  CheckCircle,
  Clock,
  Wallet,
} from "lucide-react";

interface Props {
  total: number;
}

export default function PaymentsHeader({
  total,
}: Props) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600/15">
          <CreditCard
            size={24}
            className="text-blue-600 dark:text-blue-400"
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-[color:var(--text)]">
            Payments
          </h1>

          <p className="mt-1 text-sm text-[color:var(--text-muted)]">
            Manage payments, transactions, and payment records.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Payments */}
        <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[color:var(--text-muted)]">
                Total Payments
              </p>

              <p className="mt-2 text-2xl font-bold">
                {total}
              </p>
            </div>

            <div className="rounded-xl bg-blue-100 p-3 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
              <CreditCard size={20} />
            </div>
          </div>
        </div>

        {/* Paid */}
        <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[color:var(--text-muted)]">
                Paid
              </p>

              <p className="mt-2 text-2xl font-bold">
                —
              </p>
            </div>

            <div className="rounded-xl bg-green-100 p-3 text-green-600 dark:bg-green-950/40 dark:text-green-400">
              <CheckCircle size={20} />
            </div>
          </div>
        </div>

        {/* Pending */}
        <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[color:var(--text-muted)]">
                Pending
              </p>

              <p className="mt-2 text-2xl font-bold">
                —
              </p>
            </div>

            <div className="rounded-xl bg-yellow-100 p-3 text-yellow-600 dark:bg-yellow-950/40 dark:text-yellow-400">
              <Clock size={20} />
            </div>
          </div>
        </div>

        {/* Revenue */}
        <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[color:var(--text-muted)]">
                Revenue
              </p>

              <p className="mt-2 text-2xl font-bold">
                —
              </p>
            </div>

            <div className="rounded-xl bg-purple-100 p-3 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400">
              <Wallet size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}