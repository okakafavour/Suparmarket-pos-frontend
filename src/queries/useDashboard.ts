import { useQuery } from "@tanstack/react-query";

import {
  getDashboardSummary,
  getRevenueChart,
  getSalesChart,
  getRecentSales,
  getTopProducts,
  getLowStockProducts,
} from "@/services/dashboard.service";

export function useDashboardSummary() {
  return useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: getDashboardSummary,
  });
}

export function useRevenueChart() {
  return useQuery({
    queryKey: ["dashboard-revenue"],
    queryFn: getRevenueChart,
  });
}

export function useSalesChart() {
  return useQuery({
    queryKey: ["dashboard-sales-chart"],
    queryFn: getSalesChart,
  });
}

export function useRecentSales() {
  return useQuery({
    queryKey: ["dashboard-recent-sales"],
    queryFn: getRecentSales,
  });
}

export function useTopProducts() {
  return useQuery({
    queryKey: ["dashboard-top-products"],
    queryFn: getTopProducts,
  });
}

export function useLowStockProducts() {
  return useQuery({
    queryKey: ["dashboard-low-stock"],
    queryFn: getLowStockProducts,
  });
}