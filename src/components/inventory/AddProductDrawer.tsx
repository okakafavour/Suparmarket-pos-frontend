interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AddProductDrawer({
  open,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/40"
      />

      <div
        className="
          fixed
          right-0
          top-0
          z-50
          h-screen
          w-full
          max-w-xl
          overflow-y-auto
          bg-white
          shadow-2xl
          dark:bg-slate-900
        "
      >
        <div className="flex items-center justify-between border-b border-slate-200 p-6 dark:border-slate-700">
          <h2 className="text-2xl font-bold dark:text-white">
            Add Product
          </h2>

          <button
            onClick={onClose}
            className="text-2xl"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          Product Form goes here...
        </div>
      </div>
    </>
  );
}