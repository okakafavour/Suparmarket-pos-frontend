import { useEffect, useState } from "react";
import { Receipt } from "lucide-react";

import { useSales } from "@/queries/useSales";

import type {
  PaymentMethod,
  Sale,
  SaleStatus,
} from "@/types/sales";

import SalesCard from "./SalesCard";

import LoadingSales from "./LoadingSales";
import EmptySales from "./EmptySales";

import InventoryPagination from "@/components/inventory/InventoryPagination";

import SaleDetailsDialog from "./SaleDetailsDialog";
import DeleteSaleDialog from "./DeleteSaleDialog";

interface Props {
  search: string;
  payment: PaymentMethod | "";
  status: SaleStatus | "";
  sort: string;
}

export default function SalesGrid({
  search,
  payment,
  status,
  sort,
}: Props) {
  const [page, setPage] = useState(1);

  const limit = 10;

  useEffect(() => {
    setPage(1);
  }, [search, payment, status, sort]);

  const {
    data,
    isLoading,
    isError,
  } = useSales({
    page,
    limit,
    search,
    payment,
    status,
    sortBy: sort,
  });

  const [selectedSale, setSelectedSale] =
    useState<Sale | null>(null);

  const [deletingSale, setDeletingSale] =
    useState<Sale | null>(null);

  if (isLoading) {
    return <LoadingSales />;
  }

  if (isError) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-10 text-center">
        <Receipt
          className="mx-auto mb-4 text-red-600"
          size={44}
        />

        <h2 className="text-2xl font-bold text-red-600">
          Failed to load sales
        </h2>

        <p className="mt-2 text-slate-500">
          Please refresh and try again.
        </p>
      </div>
    );
  }

  const sales = data?.data ?? [];

  const totalPages =
    data?.pagination?.total_pages ?? 1;

  const totalSales =
    data?.pagination?.total ?? sales.length;

  if (!sales.length) {
    return <EmptySales />;
  }

  function handleView(sale: Sale) {
  setSelectedSale(sale);
}

function handleDelete(sale: Sale) {
  setDeletingSale(sale);
}

return (
  <>
    <div className="grid gap-6">
      {sales.map((sale) => (
        <SalesCard
          key={sale.id}
          sale={sale}
          onView={handleView}
          onDelete={handleDelete}
        />
      ))}
    </div>

    <div className="mt-8">
      <InventoryPagination
        page={page}
        totalPages={totalPages}
        totalProducts={totalSales}
        onPageChange={setPage}
      />
    </div>

    <SaleDetailsDialog
      open={!!selectedSale}
      sale={selectedSale}
      onClose={() => setSelectedSale(null)}
    />

    <DeleteSaleDialog
      open={!!deletingSale}
      sale={deletingSale}
      onClose={() => setDeletingSale(null)}
    />
  </>
);
}