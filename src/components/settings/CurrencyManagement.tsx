import { useState } from "react";
import {
  ArrowRight,
  CircleDollarSign,
  Clock3,
  Download,
  Plus,
  RefreshCw,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";

import { useExchangeRates } from "@/queries/useExchangeRates";
import currencyService from "@/services/currency.service";

const currencies = [
  { code: "NGN", name: "Nigerian Naira", symbol: "₦" },
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "ZAR", name: "South African Rand", symbol: "R" },
];

function getCurrencyName(code: string) {
  return (
    currencies.find((currency) => currency.code === code)?.name ||
    code
  );
}

function getCurrencySymbol(code: string) {
  return (
    currencies.find((currency) => currency.code === code)?.symbol ||
    code
  );
}

function formatDate(date?: string | null) {
  if (!date) {
    return "Not available";
  }

  return new Date(date).toLocaleString();
}

export default function CurrencyManagement() {
  const {
    data: rates = [],
    isLoading,
    isError,
    refetch,
  } = useExchangeRates();

  const [fromCurrency, setFromCurrency] = useState("KES");
  const [toCurrency, setToCurrency] = useState("USD");
  const [manualRate, setManualRate] = useState("");

  const [fetching, setFetching] = useState(false);
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleFetchRate() {
    if (fromCurrency === toCurrency) {
      toast.error(
        "Source and target currencies must be different.",
      );
      return;
    }

    try {
      setFetching(true);

      await currencyService.fetchRate({
        from_currency: fromCurrency,
        to_currency: toCurrency,
      });

      toast.success(
        `${fromCurrency} → ${toCurrency} rate updated.`,
      );

      await refetch();
    } catch (error) {
      console.error("Failed to fetch exchange rate:", error);

      toast.error(
        "Unable to fetch the latest exchange rate.",
      );
    } finally {
      setFetching(false);
    }
  }

  async function handleCreateManualRate(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const rate = Number(manualRate);

    if (!rate || rate <= 0) {
      toast.error("Enter a valid exchange rate.");
      return;
    }

    if (fromCurrency === toCurrency) {
      toast.error(
        "Source and target currencies must be different.",
      );
      return;
    }

    try {
      setCreating(true);

      await currencyService.createRate({
        from_currency: fromCurrency,
        to_currency: toCurrency,
        rate,
      });

      toast.success(
        `Manual ${fromCurrency} → ${toCurrency} rate created.`,
      );

      setManualRate("");

      await refetch();
    } catch (error) {
      console.error("Failed to create manual rate:", error);

      toast.error(
        "Unable to create the exchange rate.",
      );
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      setDeletingId(id);

      await currencyService.deleteRate(id);

      toast.success("Exchange rate deleted.");

      await refetch();
    } catch (error) {
      console.error("Failed to delete exchange rate:", error);

      toast.error(
        "Unable to delete the exchange rate.",
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)]">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-[color:var(--border)] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
            <CircleDollarSign size={21} />
          </div>

          <div>
            <h2 className="text-base font-bold">
              Currency & Exchange Rates
            </h2>

            <p className="mt-1 text-sm text-[color:var(--text-muted)]">
              Manage currencies and exchange rates used by your
              store.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => refetch()}
          disabled={isLoading}
          className="
            inline-flex
            h-10
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-[color:var(--border)]
            px-4
            text-sm
            font-semibold
            transition
            hover:bg-[color:var(--background)]
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <RefreshCw
            size={16}
            className={isLoading ? "animate-spin" : ""}
          />

          Refresh
        </button>
      </div>

      {/* Rate Actions */}
      <div className="grid gap-6 border-b border-[color:var(--border)] p-6 lg:grid-cols-2">
        {/* API Rate */}
        <div className="rounded-2xl border border-[color:var(--border)] p-5">
          <div className="mb-5">
            <h3 className="font-semibold">
              Fetch Latest Rate
            </h3>

            <p className="mt-1 text-sm text-[color:var(--text-muted)]">
              Get the latest exchange rate from the exchange-rate
              provider.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
            <div>
              <label
                htmlFor="api-from-currency"
                className="mb-2 block text-sm font-semibold"
              >
                From
              </label>

              <select
                id="api-from-currency"
                value={fromCurrency}
                onChange={(event) =>
                  setFromCurrency(event.target.value)
                }
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-[color:var(--border)]
                  bg-[color:var(--surface)]
                  px-3
                  text-sm
                  outline-none
                  focus:border-blue-500
                "
              >
                {currencies.map((currency) => (
                  <option
                    key={currency.code}
                    value={currency.code}
                  >
                    {currency.code} — {currency.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="hidden justify-center pb-3 sm:flex">
              <ArrowRight size={18} />
            </div>

            <div>
              <label
                htmlFor="api-to-currency"
                className="mb-2 block text-sm font-semibold"
              >
                To
              </label>

              <select
                id="api-to-currency"
                value={toCurrency}
                onChange={(event) =>
                  setToCurrency(event.target.value)
                }
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-[color:var(--border)]
                  bg-[color:var(--surface)]
                  px-3
                  text-sm
                  outline-none
                  focus:border-blue-500
                "
              >
                {currencies.map((currency) => (
                  <option
                    key={currency.code}
                    value={currency.code}
                  >
                    {currency.code} — {currency.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={handleFetchRate}
            disabled={fetching}
            className="
              mt-4
              inline-flex
              h-11
              w-full
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
            <Download size={17} />

            {fetching
              ? "Fetching latest rate..."
              : "Fetch Latest Rate"}
          </button>
        </div>

        {/* Manual Rate */}
        <form
          onSubmit={handleCreateManualRate}
          className="rounded-2xl border border-[color:var(--border)] p-5"
        >
          <div className="mb-5">
            <h3 className="font-semibold">
              Add Manual Rate
            </h3>

            <p className="mt-1 text-sm text-[color:var(--text-muted)]">
              Set a custom exchange rate for a currency pair.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label
                htmlFor="manual-from-currency"
                className="mb-2 block text-sm font-semibold"
              >
                From
              </label>

              <select
                id="manual-from-currency"
                value={fromCurrency}
                onChange={(event) =>
                  setFromCurrency(event.target.value)
                }
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-[color:var(--border)]
                  bg-[color:var(--surface)]
                  px-3
                  text-sm
                  outline-none
                  focus:border-blue-500
                "
              >
                {currencies.map((currency) => (
                  <option
                    key={currency.code}
                    value={currency.code}
                  >
                    {currency.code}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="manual-to-currency"
                className="mb-2 block text-sm font-semibold"
              >
                To
              </label>

              <select
                id="manual-to-currency"
                value={toCurrency}
                onChange={(event) =>
                  setToCurrency(event.target.value)
                }
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-[color:var(--border)]
                  bg-[color:var(--surface)]
                  px-3
                  text-sm
                  outline-none
                  focus:border-blue-500
                "
              >
                {currencies.map((currency) => (
                  <option
                    key={currency.code}
                    value={currency.code}
                  >
                    {currency.code}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="manual-rate"
                className="mb-2 block text-sm font-semibold"
              >
                Rate
              </label>

              <input
                id="manual-rate"
                type="number"
                min="0"
                step="0.000001"
                value={manualRate}
                onChange={(event) =>
                  setManualRate(event.target.value)
                }
                placeholder="0.00773"
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-[color:var(--border)]
                  bg-transparent
                  px-3
                  text-sm
                  outline-none
                  focus:border-blue-500
                "
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={creating}
            className="
              mt-4
              inline-flex
              h-11
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-blue-600
              px-5
              text-sm
              font-semibold
              text-blue-600
              transition
              hover:bg-blue-50
              dark:hover:bg-blue-950/30
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            <Plus size={17} />

            {creating
              ? "Adding rate..."
              : "Add Manual Rate"}
          </button>
        </form>
      </div>

      {/* Rates */}
      <div className="p-6">
        <div className="mb-5">
          <h3 className="font-semibold">
            Exchange Rates
          </h3>

          <p className="mt-1 text-sm text-[color:var(--text-muted)]">
            Rates currently stored in your POS.
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw
              size={22}
              className="animate-spin text-blue-600"
            />
          </div>
        ) : isError ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/20 dark:text-red-400">
            Unable to load exchange rates.
          </div>
        ) : rates.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[color:var(--border)] p-10 text-center">
            <CircleDollarSign
              size={30}
              className="mx-auto text-[color:var(--text-muted)]"
            />

            <p className="mt-3 font-medium">
              No exchange rates yet
            </p>

            <p className="mt-1 text-sm text-[color:var(--text-muted)]">
              Fetch an API rate or create a manual rate to get
              started.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {rates.map((rate) => (
              <div
                key={rate.id}
                className="
                  flex
                  flex-col
                  gap-4
                  rounded-2xl
                  border
                  border-[color:var(--border)]
                  p-4
                  transition
                  hover:bg-[color:var(--background)]
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-sm font-bold text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
                    {getCurrencySymbol(rate.from_currency)}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold">
                        {rate.from_currency}
                      </span>

                      <ArrowRight
                        size={15}
                        className="text-[color:var(--text-muted)]"
                      />

                      <span className="font-semibold">
                        {rate.to_currency}
                      </span>

                      <span
                        className={`
                          rounded-full
                          px-2.5
                          py-1
                          text-xs
                          font-semibold
                          ${
                            rate.is_active
                              ? "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400"
                              : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                          }
                        `}
                      >
                        {rate.is_active
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-[color:var(--text-muted)]">
                      {getCurrencyName(rate.from_currency)}
                      {" → "}
                      {getCurrencyName(rate.to_currency)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-5">
                  <div>
                    <p className="text-xs text-[color:var(--text-muted)]">
                      Rate
                    </p>

                    <p className="font-bold">
                      {rate.rate}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-[color:var(--text-muted)]">
                      Source
                    </p>

                    <p className="text-sm font-semibold uppercase">
                      {rate.source}
                    </p>
                  </div>

                  {rate.fetched_at && (
                    <div>
                      <p className="flex items-center gap-1 text-xs text-[color:var(--text-muted)]">
                        <Clock3 size={12} />
                        Fetched
                      </p>

                      <p className="text-xs font-medium">
                        {formatDate(rate.fetched_at)}
                      </p>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => handleDelete(rate.id)}
                    disabled={deletingId === rate.id}
                    className="
                      inline-flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-lg
                      text-red-500
                      transition
                      hover:bg-red-50
                      hover:text-red-600
                      dark:hover:bg-red-950/30
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                    aria-label="Delete exchange rate"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}