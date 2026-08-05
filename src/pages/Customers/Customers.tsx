import { useState } from "react";

import DashboardLayout from "@/layouts/DashboardLayout";

import CustomersHeader from "@/components/customers/CustomersHeader";
import CustomersStats from "@/components/customers/CustomersStats";
import CustomersToolbar from "@/components/customers/CustomersToolbar";
import CustomersGrid from "@/components/customers/CustomersGrid";
import { useCustomers } from "@/queries/useCustomers";

import AddCustomerModal from "@/components/customers/AddCustomerModal";
import EditCustomerModal from "@/components/customers/EditCustomerModal";
import CustomerDetailsDialog from "@/components/customers/CustomerDetailsDialog";
import DeleteCustomerDialog from "@/components/customers/DeleteCustomerDialog";

import type { Customer } from "@/types/customers";

export default function Customers() {
  const [search, setSearch] = useState("");

  const [addOpen, setAddOpen] = useState(false);

  const [editOpen, setEditOpen] = useState(false);

  const [detailsOpen, setDetailsOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);

  const {
  data: customers = [],
} = useCustomers();

  function handleView(customer: Customer) {
    setSelectedCustomer(customer);
    setDetailsOpen(true);
  }

  function handleEdit(customer: Customer) {
    setSelectedCustomer(customer);
    setEditOpen(true);
  }

  function handleDelete(customer: Customer) {
    setSelectedCustomer(customer);
    setDeleteOpen(true);
  }

 function handleExport() {

  if (!customers.length) {
    alert("No customers available");
    return;
  }

  const headers = [
    "Name",
    "Email",
    "Phone",
    "Address",
    "Loyalty Points",
    "Total Spent",
    "Total Orders",
    "Status",
  ];


  const rows = customers.map((customer) => [
    customer.full_name,
    customer.email,
    customer.phone,
    customer.address,
    customer.loyalty_points,
    customer.total_spent,
    customer.total_orders,
    customer.is_active
      ? "Active"
      : "Inactive",
  ]);


  const csvContent = [
    headers.join(","),
    ...rows.map(row => row.join(",")),
  ].join("\n");


  const blob = new Blob(
    [csvContent],
    {
      type: "text/csv",
    }
  );


  const url =
    URL.createObjectURL(blob);


  const link =
    document.createElement("a");


  link.href = url;
  link.download = "customers.csv";

  link.click();


  URL.revokeObjectURL(url);
}

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <CustomersHeader />

        <CustomersStats />

        <CustomersToolbar
          search={search}
          onSearch={setSearch}
          onAddCustomer={() => setAddOpen(true)}
          onExport={handleExport}
        />

        <CustomersGrid
          search={search}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <AddCustomerModal
          open={addOpen}
          onClose={() => setAddOpen(false)}
        />

        <EditCustomerModal
          open={editOpen}
          customer={selectedCustomer}
          onClose={() => {
            setEditOpen(false);
            setSelectedCustomer(null);
          }}
        />

        <CustomerDetailsDialog
          open={detailsOpen}
          customer={selectedCustomer}
          onClose={() => {
            setDetailsOpen(false);
            setSelectedCustomer(null);
          }}
        />

        <DeleteCustomerDialog
          open={deleteOpen}
          customer={selectedCustomer}
          onClose={() => {
            setDeleteOpen(false);
            setSelectedCustomer(null);
          }}
        />
      </div>
    </DashboardLayout>
  );
}