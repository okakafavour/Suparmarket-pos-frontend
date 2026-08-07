import { useState } from "react";

import DashboardLayout from "@/layouts/DashboardLayout";

import ReportsHeader from "@/components/reports/ReportsHeader";
import ReportsToolbar from "@/components/reports/ReportsToolbar";
import TopProductsReport from "@/components/reports/TopProductsReport";
import LowStockReport from "@/components/reports/LowStockReport";
import LoadingReports from "@/components/reports/LoadingReports";

import {
  useSalesSummary,
  useDailySalesReport,
  useDateRangeReport,
  useLowStockReport,
  useTopSellingProducts,
} from "@/queries/useReports";

export default function Reports() {
  const today = new Date().toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const [appliedStart, setAppliedStart] = useState(today);
  const [appliedEnd, setAppliedEnd] = useState(today);

  const summary = useSalesSummary();

  const daily = useDailySalesReport();

  const range = useDateRangeReport(
    appliedStart,
    appliedEnd
  );

  const lowStock = useLowStockReport();

  const topProducts = useTopSellingProducts();

  const isLoading =
    summary.isLoading ||
    daily.isLoading ||
    lowStock.isLoading ||
    topProducts.isLoading;

  function handleApply() {
    if (!startDate || !endDate) return;

    setAppliedStart(startDate);
    setAppliedEnd(endDate);
  }

  function handleReset() {
    setStartDate(today);
    setEndDate(today);
    setAppliedStart(today);
    setAppliedEnd(today);
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <LoadingReports />
      </DashboardLayout>
    );
  }

  const totalSales =
    range.data?.total_sales ??
    summary.data?.total_sales ??
    0;

  const totalRevenue =
    range.data?.total_revenue ??
    summary.data?.total_revenue ??
    0;

  const todaySales =
    daily.data?.total_sales ?? 0;

  const todayRevenue =
    daily.data?.total_revenue ?? 0;

  return (
  <DashboardLayout>
    <div className="min-w-0 w-full overflow-x-hidden">
      <ReportsHeader
        totalSales={totalSales}
        totalRevenue={totalRevenue}
        todaySales={todaySales}
        todayRevenue={todayRevenue}
      />

      <ReportsToolbar
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        onApply={handleApply}
        onReset={handleReset}
      />

      {range.isError && (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
          Failed to load the selected date range.
        </div>
      )}

      <div className="mt-6 grid min-w-0 gap-6 lg:grid-cols-2">
        <TopProductsReport
          products={topProducts.data ?? []}
        />

        <LowStockReport
          products={lowStock.data ?? []}
        />
      </div>
    </div>
  </DashboardLayout>
);
}