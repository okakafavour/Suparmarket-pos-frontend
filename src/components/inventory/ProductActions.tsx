import { Eye, Pencil, Trash2 } from "lucide-react";

interface Props {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ProductActions({
  onView,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="flex justify-center gap-2">
      <button
        onClick={onView}
        className="
          flex h-10 w-10 items-center justify-center
          rounded-xl
          border border-slate-200
          text-slate-500
          transition-all
          hover:border-blue-500
          hover:bg-blue-50
          hover:text-blue-600
          dark:border-slate-700
          dark:text-slate-400
          dark:hover:bg-blue-500/10
        "
      >
        <Eye size={18} />
      </button>

      <button
        onClick={onEdit}
        className="
          flex h-10 w-10 items-center justify-center
          rounded-xl
          border border-slate-200
          text-slate-500
          transition-all
          hover:border-amber-500
          hover:bg-amber-50
          hover:text-amber-600
          dark:border-slate-700
          dark:text-slate-400
          dark:hover:bg-amber-500/10
        "
      >
        <Pencil size={18} />
      </button>

      <button
        onClick={onDelete}
        className="
          flex h-10 w-10 items-center justify-center
          rounded-xl
          border border-slate-200
          text-slate-500
          transition-all
          hover:border-red-500
          hover:bg-red-50
          hover:text-red-600
          dark:border-slate-700
          dark:text-slate-400
          dark:hover:bg-red-500/10
        "
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}