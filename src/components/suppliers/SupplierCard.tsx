import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import type { Supplier } from "@/types/suppliers";

interface Props {
  supplier: Supplier;
  onView: (supplier: Supplier) => void;
  onEdit: (supplier: Supplier) => void;
  onDelete: (supplier: Supplier) => void;
}

export default function SupplierCard({
  supplier,
  onView,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="group rounded-[28px] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="flex items-start justify-between">

        <div>

          <div className="flex items-center gap-2">

            <Building2
              size={18}
              className="text-blue-600"
            />

            <p className="text-sm font-semibold text-[color:var(--text-muted)]">
              Supplier
            </p>

          </div>

          <h2 className="mt-2 text-xl font-bold">
            {supplier.name}
          </h2>

        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            supplier.is_active
              ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
              : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300"
          }`}
        >
          {supplier.is_active ? "Active" : "Inactive"}
        </span>

      </div>

      <div className="mt-6 space-y-4">

        <div className="flex items-center gap-3">
          <Mail size={18}/>
          <span>{supplier.email}</span>
        </div>

        <div className="flex items-center gap-3">
          <Phone size={18}/>
          <span>{supplier.phone}</span>
        </div>

        <div className="flex items-center gap-3">
          <MapPin size={18}/>
          <span>
            {supplier.city}, {supplier.country}
          </span>
        </div>

      </div>

      <div className="mt-7 border-t border-[color:var(--border)] pt-5">

        <div className="mb-5">

          <p className="text-xs text-[color:var(--text-muted)]">
            Contact Person
          </p>

          <h3 className="font-semibold">
            {supplier.contact_person}
          </h3>

        </div>

        <div className="flex justify-end gap-2">

          <button
            onClick={() => onView(supplier)}
            className="rounded-xl border border-[color:var(--border)] p-3 hover:bg-[color:var(--surface-hover)]"
          >
            <Eye size={18}/>
          </button>

          <button
            onClick={() => onEdit(supplier)}
            className="rounded-xl border border-blue-300 p-3 text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-950/30"
          >
            <Pencil size={18}/>
          </button>

          <button
            onClick={() => onDelete(supplier)}
            className="rounded-xl border border-red-300 p-3 text-red-600 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950/30"
          >
            <Trash2 size={18}/>
          </button>

        </div>

      </div>

    </div>
  );
}