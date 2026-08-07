import { useQuery } from "@tanstack/react-query";

import {
  getSalesSummary,
  getDailySalesReport,
  getMonthlySalesReport,
  getDateRangeReport,
  getLowStockReport,
  getTopSellingProducts,
} from "@/services/reports.service";

export function useSalesSummary() {
  return useQuery({
    queryKey: ["reports", "sales-summary"],
    queryFn: getSalesSummary,
  });
}

export function useDailySalesReport() {
  return useQuery({
    queryKey: ["reports", "daily"],
    queryFn: getDailySalesReport,
  });
}

export function useMonthlySalesReport() {
  return useQuery({
    queryKey: ["reports", "monthly"],
    queryFn: getMonthlySalesReport,
  });
}

export function useDateRangeReport(
  start: string,
  end: string,
  enabled = true
) {
  return useQuery({
    queryKey: ["reports", "range", start, end],
    queryFn: () => getDateRangeReport(start, end),
    enabled: enabled && Boolean(start && end),
  });
}

export function useLowStockReport() {
  return useQuery({
    queryKey: ["reports", "low-stock"],
    queryFn: getLowStockReport,
  });
}

export function useTopSellingProducts() {
  return useQuery({
    queryKey: ["reports", "top-products"],
    queryFn: getTopSellingProducts,
  });
}