import {
  Search,
  Plus,
  Filter,
} from "lucide-react";

interface Props {
  search: string;
  setSearch: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;

  onAdd: () => void;
}

export default function PurchasesToolbar({
  search,
  setSearch,
  status,
  setStatus,
  onAdd,
}: Props) {
  return (
    <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row">
        {/* Search */}

        <div className="relative flex-1">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[color:var(--text-muted)]"
            size={18}
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search invoice or supplier..."
            className="h-12 w-full rounded-2xl border border-[color:var(--border)] bg-transparent pl-11 pr-4 outline-none transition focus:border-blue-500"
          />
        </div>

        {/* Status */}

        <div className="relative">
          <Filter
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[color:var(--text-muted)]"
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="h-12 rounded-2xl border border-[color:var(--border)] bg-transparent pl-11 pr-10 outline-none"
          >
            <option value="">All Status</option>
            <option value="pending">
              Pending
            </option>
            <option value="received">
              Received
            </option>
            <option value="cancelled">
              Cancelled
            </option>
          </select>
        </div>

        {/* Button */}

        <button
          onClick={onAdd}
          className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          New Purchase
        </button>
      </div>
    </div>
  );
}