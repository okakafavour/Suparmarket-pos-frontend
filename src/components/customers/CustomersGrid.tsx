import { useMemo } from "react";

import { useCustomers } from "@/queries/useCustomers";

import type { Customer } from "@/types/customers";

import CustomerCard from "./CustomerCard";

interface Props {
  search: string;

  onView: (customer: Customer) => void;

  onEdit: (customer: Customer) => void;

  onDelete: (customer: Customer) => void;
}

export default function CustomersGrid({
  search,
  onView,
  onEdit,
  onDelete,
}: Props) {
  const {
    data: customers = [],
    isLoading,
    error,
  } = useCustomers();

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      return (
        search === "" ||
        customer.full_name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        customer.email
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        customer.phone.includes(search)
      );
    });
  }, [customers, search]);

  if (isLoading) {
    return (
      <div className="py-24 text-center text-[color:var(--text-muted)]">
        Loading customers...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-300 bg-red-50 p-8 text-center text-red-600 dark:border-red-900 dark:bg-red-950/30">
        Failed to load customers.
      </div>
    );
  }

  if (filteredCustomers.length === 0) {
    return (
      <div className="rounded-[30px] border border-dashed border-[color:var(--border)] bg-[color:var(--surface)] py-24 text-center">
        <h3 className="text-2xl font-bold">
          No Customers Found
        </h3>

        <p className="mt-3 text-[color:var(--text-muted)]">
          Customers will appear here once they are added.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {filteredCustomers.map((customer) => (
        <CustomerCard
          key={customer.id}
          customer={customer}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}