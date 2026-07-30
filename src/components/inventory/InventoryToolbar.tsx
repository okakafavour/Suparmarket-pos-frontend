import {
  Search,
  RotateCw,
  Download,
} from "lucide-react";

interface Props {
  search: string;
  onSearch: (value: string) => void;

  category: string;
  onCategoryChange: (value: string) => void;

  status: string;
  onStatusChange: (value: string) => void;

  onRefresh?: () => void;
  onExport?: () => void;
}

export default function InventoryToolbar({
  search,
  onSearch,
  category,
  onCategoryChange,
  status,
  onStatusChange,
  onRefresh,
  onExport,
}: Props) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}

        <div className="relative w-full lg:max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search product name or SKU..."
            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Category */}

          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="h-12 rounded-xl border border-slate-200 bg-white px-4 dark:border-slate-700 dark:bg-slate-800"
          >
            <option value="">All Categories</option>

            <option value="Beverages">Beverages</option>

            <option value="Bakery">Bakery</option>

            <option value="Dairy">Dairy</option>

            <option value="Snacks">Snacks</option>
          </select>

          {/* Status */}

          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="h-12 rounded-xl border border-slate-200 bg-white px-4 dark:border-slate-700 dark:bg-slate-800"
          >
            <option value="">All Status</option>

            <option value="active">Active</option>

            <option value="inactive">Inactive</option>
          </select>

          {/* Refresh */}

          <button
            onClick={onRefresh}
            className="flex h-12 items-center gap-2 rounded-xl border border-slate-200 px-4 transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            <RotateCw size={16} />

            Refresh
          </button>

          {/* Export */}

          <button
            onClick={onExport}
            className="flex h-12 items-center gap-2 rounded-xl bg-blue-600 px-4 text-white transition hover:bg-blue-700"
          >
            <Download size={16} />

            Export CSV
          </button>
        </div>
      </div>
    </div>
  );
}