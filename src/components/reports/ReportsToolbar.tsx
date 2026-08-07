import { CalendarDays, RefreshCw } from "lucide-react";

interface Props {
  startDate: string;
  endDate: string;
  setStartDate: (value: string) => void;
  setEndDate: (value: string) => void;
  onApply: () => void;
  onReset: () => void;
}

export default function ReportsToolbar({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  onApply,
  onReset,
}: Props) {
  return (
    <div className="mt-8 rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h2 className="font-semibold">Sales Report</h2>

          <p className="mt-1 text-sm text-[color:var(--text-muted)]">
            Select a date range to view sales performance.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          {/* Start */}
          <div>
            <label className="mb-2 block text-xs font-medium text-[color:var(--text-muted)]">
              Start Date
            </label>

            <div className="relative">
              <CalendarDays
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--text-muted)]"
              />

              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="h-11 rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] pl-10 pr-3 text-sm outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* End */}
          <div>
            <label className="mb-2 block text-xs font-medium text-[color:var(--text-muted)]">
              End Date
            </label>

            <div className="relative">
              <CalendarDays
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--text-muted)]"
              />

              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="h-11 rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] pl-10 pr-3 text-sm outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Apply */}
          <button
            type="button"
            onClick={onApply}
            className="h-11 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Apply
          </button>

          {/* Reset */}
          <button
            type="button"
            onClick={onReset}
            className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[color:var(--border)] px-4 text-sm font-medium transition hover:bg-[color:var(--surface-hover)]"
          >
            <RefreshCw size={16} />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}