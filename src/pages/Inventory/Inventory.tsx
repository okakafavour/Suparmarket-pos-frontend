import { useState } from "react";

import DashboardLayout from "@/layouts/DashboardLayout";

import InventoryHeader from "@/components/inventory/InventoryHeader";
import InventoryToolbar from "@/components/inventory/InventoryToolbar";
import InventoryTable from "@/components/inventory/InventoryTable";

export default function Inventory() {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");

  const [status, setStatus] = useState("");

  const limit = 10;

  function handleRefresh() {
    window.location.reload();
  }

  function handleExport() {
    console.log("Export CSV");
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <InventoryHeader />

        <InventoryToolbar
          search={search}
          onSearch={(value) => {
            setSearch(value);
            setPage(1);
          }}
          category={category}
          onCategoryChange={(value) => {
            setCategory(value);
            setPage(1);
          }}
          status={status}
          onStatusChange={(value) => {
            setStatus(value);
            setPage(1);
          }}
          onRefresh={handleRefresh}
          onExport={handleExport}
        />

        <InventoryTable
          page={page}
          limit={limit}
          search={search}
          category={category}
          status={status}
          onPageChange={setPage}
        />
      </div>
    </DashboardLayout>
  );
}