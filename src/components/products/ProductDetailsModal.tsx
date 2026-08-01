import { useEffect } from "react";
import {
  Package,
  X,
} from "lucide-react";

import type { Product } from "@/types/product";

interface Props {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onEdit?: (product: Product) => void;
}

export default function ProductDetailsModal({
  open,
  product,
  onClose,
  onEdit,
}: Props) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open || !product) return null;

  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className="
          fixed inset-0
          z-50
          bg-black/60
          backdrop-blur-sm
        "
      />

      {/* Modal */}

      <div
        className="
          fixed
          left-1/2
          top-1/2
          z-[60]
          w-full
          max-w-5xl
          -translate-x-1/2
          -translate-y-1/2
          overflow-hidden
          rounded-[32px]
          border
          border-[color:var(--border)]
          bg-[color:var(--surface)]
          shadow-2xl
        "
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b border-[color:var(--border)] px-8 py-6">

          <div>

            <h2 className="text-2xl font-bold text-[color:var(--text)]">
              Product Details
            </h2>

            <p className="mt-1 text-sm text-[color:var(--text-muted)]">
              View complete product information
            </p>

          </div>

          <button
            onClick={onClose}
            className="
              rounded-2xl
              p-3
              transition
              hover:bg-[color:var(--surface-hover)]
            "
          >
            <X
              size={22}
              className="text-[color:var(--text)]"
            />
          </button>

        </div>

        {/* Body */}

        <div className="max-h-[75vh] overflow-y-auto px-8 py-8">

          {/* Hero */}

          <div className="flex items-center gap-6">

            <div
              className="
                flex
                h-28
                w-28
                items-center
                justify-center
                rounded-3xl
                bg-blue-100
                dark:bg-blue-500/20
              "
            >
              <Package
                size={48}
                className="text-blue-600"
              />
            </div>

            <div>

              <h3 className="text-3xl font-bold text-[color:var(--text)]">
                {product.Name}
              </h3>

              <p className="mt-2 max-w-2xl text-[color:var(--text-muted)]">
                {product.Description ||
                  "No description has been added for this product yet."}
              </p>

            </div>

          </div>
                  {/* Basic Information */}

          <section className="mt-10">

            <h4 className="mb-5 text-lg font-semibold text-[color:var(--text)]">
              Basic Information
            </h4>

            <div className="grid gap-5 md:grid-cols-2">

              <InfoCard
                title="Category"
                value={product.Category?.name || "-"}
              />

              <InfoCard
                title="Supplier"
                value={product.Supplier?.Name || "-"}
              />

              <InfoCard
                title="SKU"
                value={product.SKU}
              />

              <InfoCard
                title="Barcode"
                value={product.Barcode || "-"}
              />

              <InfoCard
                title="Product ID"
                value={product.ID}
              />

            </div>

          </section>

          {/* Pricing */}

          <section className="mt-10">

            <h4 className="mb-5 text-lg font-semibold text-[color:var(--text)]">
              Pricing
            </h4>

            <div className="grid gap-5 md:grid-cols-2">

              <MetricCard
                title="Cost Price"
                value={`₦${product.CostPrice.toLocaleString()}`}
              />

              <MetricCard
                title="Selling Price"
                value={`₦${product.SellingPrice.toLocaleString()}`}
              />

            </div>

          </section>

          {/* Inventory */}

          <section className="mt-10">

            <h4 className="mb-5 text-lg font-semibold text-[color:var(--text)]">
              Inventory
            </h4>

            <div className="grid gap-5 md:grid-cols-2">

              <MetricCard
                title="Current Stock"
                value={product.Quantity}
              />

              <MetricCard
                title="Minimum Stock"
                value={product.MinimumStock}
              />

            </div>

          </section>

          {/* Status */}

          <section className="mt-10">

            <h4 className="mb-5 text-lg font-semibold text-[color:var(--text)]">
              Product Status
            </h4>

            {product.IsActive ? (

              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-5 py-2 font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">

                <div className="h-2 w-2 rounded-full bg-emerald-500" />

                Active

              </div>

            ) : (

              <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-5 py-2 font-semibold text-red-600 dark:bg-red-900/30 dark:text-red-400">

                <div className="h-2 w-2 rounded-full bg-red-500" />

                Inactive

              </div>

            )}

          </section>

          {/* Dates */}

          <section className="mt-10">

            <h4 className="mb-5 text-lg font-semibold text-[color:var(--text)]">
              Timeline
            </h4>

            <div className="grid gap-5 md:grid-cols-2">

              <InfoCard
                title="Created"
                value={new Date(product.CreatedAt).toLocaleDateString()}
              />

              <InfoCard
                title="Last Updated"
                value={new Date(product.UpdatedAt).toLocaleDateString()}
              />

            </div>

          </section>

        </div>

        {/* Footer */}

        <div className="flex items-center justify-end gap-4 border-t border-[color:var(--border)] px-8 py-6">

          <button
            onClick={onClose}
            className="
              rounded-2xl
              border
              border-[color:var(--border)]
              px-6
              py-3
              font-semibold
              text-[color:var(--text)]
              transition
              hover:bg-[color:var(--surface-hover)]
            "
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              onEdit?.(product);
            }}
            className="
              rounded-2xl
              bg-blue-600
              px-6
              py-3
              font-semibold
              text-white
              transition
              hover:bg-blue-700
            "
          >
            Edit Product
          </button>

        </div>

      </div>

    </>
  );

}

function InfoCard({
  title,
  value,
}: {
  title: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)] p-5">

      <p className="text-sm text-[color:var(--text-muted)]">
        {title}
      </p>

      <h3 className="mt-2 font-semibold text-[color:var(--text)] break-all">
        {value}
      </h3>

    </div>
  );
}

function MetricCard({
  title,
  value,
}: {
  title: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-sm">

      <p className="text-sm text-[color:var(--text-muted)]">
        {title}
      </p>

      <h2 className="mt-3 text-3xl font-bold text-[color:var(--text)]">
        {value}
      </h2>

    </div>
  );
}