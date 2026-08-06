interface Props {
  status: "pending" | "received" | "cancelled";
}

export default function PurchaseStatusBadge({
  status,
}: Props) {
  const styles = {
    pending:
      "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",

    received:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",

    cancelled:
      "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${styles[status]}`}
    >
      {status}
    </span>
  );
}