import { useMemo } from "react";

import { useSuppliers } from "@/queries/useSupplier";

import type { Supplier } from "@/types/suppliers";

import SupplierCard from "./SupplierCard";

interface Props {
  search: string;
  status: "" | "active" | "inactive";

  onView: (supplier: Supplier) => void;
  onEdit: (supplier: Supplier) => void;
  onDelete: (supplier: Supplier) => void;
}

export default function SuppliersGrid({
  search,
  status,
  onView,
  onEdit,
  onDelete,
}: Props) {
  const {
    data,
    isLoading,
    error,
  } = useSuppliers();

  const suppliers = data?.data ?? [];

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter((supplier) => {
      const matchesSearch =
        search === "" ||
        supplier.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        supplier.email
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        supplier.phone.includes(search) ||
        supplier.contact_person
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        status === ""
          ? true
          : status === "active"
          ? supplier.is_active
          : !supplier.is_active;

      return matchesSearch && matchesStatus;
    });
  }, [suppliers, search, status]);

  if (isLoading) {
    return (
      <div className="py-24 text-center text-[color:var(--text-muted)]">
        Loading suppliers...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-300 bg-red-50 p-8 text-center text-red-600 dark:border-red-900 dark:bg-red-950/30">
        Failed to load suppliers.
      </div>
    );
  }

  if (filteredSuppliers.length === 0) {
    return (
      <div className="rounded-[30px] border border-dashed border-[color:var(--border)] bg-[color:var(--surface)] py-24 text-center">

        <h3 className="text-2xl font-bold">
          No Suppliers Found
        </h3>

        <p className="mt-3 text-[color:var(--text-muted)]">
          Suppliers will appear here once added.
        </p>

      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {filteredSuppliers.map((supplier) => (
        <SupplierCard
          key={supplier.id}
          supplier={supplier}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}