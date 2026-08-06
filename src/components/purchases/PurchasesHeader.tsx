import { PackageCheck } from "lucide-react";

interface Props {
  total: number;
}

export default function PurchasesHeader({ total }: Props) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">
          Purchases
        </h1>

        <p className="mt-2 text-[color:var(--text-muted)]">
          Manage supplier purchase orders and inventory restocking.
        </p>
      </div>

      <div className="flex items-center gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-5 py-4 shadow-sm">
        <PackageCheck
          className="text-blue-600"
          size={28}
        />

        <div>
          <p className="text-xs text-[color:var(--text-muted)]">
            Total Purchases
          </p>

          <h3 className="text-xl font-bold">
            {total}
          </h3>
        </div>
      </div>
    </div>
  );
}