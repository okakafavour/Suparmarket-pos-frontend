import { useState } from "react";

import DashboardLayout from "@/layouts/DashboardLayout";

import SuppliersHeader from "@/components/suppliers/SuppliersHeader";
import SuppliersStats from "@/components/suppliers/SuppliersStats";
import SuppliersToolbar from "@/components/suppliers/SuppliersToolbar";
import SuppliersGrid from "@/components/suppliers/SuppliersGrid";

import AddSupplierModal from "@/components/suppliers/AddSupplierModal";
import EditSupplierModal from "@/components/suppliers/EditSupplierModal";
import SupplierDetailsDialog from "@/components/suppliers/SupplierDetailsDialog";
import DeleteSupplierDialog from "@/components/suppliers/DeleteSupplierDialog";

import { exportSuppliersCSV } from "@/utils/exportSuppliers";

import type { Supplier } from "@/types/suppliers";

export default function Suppliers() {
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState<
    "" | "active" | "inactive"
  >("");

  const [addOpen, setAddOpen] = useState(false);

  const [editOpen, setEditOpen] = useState(false);

  const [detailsOpen, setDetailsOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [selectedSupplier, setSelectedSupplier] =
    useState<Supplier | null>(null);

  function handleView(supplier: Supplier) {
    setSelectedSupplier(supplier);
    setDetailsOpen(true);
  }

  function handleEdit(supplier: Supplier) {
    setSelectedSupplier(supplier);
    setEditOpen(true);
  }

  function handleDelete(supplier: Supplier) {
    setSelectedSupplier(supplier);
    setDeleteOpen(true);
  }

  function handleExport() {
    exportSuppliersCSV();
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">

        <SuppliersHeader />

        <SuppliersStats />

        <SuppliersToolbar
          search={search}
          onSearch={setSearch}
          status={status}
          onStatusChange={setStatus}
          onAddSupplier={() => setAddOpen(true)}
          onExport={handleExport}
        />

        <SuppliersGrid
          search={search}
          status={status}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <AddSupplierModal
          open={addOpen}
          onClose={() => setAddOpen(false)}
        />

        <EditSupplierModal
          open={editOpen}
          supplier={selectedSupplier}
          onClose={() => {
            setEditOpen(false);
            setSelectedSupplier(null);
          }}
        />

        <SupplierDetailsDialog
          open={detailsOpen}
          supplier={selectedSupplier}
          onClose={() => {
            setDetailsOpen(false);
            setSelectedSupplier(null);
          }}
        />

        <DeleteSupplierDialog
          open={deleteOpen}
          supplier={selectedSupplier}
          onClose={() => {
            setDeleteOpen(false);
            setSelectedSupplier(null);
          }}
        />

      </div>
    </DashboardLayout>
  );
}