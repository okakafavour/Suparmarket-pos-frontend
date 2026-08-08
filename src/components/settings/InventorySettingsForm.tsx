import { useEffect, useState } from "react";
import { Package, Save } from "lucide-react";

import type {
  Settings,
  UpdateSettingsPayload,
} from "@/types/settings";

interface Props {
  settings: Settings;
  saving: boolean;
  onSave: (payload: UpdateSettingsPayload) => Promise<void>;
}

export default function InventorySettingsForm({
  settings,
  saving,
  onSave,
}: Props) {
  const [lowStockThreshold, setLowStockThreshold] =
    useState(settings.low_stock_threshold);

  useEffect(() => {
    setLowStockThreshold(settings.low_stock_threshold);
  }, [settings]);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    await onSave({
      store_name: settings.store_name,
      store_email: settings.store_email,
      store_phone: settings.store_phone,
      store_address: settings.store_address,
      currency: settings.currency,
      tax_rate: settings.tax_rate,
      low_stock_threshold: lowStockThreshold,
      timezone: settings.timezone,
      receipt_header: settings.receipt_header,
      receipt_footer: settings.receipt_footer,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)]"
    >
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-[color:var(--border)] px-6 py-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400">
          <Package size={20} />
        </div>

        <div>
          <h2 className="text-base font-bold">
            Inventory Settings
          </h2>

          <p className="mt-1 text-sm text-[color:var(--text-muted)]">
            Configure when products should be considered low in stock.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="max-w-md">
          <label
            htmlFor="low-stock-threshold"
            className="mb-2 block text-sm font-semibold"
          >
            Low Stock Threshold
          </label>

          <input
            id="low-stock-threshold"
            type="number"
            min={0}
            value={lowStockThreshold}
            onChange={(event) =>
              setLowStockThreshold(
                Number(event.target.value)
              )
            }
            className="
              h-12
              w-full
              rounded-xl
              border
              border-[color:var(--border)]
              bg-transparent
              px-4
              text-sm
              text-[color:var(--text)]
              outline-none
              transition
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-500/10
            "
          />

          <p className="mt-2 text-xs text-[color:var(--text-muted)]">
            Products with stock at or below this number will
            be considered low stock.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end border-t border-[color:var(--border)] px-6 py-4">
        <button
          type="submit"
          disabled={saving}
          className="
            inline-flex
            h-11
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-blue-600
            px-5
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-blue-700
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          <Save size={17} />

          {saving
            ? "Saving..."
            : "Save Inventory Settings"}
        </button>
      </div>
    </form>
  );
}