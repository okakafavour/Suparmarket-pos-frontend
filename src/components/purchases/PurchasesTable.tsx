import PurchaseRow from "./PurchaseRow";

import type { Purchase } from "@/types/purchase";

interface Props {
  purchases: Purchase[];
  onView: (purchase: Purchase) => void;
  onReceive: (purchase: Purchase) => void;
  onDelete: (purchase: Purchase) => void;
}

export default function PurchasesTable({
  purchases,
  onView,
  onReceive,
  onDelete,
}: Props) {
  if (purchases.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-[color:var(--border)] bg-[color:var(--surface)] py-20 text-center">
        <h3 className="text-xl font-semibold">
          No Purchases Found
        </h3>

        <p className="mt-2 text-[color:var(--text-muted)]">
          Create your first purchase order to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-[color:var(--surface-hover)]">
            <tr className="text-left text-sm font-semibold">
              <th className="px-6 py-4">Invoice</th>
              <th className="px-6 py-4">Supplier</th>
              <th className="px-6 py-4">Items</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Created</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {purchases.map((purchase) => (
              <PurchaseRow
                key={purchase.id}
                purchase={purchase}
                onView={onView}
                onReceive={onReceive}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}