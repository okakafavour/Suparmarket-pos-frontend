import { useEffect, useState } from "react";
import { FileText, Save } from "lucide-react";

import type {
  Settings,
  UpdateSettingsPayload,
} from "@/types/settings";

interface Props {
  settings: Settings;
  saving: boolean;
  onSave: (payload: UpdateSettingsPayload) => Promise<void>;
}

export default function ReceiptSettingsForm({
  settings,
  saving,
  onSave,
}: Props) {
  const [receiptHeader, setReceiptHeader] = useState(
    settings.receipt_header ?? ""
  );

  const [receiptFooter, setReceiptFooter] = useState(
    settings.receipt_footer ?? ""
  );

  useEffect(() => {
    setReceiptHeader(settings.receipt_header ?? "");
    setReceiptFooter(settings.receipt_footer ?? "");
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
      low_stock_threshold: settings.low_stock_threshold,
      timezone: settings.timezone,
      receipt_header: receiptHeader,
      receipt_footer: receiptFooter,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)]"
    >
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-[color:var(--border)] px-6 py-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400">
          <FileText size={20} />
        </div>

        <div>
          <h2 className="text-base font-bold">
            Receipt Settings
          </h2>

          <p className="mt-1 text-sm text-[color:var(--text-muted)]">
            Customize the information displayed on customer receipts.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="grid gap-5 p-6">
        {/* Receipt Header */}
        <div>
          <label
            htmlFor="receipt-header"
            className="mb-2 block text-sm font-semibold"
          >
            Receipt Header
          </label>

          <input
            id="receipt-header"
            type="text"
            value={receiptHeader}
            onChange={(event) =>
              setReceiptHeader(event.target.value)
            }
            placeholder="e.g. StockFlow Supermarket"
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
              placeholder:text-[color:var(--text-muted)]
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-500/10
            "
          />

          <p className="mt-2 text-xs text-[color:var(--text-muted)]">
            This appears at the top of printed receipts.
          </p>
        </div>

        {/* Receipt Footer */}
        <div>
          <label
            htmlFor="receipt-footer"
            className="mb-2 block text-sm font-semibold"
          >
            Receipt Footer
          </label>

          <textarea
            id="receipt-footer"
            value={receiptFooter}
            onChange={(event) =>
              setReceiptFooter(event.target.value)
            }
            placeholder="Thank you for shopping with us."
            rows={4}
            className="
              w-full
              resize-none
              rounded-xl
              border
              border-[color:var(--border)]
              bg-transparent
              px-4
              py-3
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

          <p className="mt-2 text-xs text-[color:var(--text-muted)]">
            This appears at the bottom of printed receipts.
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

          {saving ? "Saving..." : "Save Receipt Settings"}
        </button>
      </div>
    </form>
  );
}