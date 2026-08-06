import {
  Search,
  Download,
  Plus,
  UserCheck,
} from "lucide-react";

interface Props {
  search: string;
  onSearch: (value: string) => void;

  status: "" | "active" | "inactive";
  onStatusChange: (
    value: "" | "active" | "inactive"
  ) => void;

  onExport: () => void;
  onAddSupplier: () => void;
}

export default function SuppliersToolbar({
  search,
  onSearch,
  status,
  onStatusChange,
  onExport,
  onAddSupplier,
}: Props) {
  return (
    <div className="rounded-[30px] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-sm">

      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

        <div className="flex flex-1 flex-wrap gap-3">

          <div className="relative min-w-[320px] flex-1">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[color:var(--text-muted)]"
            />

            <input
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search supplier..."
              className="
                h-12
                w-full
                rounded-2xl
                border
                border-[color:var(--border)]
                bg-[color:var(--background)]
                pl-11
                pr-4
                outline-none
                transition
                focus:border-blue-500
              "
            />

          </div>

          <div className="relative">

            <UserCheck
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[color:var(--text-muted)]"
            />

            <select
              value={status}
              onChange={(e) =>
                onStatusChange(
                  e.target.value as
                    | ""
                    | "active"
                    | "inactive"
                )
              }
              className="
                h-12
                rounded-2xl
                border
                border-[color:var(--border)]
                bg-[color:var(--background)]
                pl-11
                pr-5
              "
            >
              <option value="">All Suppliers</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

          </div>

        </div>

        <div className="flex gap-3">

          <button
            onClick={onExport}
            className="flex h-12 items-center gap-2 rounded-2xl border border-[color:var(--border)] px-5 hover:bg-[color:var(--surface-hover)]"
          >
            <Download size={18}/>
            Export
          </button>

          <button
            onClick={onAddSupplier}
            className="flex h-12 items-center gap-2 rounded-2xl bg-blue-600 px-5 font-semibold text-white transition hover:bg-blue-700"
          >
            <Plus size={18}/>
            Add Supplier
          </button>

        </div>

      </div>

    </div>
  );
}