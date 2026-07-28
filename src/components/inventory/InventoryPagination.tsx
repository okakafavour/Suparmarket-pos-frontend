import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function InventoryPagination() {
  return (
    <div className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row">
      <p className="text-sm text-slate-500">
        Showing <span className="font-semibold text-slate-900">1–10</span> of{" "}
        <span className="font-semibold text-slate-900">248</span> products
      </p>

      <div className="flex items-center gap-2">
        <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 transition hover:bg-slate-100">
          <ChevronLeft size={18} />
        </button>

        <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-semibold text-white">
          1
        </button>

        <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 transition hover:bg-slate-100">
          2
        </button>

        <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 transition hover:bg-slate-100">
          3
        </button>

        <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 transition hover:bg-slate-100">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}