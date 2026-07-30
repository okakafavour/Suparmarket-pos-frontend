import { X, Package, Tag, Building2, Barcode, Boxes } from "lucide-react";

import type { Product } from "@/types/product";
import StockBadge from "./StockBadge";

interface Props {
  product: Product;
  onClose: () => void;
}

export default function ProductDrawer({
  product,
  onClose,
}: Props) {
  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
      />

      {/* Drawer */}

      <div
        className="
          fixed right-0 top-0 z-50
          h-screen
          w-full
          max-w-xl
          overflow-y-auto
          bg-white
          shadow-2xl
          dark:bg-slate-900
        "
      >
        {/* Header */}

        <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">

          <div>
            <h2 className="text-2xl font-bold">
              Product Details
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              View complete product information
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X />
          </button>

        </div>

        {/* Body */}

        <div className="space-y-8 p-6">

          {/* Product */}

          <div className="flex items-center gap-5">

            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-100 dark:bg-blue-500/20">

              <Package
                size={34}
                className="text-blue-600"
              />

            </div>

            <div>

              <h3 className="text-2xl font-bold">
                {product.Name}
              </h3>

              <p className="mt-1 text-slate-500">
                {product.Description || "No description"}
              </p>

            </div>

          </div>

          {/* Basic Information */}

          <section className="rounded-2xl border border-slate-200 p-5 dark:border-slate-700">

            <h4 className="mb-5 font-semibold">
              Basic Information
            </h4>

            <div className="space-y-4">

              <InfoRow
                icon={<Tag size={18} />}
                label="Category"
                value={product.Category?.name}
              />

              <InfoRow
                icon={<Building2 size={18} />}
                label="Supplier"
                value={product.Supplier?.Name}
              />

              <InfoRow
                icon={<Barcode size={18} />}
                label="Barcode"
                value={product.Barcode || "-"}
              />

              <InfoRow
                icon={<Boxes size={18} />}
                label="SKU"
                value={product.SKU}
              />

            </div>

          </section>

          {/* Pricing */}

          <section className="rounded-2xl border border-slate-200 p-5 dark:border-slate-700">

            <h4 className="mb-5 font-semibold">
              Pricing
            </h4>

            <div className="grid grid-cols-2 gap-4">

              <PriceCard
                title="Cost Price"
                value={product.CostPrice}
              />

              <PriceCard
                title="Selling Price"
                value={product.SellingPrice}
              />

            </div>

          </section>

          {/* Inventory */}

          <section className="rounded-2xl border border-slate-200 p-5 dark:border-slate-700">

            <h4 className="mb-5 font-semibold">
              Inventory
            </h4>

            <div className="grid grid-cols-2 gap-5">

              <NumberCard
                title="Current Stock"
                value={product.Quantity}
              />

              <NumberCard
                title="Minimum Stock"
                value={product.MinimumStock}
              />

            </div>

            <div className="mt-6">

              <StockBadge
                quantity={product.Quantity}
                minimumStock={product.MinimumStock}
                isActive={product.IsActive}
              />

            </div>

          </section>

          {/* Status */}

          <section className="rounded-2xl border border-slate-200 p-5 dark:border-slate-700">

            <h4 className="mb-4 font-semibold">
              Product Status
            </h4>

            {product.IsActive ? (
              <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                Active
              </span>
            ) : (
              <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
                Inactive
              </span>
            )}

          </section>

        </div>
      </div>
    </>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4">

      <div className="rounded-xl bg-slate-100 p-3 dark:bg-slate-800">
        {icon}
      </div>

      <div>

        <p className="text-xs uppercase tracking-wide text-slate-500">
          {label}
        </p>

        <p className="font-semibold">
          {value}
        </p>

      </div>

    </div>
  );
}

function PriceCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-5 dark:bg-slate-800">

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h3 className="mt-2 text-2xl font-bold">
        ₦{value.toLocaleString()}
      </h3>

    </div>
  );
}

function NumberCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-5 dark:bg-slate-800">

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h3 className="mt-2 text-3xl font-bold">
        {value}
      </h3>

    </div>
  );
}