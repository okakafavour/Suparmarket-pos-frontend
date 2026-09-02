import { useEffect, useState } from "react";
import { Building2, Save } from "lucide-react";

import type {
  Settings,
  UpdateSettingsPayload,
} from "@/types/settings";

import {
  supportedCurrencies,
} from "@/lib/currencies";

interface Props {
  settings: Settings;
  saving: boolean;
  onSave: (
    payload: UpdateSettingsPayload
  ) => Promise<void>;
}

export default function StoreSettingsForm({
  settings,
  saving,
  onSave,
}: Props) {
  const [storeName, setStoreName] = useState(
    settings.store_name
  );

  const [storeEmail, setStoreEmail] = useState(
    settings.store_email
  );

  const [storePhone, setStorePhone] = useState(
    settings.store_phone
  );

  const [storeAddress, setStoreAddress] = useState(
    settings.store_address
  );

  const [currency, setCurrency] = useState(
    settings.currency
  );

  const [taxRate, setTaxRate] = useState(
    settings.tax_rate
  );

  const [timezone, setTimezone] = useState(
    settings.timezone
  );

  useEffect(() => {
    setStoreName(settings.store_name);
    setStoreEmail(settings.store_email);
    setStorePhone(settings.store_phone);
    setStoreAddress(settings.store_address);
    setCurrency(settings.currency);
    setTaxRate(settings.tax_rate);
    setTimezone(settings.timezone);
  }, [settings]);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    await onSave({
      store_name: storeName,
      store_email: storeEmail,
      store_phone: storePhone,
      store_address: storeAddress,
      currency,
      tax_rate: Number(taxRate),
      low_stock_threshold:
        settings.low_stock_threshold,
      timezone,
      receipt_header:
        settings.receipt_header,
      receipt_footer:
        settings.receipt_footer,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)]"
    >
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-[color:var(--border)] px-6 py-5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
          <Building2 size={20} />
        </div>

        <div>
          <h2 className="text-base font-bold">
            Store Information
          </h2>

          <p className="mt-1 text-sm text-[color:var(--text-muted)]">
            Manage your supermarket's basic information.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="grid gap-5 p-6 md:grid-cols-2">
        {/* Store Name */}
        <div className="md:col-span-2">
          <label
            htmlFor="store-name"
            className="mb-2 block text-sm font-semibold"
          >
            Store Name
          </label>

          <input
            id="store-name"
            type="text"
            value={storeName}
            onChange={(event) =>
              setStoreName(event.target.value)
            }
            placeholder="StockFlow Supermarket"
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
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="store-email"
            className="mb-2 block text-sm font-semibold"
          >
            Store Email
          </label>

          <input
            id="store-email"
            type="email"
            value={storeEmail}
            onChange={(event) =>
              setStoreEmail(event.target.value)
            }
            placeholder="info@stockflow.com"
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
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="store-phone"
            className="mb-2 block text-sm font-semibold"
          >
            Store Phone
          </label>

          <input
            id="store-phone"
            type="tel"
            value={storePhone}
            onChange={(event) =>
              setStorePhone(event.target.value)
            }
            placeholder="08012345678"
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
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label
            htmlFor="store-address"
            className="mb-2 block text-sm font-semibold"
          >
            Store Address
          </label>

          <textarea
            id="store-address"
            value={storeAddress}
            onChange={(event) =>
              setStoreAddress(event.target.value)
            }
            placeholder="Lagos, Nigeria"
            rows={3}
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
        </div>

        {/* Currency */}
        <div>
          <label
            htmlFor="currency"
            className="mb-2 block text-sm font-semibold"
          >
            Currency
          </label>

          <select
            id="currency"
            value={currency}
            onChange={(event) =>
              setCurrency(event.target.value)
            }
            className="
              h-12
              w-full
              rounded-xl
              border
              border-[color:var(--border)]
              bg-[color:var(--surface)]
              px-4
              text-sm
              text-[color:var(--text)]
              outline-none
              focus:border-blue-500
            "
          >
            {supportedCurrencies.map(
              (currencyOption) => (
                <option
                  key={currencyOption.code}
                  value={currencyOption.code}
                >
                  {currencyOption.code} —{" "}
                  {currencyOption.name} (
                  {currencyOption.symbol})
                </option>
              )
            )}
          </select>
        </div>

        {/* Tax Rate */}
        <div>
          <label
            htmlFor="tax-rate"
            className="mb-2 block text-sm font-semibold"
          >
            Tax Rate (%)
          </label>

          <input
            id="tax-rate"
            type="number"
            min={0}
            max={100}
            step="0.01"
            value={taxRate}
            onChange={(event) =>
              setTaxRate(
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
        </div>

        {/* Timezone */}
        <div className="md:col-span-2">
          <label
            htmlFor="timezone"
            className="mb-2 block text-sm font-semibold"
          >
            Timezone
          </label>

          <select
            id="timezone"
            value={timezone}
            onChange={(event) =>
              setTimezone(event.target.value)
            }
            className="
              h-12
              w-full
              rounded-xl
              border
              border-[color:var(--border)]
              bg-[color:var(--surface)]
              px-4
              text-sm
              text-[color:var(--text)]
              outline-none
              focus:border-blue-500
            "
          >
            <option value="Africa/Lagos">
              Africa/Lagos (WAT)
            </option>

            <option value="UTC">
              UTC
            </option>
          </select>
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
            : "Save Store Settings"}
        </button>
      </div>
    </form>
  );
}