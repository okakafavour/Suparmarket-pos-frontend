import { useState } from "react";

import DashboardLayout from "@/layouts/DashboardLayout";

import InventoryHeader from "@/components/inventory/InventoryHeader";
import InventoryToolbar from "@/components/inventory/InventoryToolbar";
import InventoryTable from "@/components/inventory/InventoryTable";
import type { Product } from "@/types/product";

export default function Inventory() {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [products, setProducts] = useState<Product[]>([]);

  const [category, setCategory] = useState("");

  const [status, setStatus] = useState("");

  const limit = 10;

  function handleRefresh() {
    window.location.reload();
  }

  function handleExport() {
  if (!products.length) return;

  const headers = [
    "Name",
    "SKU",
    "Category",
    "Supplier",
    "Cost Price",
    "Selling Price",
    "Quantity",
    "Minimum Stock",
    "Status",
  ];

  const rows = products.map((product) => [
    product.Name,
    product.SKU,
    product.Category?.name ?? "",
    product.Supplier?.Name ?? "",
    product.CostPrice,
    product.SellingPrice,
    product.Quantity,
    product.MinimumStock,
    product.IsActive ? "Active" : "Inactive",
  ]);

  const csv = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = `products-${new Date()
    .toISOString()
    .slice(0, 10)}.csv`;

  link.click();

  URL.revokeObjectURL(url);
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
          onProductsChange={setProducts}
        />
      </div>
    </DashboardLayout>
  );
}