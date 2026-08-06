import { useMemo, useState } from "react";

import DashboardLayout from "@/layouts/DashboardLayout";

import LoadingPurchases from "@/components/purchases/LoadingPurchases";
import PurchasesHeader from "@/components/purchases/PurchasesHeader";
import PurchasesToolbar from "@/components/purchases/PurchasesToolbar";
import PurchasesTable from "@/components/purchases/PurchasesTable";

import AddPurchaseDialog from "@/components/purchases/AddPurchaseModal";
import PurchaseDetailsDialog from "@/components/purchases/PurchaseDetailsDialog";
import ReceivePurchaseDialog from "@/components/purchases/ReceivePurchaseDialog";
import DeletePurchaseDialog from "@/components/purchases/DeletePurchaseDialog";

import { usePurchases } from "@/queries/usePurchases";

import type { Purchase } from "@/types/purchase";

export default function Purchases() {
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [addOpen, setAddOpen] = useState(false);

  const [detailsOpen, setDetailsOpen] =
    useState(false);

  const [receiveOpen, setReceiveOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [selectedPurchase, setSelectedPurchase] =
    useState<Purchase | null>(null);

  const {
  data,
  isLoading,
  isError,
} = usePurchases();

const purchases: Purchase[] = data?.data ?? [];
    console.log(JSON.stringify(purchases[0], null, 2));
  const filteredPurchases = useMemo(() => {
    return purchases.filter((purchase) => {
      const matchesSearch =
        search === "" ||
        purchase.invoice_number
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        purchase.supplier?.name
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        status === ""
          ? true
          : purchase.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [purchases, search, status]);

  function handleView(purchase: Purchase) {
    setSelectedPurchase(purchase);
    setDetailsOpen(true);
  }

  function handleReceive(purchase: Purchase) {
    setSelectedPurchase(purchase);
    setReceiveOpen(true);
  }

  function handleDelete(purchase: Purchase) {
    setSelectedPurchase(purchase);
    setDeleteOpen(true);
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <LoadingPurchases />
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout>
        <div className="rounded-3xl border border-red-200 bg-red-50 p-10 text-center">
          Failed to load purchases.
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="space-y-8">

        <PurchasesHeader
          total={filteredPurchases.length}
        />

        <PurchasesToolbar
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          onAdd={() => setAddOpen(true)}
        />

        <PurchasesTable
          purchases={filteredPurchases}
          onView={handleView}
          onReceive={handleReceive}
          onDelete={handleDelete}
        />

      </div>

      <AddPurchaseDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
      />

      <PurchaseDetailsDialog
        open={detailsOpen}
        purchase={selectedPurchase}
        onClose={() => {
          setDetailsOpen(false);
          setSelectedPurchase(null);
        }}
      />

      <ReceivePurchaseDialog
        open={receiveOpen}
        purchase={selectedPurchase}
        onClose={() => {
          setReceiveOpen(false);
          setSelectedPurchase(null);
        }}
      />

      <DeletePurchaseDialog
        open={deleteOpen}
        purchase={selectedPurchase}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedPurchase(null);
        }}
      />

    </DashboardLayout>
  );
}