import api from "@/lib/axios";

import type {
  SalesSummary,
  DailySalesReport,
  MonthlySalesReport,
  DateRangeReport,
  LowStockReport,
  TopProductReport,
} from "@/types/reports";

export async function getSalesSummary(): Promise<SalesSummary> {
  const { data } = await api.get("/reports/sales");

  return data.data;
}

export async function getDailySalesReport(): Promise<DailySalesReport> {
  const { data } = await api.get("/reports/sales/daily");

  return data.data;
}

export async function getMonthlySalesReport(): Promise<MonthlySalesReport> {
  const { data } = await api.get("/reports/sales/monthly");

  return data.data;
}

export async function getDateRangeReport(
  start: string,
  end: string
): Promise<DateRangeReport> {
  const { data } = await api.get("/reports/sales/range", {
    params: {
      start,
      end,
    },
  });

  return data.data;
}

export async function getLowStockReport(): Promise<LowStockReport[]> {
  const { data } = await api.get("/reports/low-stock");

  return data.data;
}

export async function getTopSellingProducts(): Promise<TopProductReport[]> {
  const { data } = await api.get("/reports/top-products");

  return data.data;
}