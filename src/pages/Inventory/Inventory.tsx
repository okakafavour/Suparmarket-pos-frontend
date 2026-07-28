import DashboardLayout from "@/layouts/DashboardLayout";

import InventoryHeader from "@/components/inventory/InventoryHeader";
import InventoryToolbar from "@/components/inventory/InventoryToolbar";
import InventoryTable from "@/components/inventory/InventoryTable";
import InventoryPagination from "@/components/inventory/InventoryPagination";

export default function Inventory() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <InventoryHeader />

        <InventoryToolbar />

        <InventoryTable />

        <InventoryPagination />
      </div>
    </DashboardLayout>
  );
}