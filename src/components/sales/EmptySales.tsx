import { Receipt, Plus } from "lucide-react";

interface Props {
  onCreateSale?: () => void;
}

export default function EmptySales({
  onCreateSale,
}: Props) {
  return (
    <div
      className="
        rounded-[32px]
        border
        border-[color:var(--border)]
        bg-[color:var(--surface)]
        p-16
        shadow-sm
      "
    >
      <div className="flex flex-col items-center text-center">

        <div
          className="
            flex
            h-28
            w-28
            items-center
            justify-center
            rounded-full
            bg-emerald-100
            dark:bg-emerald-500/20
          "
        >
          <Receipt
            size={52}
            className="text-emerald-600"
          />
        </div>

        <h2 className="mt-8 text-3xl font-bold text-[color:var(--text)]">
          No Sales Found
        </h2>

        <p className="mt-3 max-w-lg text-[color:var(--text-muted)]">
          No sales match your current filters. Once customers make purchases,
          completed transactions will appear here automatically.
        </p>

        {onCreateSale && (
          <button
            onClick={onCreateSale}
            className="
              mt-10
              inline-flex
              items-center
              gap-3
              rounded-2xl
              bg-emerald-600
              px-6
              py-3
              font-semibold
              text-white
              transition-all
              duration-200
              hover:scale-105
              hover:bg-emerald-700
              active:scale-95
            "
          >
            <Plus size={18} />

            Create Sale

          </button>
        )}

      </div>
    </div>
  );
}