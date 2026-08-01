import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Props {
  page: number;
  totalPages: number;
  totalProducts: number;
  onPageChange: (page: number) => void;
}

export default function InventoryPagination({
  page,
  totalPages,
  totalProducts,
  onPageChange,
}: Props) {
  const start = (page - 1) * 10 + 1;
  const end = Math.min(page * 10, totalProducts);

  return (
    <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 md:flex-row">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Showing{" "}
        <span className="font-semibold text-slate-900 dark:text-white">
          {start}-{end}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-slate-900 dark:text-white">
          {totalProducts}
        </span>{" "}
        products
      </p>

      <div className="flex items-center gap-2">
        {/* Previous */}
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;

          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`flex h-10 w-10 items-center justify-center rounded-xl font-semibold transition ${
                page === pageNumber
                  ? "bg-blue-600 text-white"
                  : "border border-slate-200 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}

        {/* Next */}
        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}