import { useState } from "react";

import DashboardLayout from "@/layouts/DashboardLayout";

import SalesHeader from "@/components/sales/SalesHeader";
import SalesStats from "@/components/sales/SalesStats";
import SalesToolbar from "@/components/sales/SalesToolbar";
import SalesGrid from "@/components/sales/SalesGrid";
import AddSaleModal from "@/components/sales/AddSaleModal";

import type {
  PaymentMethod,
  SaleStatus,
} from "@/types/sales";

export default function Sales() {
  const [search, setSearch] = useState("");

  const [payment, setPayment] =
    useState<PaymentMethod | "">("");

  const [status, setStatus] =
    useState<SaleStatus | "">("");

  const [sortBy, setSortBy] =
    useState("latest");

  const [addSaleOpen, setAddSaleOpen] =
    useState(false);

  function handleAddSale() {
    setAddSaleOpen(true);
  }

  function handleCloseModal() {
    setAddSaleOpen(false);
  }

  function handleExport() {
    // TODO:
    // Export sales to CSV / PDF
    console.log("Export Sales");
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">

        <SalesHeader />

        <SalesStats />

        <SalesToolbar
          search={search}
          onSearch={setSearch}
          payment={payment}
          onPaymentChange={setPayment}
          status={status}
          onStatusChange={setStatus}
          sort={sortBy}
          onSortChange={setSortBy}
          onAddSale={handleAddSale}
          onExport={handleExport}
        />

        <SalesGrid
          search={search}
          payment={payment}
          status={status}
          sort={sortBy}
        />

        <AddSaleModal
          open={addSaleOpen}
          onClose={handleCloseModal}
        />

      </div>
    </DashboardLayout>
  );
}