import type { PaymentStatus } from "@/types/payment";

interface Props {
  status: PaymentStatus;
}

export default function PaymentStatusBadge({
  status,
}: Props) {
  const styles = {
    paid: "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400",
    pending:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-400",
    failed:
      "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400",
    refunded:
      "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400",
  };

  const labels = {
    paid: "Paid",
    pending: "Pending",
    failed: "Failed",
    refunded: "Refunded",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}